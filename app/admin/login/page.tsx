import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  if (!process.env.ADMIN_PASSWORD) {
    return (
      <section className="admin-login">
        <p className="section-kicker">Admin access</p>
        <h1>Admin access is not configured.</h1>
        <p>Set ADMIN_PASSWORD on the server before opening this page.</p>
      </section>
    );
  }
  const params = await searchParams;
  return (
    <section className="admin-login">
      <p className="section-kicker">Commissioner of Stories</p>
      <h1>Responses</h1>
      <form
        action="/api/admin/login"
        method="post"
        className="admin-login-form"
      >
        <label htmlFor="password">Admin password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        {params.error && (
          <p className="admin-error" role="alert">
            That password was not accepted.
          </p>
        )}
        <button className="button" type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
}
