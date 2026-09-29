import {
  checkAdminPassword,
  createAdminSession,
  adminCookieName,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD)
    return new Response("Admin access is not configured.", { status: 503 });
  const form = await request.formData();
  const password = form.get("password");
  if (typeof password !== "string" || !checkAdminPassword(password)) {
    return Response.redirect(new URL("/admin/login?error=1", request.url), 303);
  }

  const session = createAdminSession();
  const cookie = `${adminCookieName}=${session.value}; Path=/admin; HttpOnly; SameSite=Strict; Max-Age=${session.maxAge}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/admin/all/responses", request.url).toString(),
      "Set-Cookie": cookie,
      "Cache-Control": "no-store",
    },
  });
}
