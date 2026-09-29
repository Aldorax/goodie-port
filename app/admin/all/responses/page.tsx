import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCookieName, isAdminSessionValid } from "@/lib/admin-auth";
import { listEnquiries } from "@/lib/database";
import { enquiryServices, sessions } from "@/lib/site-content";
import type { Enquiry } from "@/lib/enquiry";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "All responses",
  robots: { index: false, follow: false },
};
const pageSize = 50;

export default async function ResponsesPage({
  searchParams,
}: PageProps<"/admin/all/responses">) {
  const cookieStore = await cookies();
  if (!isAdminSessionValid(cookieStore.get(adminCookieName)?.value))
    redirect("/admin/login");
  if (!process.env.DATABASE_URL)
    return (
      <section className="admin-page">
        <h1>Database is not configured.</h1>
      </section>
    );

  const params = await searchParams;
  const query =
    typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const service =
    typeof params.service === "string" &&
    enquiryServices.some((item) => item.id === params.service)
      ? params.service
      : "";
  const status = ["new", "read", "archived"].includes(String(params.status))
    ? String(params.status)
    : "";
  const from =
    typeof params.from === "string" && /^\d{4}-\d{2}-\d{2}$/.test(params.from)
      ? params.from
      : "";
  const to =
    typeof params.to === "string" && /^\d{4}-\d{2}-\d{2}$/.test(params.to)
      ? params.to
      : "";
  const requestedPage = Number(params.page);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  const filters = {
    query,
    service,
    status,
    from,
    to,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };

  let result: Awaited<ReturnType<typeof listEnquiries>>;
  try {
    result = await listEnquiries(filters);
  } catch {
    return (
      <section className="admin-page">
        <h1>Responses are unavailable.</h1>
        <p>Check the database connection and try again.</p>
      </section>
    );
  }

  const pages = Math.max(1, Math.ceil(result.total / pageSize));
  const pageUrl = (nextPage: number) => {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries({
      q: query,
      service,
      status,
      from,
      to,
    }))
      if (value) search.set(key, value);
    search.set("page", String(nextPage));
    return `?${search.toString()}`;
  };

  return (
    <section className="admin-page">
      <div className="admin-heading">
        <div>
          <p className="section-kicker">Commissioner of Stories</p>
          <h1>All responses</h1>
          <p>
            {result.total} {result.total === 1 ? "response" : "responses"}
          </p>
        </div>
        <form action="/admin/logout" method="post">
          <button className="button button-secondary" type="submit">
            Sign out
          </button>
        </form>
      </div>
      <form className="response-filters" method="get">
        <label>
          Search
          <input
            name="q"
            defaultValue={query}
            placeholder="Name, email, organisation, brief"
          />
        </label>
        <label>
          Support
          <select name="service" defaultValue={service}>
            <option value="">All support</option>
            {enquiryServices.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select name="status" defaultValue={status}>
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label>
          From
          <input name="from" type="date" defaultValue={from} />
        </label>
        <label>
          To
          <input name="to" type="date" defaultValue={to} />
        </label>
        <div className="filter-actions">
          <button className="button" type="submit">
            Filter responses
          </button>
          <a className="text-button" href="/admin/all/responses">
            Clear
          </a>
        </div>
      </form>
      <div className="response-table-wrap">
        <table className="response-table">
          <thead>
            <tr>
              <th>Received</th>
              <th>Enquirer</th>
              <th>Support</th>
              <th>Organisation</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <ResponseRow
                key={row.id}
                id={row.id}
                date={row.created_at}
                status={row.status}
                enquiry={row.enquiry}
              />
            ))}
          </tbody>
        </table>
        {result.rows.length === 0 && (
          <p className="empty-responses">No responses match these filters.</p>
        )}
      </div>
      <nav className="response-pagination" aria-label="Response pages">
        <span>
          Page {page} of {pages}
        </span>
        <div>
          {page > 1 && (
            <a className="button button-secondary" href={pageUrl(page - 1)}>
              Previous
            </a>
          )}
          {page < pages && (
            <a className="button button-secondary" href={pageUrl(page + 1)}>
              Next
            </a>
          )}
        </div>
      </nav>
    </section>
  );
}

function ResponseRow({
  id,
  date,
  status,
  enquiry,
}: {
  id: string;
  date: Date;
  status: string;
  enquiry: Enquiry;
}) {
  const serviceName =
    enquiryServices.find((item) => item.id === enquiry.service)?.title ??
    enquiry.service;
  const sessionName = sessions.find(
    (item) => item.id === enquiry.session,
  )?.title;
  const timeline =
    [
      enquiry.startDate && `Start: ${enquiry.startDate}`,
      enquiry.endDate && `End: ${enquiry.endDate}`,
    ]
      .filter(Boolean)
      .join(" · ") || enquiry.timeline;
  const budget =
    enquiry.budgetAmount && enquiry.budgetCurrency
      ? new Intl.NumberFormat("en", {
          style: "currency",
          currency: enquiry.budgetCurrency,
        }).format(Number(enquiry.budgetAmount))
      : enquiry.budget;
  return (
    <tr>
      <td>
        {new Intl.DateTimeFormat("en", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(date)}
      </td>
      <td>
        <strong>{enquiry.name}</strong>
        <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
      </td>
      <td>
        {serviceName}
        {sessionName && <small>{sessionName}</small>}
      </td>
      <td>{enquiry.organisation || "-"}</td>
      <td>
        <form
          action="/admin/status"
          method="post"
          className="response-status-form"
        >
          <input type="hidden" name="id" value={id} />
          <select
            name="status"
            aria-label={`Status for ${enquiry.name}`}
            defaultValue={status}
          >
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>
          <button type="submit">Save</button>
        </form>
      </td>
      <td>
        <details>
          <summary>View</summary>
          <div className="response-detail">
            <p>{enquiry.description}</p>
            {timeline && (
              <p>
                <strong>Timeline:</strong> {timeline}
              </p>
            )}
            {budget && (
              <p>
                <strong>Budget:</strong> {budget}
              </p>
            )}
            {enquiry.eventName && (
              <p>
                <strong>Event:</strong> {enquiry.eventName}
                {enquiry.eventDate && ` · ${enquiry.eventDate}`}
              </p>
            )}
            {enquiry.location && (
              <p>
                <strong>Location:</strong> {enquiry.location}
              </p>
            )}
            {enquiry.audience && (
              <p>
                <strong>Audience:</strong> {enquiry.audience}
              </p>
            )}
            {enquiry.topic && (
              <p>
                <strong>Topic:</strong> {enquiry.topic}
              </p>
            )}
            {enquiry.format && (
              <p>
                <strong>Format:</strong> {enquiry.format}
              </p>
            )}
          </div>
        </details>
      </td>
    </tr>
  );
}
