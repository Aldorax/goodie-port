import Icon from "@/app/components/site-icon";
import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, SectionTitle, Button } from "../components/site-ui";
import EnquiryForm from "../components/enquiry-form";
import { speakingTopics } from "@/lib/site-content";

export const metadata: Metadata = { title: "Speaking" };
export default function SpeakingPage() {
  return <>
    <PageIntro eyebrow="FOR EVENTS, WORKSHOPS & COMMUNITIES" title="Book Goodness" accent="to speak."><p>Stories help us understand ourselves, our work, and each other. Let’s explore a conversation that meets your audience where they are.</p><Button href="#speaking-enquiry">Invite Me to Speak</Button></PageIntro>
    <section className="content-section wrap"><SectionTitle kicker="Speaking topics" title="Conversations that" accent="open something up." /><div className="topic-grid">{speakingTopics.map(([title, text], i) => <article key={title}><span className="nav-label">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="statement-panel wrap"><p className="section-kicker">Let’s find the right format</p><h2>A room. A screen.<br /><span className="heading-accent">A shared question.</span></h2><p>Tell me whether you’re planning a talk, workshop, panel, or community session. We’ll discuss the format, audience, and scope before confirming an invitation.</p><div className="discipline-list"><span>Talks</span><span>Workshops</span><span>Panels</span><span>Community sessions</span></div></section>
    <section className="speaker-bio wrap"><div className="speaker-photo"><Image src="/goodness-portrait.png" alt="Speaker portrait of Goodness Adeniyi Orishe" width={1086} height={1448} sizes="(max-width:700px) 90vw, 380px" /></div><div className="prose"><SectionTitle kicker="For organisers" title="Meet your" accent="speaker." /><p>Goodness Adeniyi Orishe, known as Commissioner of Stories and Coach Goodie, is a writer, storytelling strategist, writing coach, and community builder. Her work brings together content, communication, and the people behind the message. Her professional experience includes writing, coaching, community management, and co-founding AUVRAAI.</p><a className="button button-secondary" href="/goodness-portrait.png" download="Goodness-Adeniyi-Orishe-portrait.png">Download speaker portrait <span aria-hidden="true"><Icon name="down" /></span></a><p className="field-helper">For use alongside Goodness’s speaker biography and event invitation.</p></div></section>
    <section className="enquiry-layout wrap" id="speaking-enquiry"><div className="enquiry-aside"><p className="section-kicker">Your invitation starts here</p><h2>Tell me about<br /><span className="heading-accent">your room.</span></h2><p>Share your event, your audience, and the conversation you hope to create. Dates, format, and fees are confirmed individually.</p></div><EnquiryForm initialService="speaking" speakingOnly contactEmail={process.env.CONTACT_EMAIL} deliveryEnabled={Boolean(process.env.ENQUIRY_WEBHOOK_URL)} /></section>
  </>;
}
