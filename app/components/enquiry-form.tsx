"use client";
import Icon from "@/app/components/site-icon";

import Link from "next/link";
import { useRef, useState } from "react";
import { enquiryServices, sessions } from "@/lib/site-content";
import { enquiryText, validateEnquiry, type Enquiry } from "@/lib/enquiry";

export default function EnquiryForm({
  initialService = "",
  initialSession = "",
  deliveryEnabled = false,
  contactEmail = "",
  speakingOnly = false,
}: {
  initialService?: string;
  initialSession?: string;
  deliveryEnabled?: boolean;
  contactEmail?: string;
  speakingOnly?: boolean;
}) {
  const [service, setService] = useState(initialService);
  const [session, setSession] = useState(initialSession);
  const [draft, setDraft] = useState<Enquiry | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const summary = useRef<HTMLDivElement>(null);

  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = validateEnquiry({
      ...Object.fromEntries(form),
      service,
      session,
      consent: form.get("consent") === "on",
    });
    if (!result.data) {
      setError(result.error ?? "Please check your enquiry.");
      return;
    }
    setError("");
    setCopied(false);
    setDraft(result.data);
    requestAnimationFrame(() => {
      summary.current?.focus();
      summary.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  async function send() {
    if (!draft || sending) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const result = await response.json();
      if (!response.ok || result.received !== true)
        throw new Error(
          result.error ||
            "Delivery could not be confirmed. Your draft is still here.",
        );
      setSent(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Your enquiry could not be sent. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  function download() {
    if (!draft) return;
    const url = URL.createObjectURL(
      new Blob([enquiryText(draft)], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "my-enquiry-for-goodness.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function copy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(enquiryText(draft));
      setCopied(true);
    } catch {
      setError(
        "Copy isn’t available in this browser. Please use Save draft instead.",
      );
    }
  }

  if (sent)
    return (
      <div className="enquiry-confirmation" role="status">
        <span aria-hidden="true">
          <Icon name="check" />
        </span>
        <h2>Thank you, {draft?.name.split(" ")[0]}.</h2>
        <p>
          Your enquiry has been received. Goodness can follow up using the email
          address you provided to discuss your request.
        </p>
        <p>
          This confirms receipt of your enquiry; a booking or project is only
          confirmed separately.
        </p>
        <Link href="/" className="button">
          Back to the homepage <Icon name="arrow" />
        </Link>
      </div>
    );

  return (
    <div className="enquiry-form-shell">
      {!deliveryEnabled && (
        <div className="form-notice">
          <strong>
            {contactEmail
              ? "Send your enquiry by email."
              : "Online enquiries are not open yet."}
          </strong>
          <p>
            {contactEmail
              ? "Prepare and review your brief below, then open it in your email app to send."
              : "You can prepare, copy, or save your brief below. It will not be sent from this site."}
          </p>
        </div>
      )}
      <form
        onSubmit={prepare}
        onChange={() => {
          setDraft(null);
          setError("");
        }}
      >
        <div className="form-honeypot" aria-hidden="true">
          <label>
            Leave this field blank
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="form-grid">
          <label>
            Your name <span>*</span>
            <input
              name="name"
              autoComplete="name"
              maxLength={120}
              required
              placeholder="What should I call you?"
            />
          </label>
          <label>
            Email address <span>*</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              maxLength={254}
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="field-wide">
            Brand or organisation <small>(optional)</small>
            <input
              name="organisation"
              autoComplete="organization"
              maxLength={200}
              placeholder="Your brand, business, or community"
            />
          </label>
          {!speakingOnly && (
            <label className="field-wide">
              What do you need? <span>*</span>
              <select
                name="service"
                value={service}
                required
                onChange={(event) => {
                  setService(event.target.value);
                  setSession("");
                }}
              >
                <option value="">Choose the support you need</option>
                {enquiryServices.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
          )}
          {service === "session" && (
            <div className="field-wide">
              <label>
                Which session?
                <select
                  name="session"
                  value={session}
                  onChange={(event) => setSession(event.target.value)}
                >
                  <option value="">Help me decide</option>
                  {sessions.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>
              <Link className="field-helper" href="/learn/sessions">
                Compare the 1:1 sessions <Icon name="arrow" />
              </Link>
            </div>
          )}
          {service === "mentorship" && (
            <p className="field-helper field-wide">
              Ready to explore the current programme?{" "}
              <Link href="/learn/mentorship">
                View mentorship details <Icon name="arrow" />
              </Link>
            </p>
          )}
          {service === "speaking" && (
            <>
              <label className="field-wide">
                Event name <span>*</span>
                <input
                  name="eventName"
                  maxLength={200}
                  required
                  placeholder="The name of your event"
                />
              </label>
              <label>
                Location or virtual platform <span>*</span>
                <input
                  name="location"
                  maxLength={200}
                  required
                  placeholder="City, platform, or to be confirmed"
                />
              </label>
              <label className="field-wide">
                Who is the audience? <span>*</span>
                <input
                  name="audience"
                  maxLength={500}
                  required
                  placeholder="Who will attend? Approximate audience size?"
                />
              </label>
              <label>
                Topic <span>*</span>
                <input
                  name="topic"
                  maxLength={300}
                  required
                  placeholder="Your topic or theme"
                />
              </label>
              <label>
                Preferred format <span>*</span>
                <select name="format" required defaultValue="">
                  <option value="">Choose a format to discuss</option>
                  <option>Talk</option>
                  <option>Workshop</option>
                  <option>Panel</option>
                  <option>Community session</option>
                  <option>To be confirmed</option>
                </select>
              </label>
            </>
          )}
          <label className="field-wide">
            {service === "speaking"
              ? "Tell me about the event"
              : "Tell me a little about your project"}{" "}
            <span>*</span>
            <textarea
              name="description"
              rows={5}
              maxLength={6000}
              required
              placeholder="What are you working on, who is it for, and where would you like support?"
            />
          </label>
          <label>
            {service === "speaking" ? "Event start date" : "Start date"}{" "}
            <small>(if known)</small>
            <input name="startDate" type="date" />
          </label>
          <label>
            {service === "speaking" ? "Event end date" : "End date"}{" "}
            <small>(if known)</small>
            <input name="endDate" type="date" />
          </label>
          <fieldset className="budget-field field-wide">
            <legend>
              Budget <small>(optional)</small>
            </legend>
            <div className="budget-control">
              <label className="budget-amount-label">
                <span>Amount</span>
                <input
                  name="budgetAmount"
                  type="number"
                  min="0"
                  max="999999999999.99"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Enter an amount"
                />
              </label>
              <div
                className="budget-currency"
                role="group"
                aria-label="Budget currency"
              >
                <label>
                  <input
                    type="radio"
                    name="budgetCurrency"
                    value="NGN"
                    defaultChecked
                  />
                  <span>₦ NGN</span>
                </label>
                <label>
                  <input type="radio" name="budgetCurrency" value="USD" />
                  <span>$ USD</span>
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <label className="consent-label">
          <input name="consent" type="checkbox" required />
          <span>
            I agree that the details I choose to send may be used to respond to
            this enquiry. <Link href="/privacy">Privacy information</Link>.
          </span>
        </label>
        <div className="form-submit-row">
          <button type="submit" className="button">
            Review my enquiry{" "}
            <span aria-hidden="true">
              <Icon name="arrow" />
            </span>
          </button>
          <span>Required fields are marked with *</span>
        </div>
      </form>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {draft && (
        <div ref={summary} tabIndex={-1} className="enquiry-review">
          <span className="nav-label">YOUR ENQUIRY · READY TO REVIEW</span>
          <h3>A good place to begin.</h3>
          <pre>{enquiryText(draft)}</pre>
          <div className="button-row">
            {deliveryEnabled ? (
              <button
                type="button"
                className="button"
                disabled={sending}
                onClick={send}
              >
                {sending ? "Sending…" : "Send enquiry"}
              </button>
            ) : contactEmail ? (
              <a
                className="button"
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Website enquiry: ${enquiryServices.find((item) => item.id === service)?.title}`)}&body=${encodeURIComponent(enquiryText(draft))}`}
              >
                Open email to send <Icon name="arrow" />
              </a>
            ) : null}
            <button
              type="button"
              className="button button-secondary"
              onClick={download}
            >
              Save draft <Icon name="down" />
            </button>
            <button type="button" className="text-button" onClick={copy}>
              {copied ? "Copied" : "Copy enquiry"}
            </button>
          </div>
          <p className="field-helper" role="status">
            {copied ? "Draft copied. " : ""}
            {deliveryEnabled
              ? "Nothing is sent until you select Send enquiry."
              : "Your draft has not been sent. Saving or copying keeps it with you."}
          </p>
        </div>
      )}
    </div>
  );
}
