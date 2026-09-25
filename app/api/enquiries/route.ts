import { validateEnquiry } from "@/lib/enquiry";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Please submit your enquiry from this website." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Unsupported request format." }, { status: 415 });
  let input: unknown;
  try {
    const body = await request.text();
    if (body.length > 16000) return Response.json({ error: "Your enquiry is too long." }, { status: 413 });
    input = JSON.parse(body);
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  const result = validateEnquiry(input);
  if (!result.data) return Response.json({ error: result.error }, { status: 400 });
  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) return Response.json({ error: "Online delivery is not available yet. Your enquiry has not been sent. Please save your draft." }, { status: 503 });
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:") throw new Error("Invalid delivery configuration");
    const enquiry = result.data;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ source: "commissionerofstories", submittedAt: new Date().toISOString(), enquiry }),
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Delivery failed");
    return Response.json({ received: true });
  } catch {
    return Response.json({ error: "We couldn’t confirm delivery. Your draft is still here. Please try again later or use email if available." }, { status: 502 });
  }
}
