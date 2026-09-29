import Icon from "@/app/components/site-icon";
import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, External } from "../components/site-ui";
import EnquiryForm from "../components/enquiry-form";
import { enquiryServices, sessions, links } from "@/lib/site-content";

export const metadata: Metadata = { title: "Work With Me" };
export default async function WorkWithMe({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; session?: string }>;
}) {
  const query = await searchParams;
  const service = enquiryServices.some((item) => item.id === query.service)
    ? query.service
    : "";
  const session = sessions.some((item) => item.id === query.session)
    ? query.session
    : "";
  const contactEmail = process.env.CONTACT_EMAIL ?? "";
  return (
    <>
      <PageIntro
        eyebrow="WORK WITH ME"
        title="Something you’re trying"
        accent="to communicate?"
      >
        <p>
          Let’s make the message make sense.
          <br />
          Share the context, the challenge, and where you’d like to go.
        </p>
      </PageIntro>
      <section className="enquiry-layout wrap">
        <aside className="enquiry-aside">
          <p className="section-kicker">What do you need?</p>
          <h2>
            Start with
            <br />
            <span className="heading-accent">your next step.</span>
          </h2>
          <nav aria-label="Choose an enquiry type">
            {[
              ["Hire me for a brand project", "content-strategy"],
              ["Explore ongoing support", "ongoing-support"],
              ["Book a 1:1 session", "session"],
              ["Ask about mentorship", "mentorship"],
              ["Invite me to speak", "speaking"],
              ["Something else", "other"],
            ].map(([label, id]) => (
              <Link
                key={id}
                href={`/work-with-me?service=${id}#enquiry`}
                aria-current={service === id ? "true" : undefined}
              >
                {label}
                <span aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </nav>
          <div className="aside-note">
            <span className="nav-label">AFTER YOUR ENQUIRY</span>
            <p>
              Once you send an enquiry through an available channel, the next
              step is a conversation about fit, scope, and availability. Project
              terms or booking details are agreed separately.
            </p>
          </div>
          <div className="aside-note">
            <span className="nav-label">CONNECT DIRECTLY</span>
            {contactEmail && (
              <a className="direct-email" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            )}
            <External href={links.substack}>
              Read my Substack <Icon name="arrow" />
            </External>
          </div>
        </aside>
        <div id="enquiry">
          <EnquiryForm
            key={`${service}-${session}`}
            initialService={service}
            initialSession={session}
            contactEmail={contactEmail}
            deliveryEnabled={Boolean(process.env.DATABASE_URL)}
          />
        </div>
      </section>
    </>
  );
}
