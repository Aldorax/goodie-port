import { adminCookieName } from "@/lib/admin-auth";

export async function POST(request: Request) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/admin/login", request.url).toString(),
      "Set-Cookie": `${adminCookieName}=; Path=/admin; HttpOnly; SameSite=Strict; Max-Age=0${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
      "Cache-Control": "no-store",
    },
  });
}
