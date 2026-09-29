import postgres from "postgres";
import type { Enquiry } from "@/lib/enquiry";

let client: ReturnType<typeof postgres> | undefined;

function database() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured.");
  client ??= postgres(url, { max: 3, prepare: false });
  return client;
}

export async function ensureEnquiriesTable() {
  await database()`
    CREATE TABLE IF NOT EXISTS enquiries (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
      enquiry JSONB NOT NULL
    )
  `;
}

export async function saveEnquiry(enquiry: Enquiry) {
  await ensureEnquiriesTable();
  const [saved] = await database()`
    INSERT INTO enquiries (enquiry)
    VALUES (${database().json(enquiry)})
    RETURNING id
  `;
  return saved.id;
}

export type EnquiryRow = {
  id: string;
  created_at: Date;
  status: "new" | "read" | "archived";
  enquiry: Enquiry;
};

export type EnquiryFilters = {
  query: string;
  service: string;
  status: string;
  from: string;
  to: string;
  limit: number;
  offset: number;
};

export async function listEnquiries(filters: EnquiryFilters) {
  await ensureEnquiriesTable();
  const sql = database();
  const matches = sql`
    ((${filters.query} = '') OR (
      enquiry->>'name' ILIKE '%' || ${filters.query} || '%' OR
      enquiry->>'email' ILIKE '%' || ${filters.query} || '%' OR
      enquiry->>'organisation' ILIKE '%' || ${filters.query} || '%' OR
      enquiry->>'description' ILIKE '%' || ${filters.query} || '%'
    ))
    AND (${filters.service} = '' OR enquiry->>'service' = ${filters.service})
    AND (${filters.status} = '' OR status = ${filters.status})
    AND (NULLIF(${filters.from}, '') IS NULL OR created_at >= NULLIF(${filters.from}, '')::date)
    AND (NULLIF(${filters.to}, '') IS NULL OR created_at < NULLIF(${filters.to}, '')::date + INTERVAL '1 day')
  `;
  const [rows, totals] = await Promise.all([
    sql<EnquiryRow[]>`
      SELECT id::text, created_at, status, enquiry
      FROM enquiries WHERE ${matches}
      ORDER BY created_at DESC, id DESC
      LIMIT ${filters.limit} OFFSET ${filters.offset}
    `,
    sql<
      { count: string }[]
    >`SELECT COUNT(*)::text AS count FROM enquiries WHERE ${matches}`,
  ]);
  return { rows, total: Number(totals[0]?.count ?? 0) };
}

export async function updateEnquiryStatus(
  id: string,
  status: "new" | "read" | "archived",
) {
  await ensureEnquiriesTable();
  const [updated] = await database()`
    UPDATE enquiries SET status = ${status} WHERE id = ${id} RETURNING id
  `;
  return Boolean(updated);
}
