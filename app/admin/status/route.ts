import { cookies } from "next/headers";
import { adminCookieName, isAdminSessionValid } from "@/lib/admin-auth";
import { updateEnquiryStatus } from "@/lib/database";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!isAdminSessionValid(cookieStore.get(adminCookieName)?.value)) {
    return Response.redirect(new URL("/admin/login", request.url), 303);
  }

  const form = await request.formData();
  const id = form.get("id");
  const status = form.get("status");
  if (
    typeof id !== "string" ||
    !/^\d+$/.test(id) ||
    !["new", "read", "archived"].includes(String(status))
  ) {
    return new Response("Invalid response status.", { status: 400 });
  }

  await updateEnquiryStatus(id, status as "new" | "read" | "archived");
  const referer = request.headers.get("referer");
  let destination = "/admin/all/responses";
  if (referer) {
    try {
      if (new URL(referer).origin === new URL(request.url).origin)
        destination = referer;
    } catch {
      destination = "/admin/all/responses";
    }
  }
  return new Response(null, {
    status: 303,
    headers: { Location: destination, "Cache-Control": "no-store" },
  });
}
