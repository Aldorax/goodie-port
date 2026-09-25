import Icon from "@/app/components/site-icon";
import type { Metadata } from "next";
import { sessions, enquiryHref } from "@/lib/site-content";
import { PageIntro, SectionTitle, Button, Invitation } from "../../components/site-ui";

export const metadata: Metadata = { title: "1:1 Sessions" };
export default function SessionsPage() {
  return <>
    <PageIntro eyebrow="1:1 WITH GOODNESS" title="One conversation." accent="A clearer next step."><p>Choose the question you want to work through. Each session enquiry starts with your context and the direction you’re hoping to find.</p></PageIntro>
    <section className="content-section wrap"><SectionTitle kicker="Find your focus" title="Which conversation" accent="is yours?" /><div className="session-grid">{sessions.map((session, index) => <article className="session-card" id={session.id} key={session.id}><div className="tile-top"><span className="nav-label">0{index + 1} / 1:1 SUPPORT</span><span className="tile-symbol" aria-hidden="true"><Icon name={session.symbol} /></span></div><h2>{session.title}</h2><span className="nav-label">THIS IS FOR YOU IF</span><p>{session.audience}</p><span className="nav-label">OUR FOCUS</span><p>{session.outcome}</p><Button href={enquiryHref("session", session.id)}>Enquire about this session</Button></article>)}</div></section>
    <section className="statement-panel wrap"><p className="section-kicker">Before booking</p><h2>Clear expectations.<br /><span className="heading-accent">Then a place in the diary.</span></h2><p>Format, duration, availability, and fee are confirmed after your enquiry. An enquiry is a conversation starter, not a paid booking or a reserved slot.</p></section>
    <Invitation title="Not sure which session fits?" text="Tell me where you are getting stuck, and we can explore a useful starting point." href={enquiryHref("session")} label="Help Me Find My Session" />
  </>;
}
