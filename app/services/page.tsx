import Icon from "@/app/components/site-icon";
import type { Metadata } from "next";
import Link from "next/link";
import { services, enquiryHref } from "@/lib/site-content";
import { PageIntro, SectionTitle, Button, FAQ, Invitation } from "../components/site-ui";

export const metadata: Metadata = { title: "Services" };
export default function ServicesPage() {
  return <>
    <PageIntro eyebrow="STRATEGY, STORY & CONNECTION" title="You have something to say." accent="Let’s make it connect."><p>For brands, founders, and organisations looking for clearer content, more intentional emails, and a stronger connection with their people.</p></PageIntro>
    <nav className="section-tabs wrap" aria-label="Services">{services.map(service => <a key={service.id} href={`#${service.id}`}>{service.title} <Icon name="down" /></a>)}</nav>
    <div className="wrap service-details">{services.map(service => <section id={service.id} className="service-detail" key={service.id}><div className="service-number"><span>{service.number}</span><span aria-hidden="true"><Icon name={service.symbol} /></span></div><div><p className="section-kicker">{service.audience}</p><h2>{service.title}</h2><p className="service-problem">{service.problem}</p><Button href={enquiryHref(service.id)}>Enquire about this service</Button></div><div className="scope-list"><span className="nav-label">WHAT WE CAN WORK ON</span><ul>{service.includes.map(item => <li key={item}>{item}</li>)}</ul><p>The final deliverables and scope are agreed in your proposal.</p></div></section>)}</div>
    <section className="content-section wrap"><SectionTitle kicker="Additional support" title="Sometimes, the words" accent="need a second look." /><div className="two-column-cards"><article><h3>Brand Communication</h3><p>Bring consistency to how your brand introduces itself, explains its work, and speaks to its audience.</p><Link className="inline-link" href={enquiryHref("brand-communication")}>Discuss your message <Icon name="arrow" /></Link></article><article><h3>Proofreading & Editing</h3><p>Have an existing draft? Share its length, purpose, and the kind of help you need. We’ll define the editing scope before agreeing the work.</p><Link className="inline-link" href={enquiryHref("editing")}>Discuss your draft <Icon name="arrow" /></Link></article></div></section>
    <section className="statement-panel wrap"><SectionTitle kicker="Ways to work together" title="Start with the need." accent="Shape the right scope." /><p>A defined project, a strategy question, or a conversation about ongoing support. Tell me what you’re working towards so we can explore the arrangement that fits.</p><Button href={enquiryHref("ongoing-support")} secondary>Explore ongoing support</Button></section>
    <section className="content-section wrap"><SectionTitle kicker="What happens next" title="From first hello" accent="to a shared direction." /><div className="steps-grid">{[["Enquiry", "Share the context, the challenge, and your ideal timing."], ["Conversation", "Explore fit, ask questions, and clarify what you need."], ["Proposal", "Agree the deliverables, fee, timing, and revision scope."], ["Work begins", "Start once the proposal and practical details are agreed."]].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="faq-section wrap"><SectionTitle kicker="Before you enquire" title="A few useful" accent="answers." /><FAQ items={[
      { question: "How long does a project take?", answer: "Timing depends on the scope and availability. Include your target date in your enquiry so we can discuss a realistic schedule before any commitment." },
      { question: "What should I provide?", answer: "A short brief, your audience, your goals, existing brand materials, and examples of the communication you need help with. A rough starting point is enough for an initial conversation." },
      { question: "Are revisions included?", answer: "The number and scope of revisions will be defined in the proposal, so both of us know what is covered before work begins." },
      { question: "How does pricing work?", answer: "Project fees are quoted after the scope is understood. Share a budget range if you have one; it helps shape an appropriate recommendation." },
      { question: "Can you take on my project now?", answer: "Availability is confirmed individually. Send your preferred start date and deadline with your enquiry; submitting an enquiry does not reserve a slot." },
    ]} /></section>
    <Invitation label="Tell Me About Your Project" />
  </>;
}
