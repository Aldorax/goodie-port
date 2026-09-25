import Icon from "@/app/components/site-icon";
import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, SectionTitle, Button, External, Invitation } from "../components/site-ui";
import { experiences } from "@/lib/site-content";

export const metadata: Metadata = { title: "About Goodness" };
const process = ["Listen", "Research", "Find the Story", "Build the Strategy", "Create", "Refine", "Deliver"];

export default function AboutPage() {
  return <>
    <PageIntro eyebrow="THE PERSON BEHIND THE WORDS" title="Goodness Adeniyi Orishe." accent="A story still being written."><p>A writer, storytelling strategist, writing coach, and community builder.<br />You can call me Goodness — or Coach Goodie.</p></PageIntro>
    <section className="about-story wrap">
      <div className="about-photo"><Image src="/goodness-portrait.png" alt="Goodness Adeniyi Orishe" width={1086} height={1448} sizes="(max-width: 700px) 90vw, 480px" loading="eager" /></div>
      <div className="prose"><SectionTitle kicker="My story" title="Words are where" accent="it begins." /><p>My work spans writing, coaching, storytelling strategy, and community management. From writing with Value Reorientation between 2021 and 2025 to coaching writers in 2025 and 2026, communication has been the thread.</p><p>Today, my experience also includes community management and co-founding AUVRAAI. Different roles, with a shared question: how do we help people understand, connect, and take their next step?</p><p>I bring that question to content, email, brand stories, and the communities around them.</p><Button href="/work">Explore My Work</Button></div>
    </section>
    <section className="statement-panel wrap"><p className="section-kicker">Why “Commissioner of Stories”?</p><h2>There’s a story in what you do.<br /><span className="heading-accent">My work is to help it find its voice.</span></h2><p>A title that puts the story first: finding the thread, giving it structure, and making the message make sense to the people who need to hear it.</p></section>
    <section className="content-section wrap"><SectionTitle kicker="What I do" title="Different disciplines." accent="A shared purpose." /><div className="discipline-list"><span>Content strategy</span><span>Email marketing</span><span>Storytelling & copywriting</span><span>Community management</span><span>Writing coaching</span></div><Button href="/services" secondary>Find the right support</Button></section>
    <section className="content-section wrap"><SectionTitle kicker="What I believe" title="Make it clear." accent="Keep it human." /><div className="principle-grid">{[["Clarity is a form of care.", "People shouldn’t have to work hard to understand why your message matters."], ["An audience is made of people.", "The best communication starts with attention to their questions, context, and experience."], ["Connection takes intention.", "A story can open a door. Consistent, thoughtful communication helps people stay."]].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="process-strip wrap"><SectionTitle kicker="My creative process" title="Before the final words," accent="the right questions." /><ol>{process.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol></section>
    <section className="content-section wrap"><div className="section-top"><SectionTitle kicker="My journey" title="The chapters" accent="so far." /><p>Professional roles and experience.<br />Each link leads to the relevant organisation or space.</p></div><div className="journey-list">{experiences.map(experience => <External href={experience.href} className="experience-row" key={experience.name}><div><h3>{experience.name}</h3>{experience.role && <p>{experience.role}</p>}</div><span>{experience.date}</span><span aria-hidden="true"><Icon name="arrow" /></span></External>)}</div></section>
    <Invitation title="Let’s find the story in your next chapter." text="A clear idea. A thoughtful conversation. A place to begin." label="Work With Me" />
  </>;
}
