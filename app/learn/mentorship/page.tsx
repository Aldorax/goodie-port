import type { Metadata } from "next";
import { links, enquiryHref } from "@/lib/site-content";
import { PageIntro, SectionTitle, Button, FAQ, Invitation } from "../../components/site-ui";

export const metadata: Metadata = { title: "Writing & Storytelling Mentorship" };
export default function MentorshipPage() {
  return <>
    <PageIntro eyebrow="MENTORSHIP WITH COACH GOODIE" title="Your story deserves" accent="room to grow."><p>Explore support for developing your writing voice and storytelling practice.</p><div className="button-row"><Button href={links.mentorship}>View the mentorship on Selar</Button><Button href={enquiryHref("mentorship")} secondary>Ask a question</Button></div></PageIntro>
    <section className="editorial-split wrap"><SectionTitle kicker="Who it is for" title="Writers with something" accent="to say." /><div className="prose"><p>You may have ideas that are difficult to organise, a story you want to tell more clearly, or a desire to take your writing more seriously.</p><p>Bring your goals to the conversation. We can explore whether the current mentorship is the right support for you.</p></div></section>
    <section className="content-section wrap"><SectionTitle kicker="Questions to bring" title="From finding the words" accent="to shaping the story." /><div className="principle-grid">{[["Voice", "How do I make my writing sound like me?"], ["Structure", "How do I turn my ideas into a story someone can follow?"], ["Clarity", "What do I want my reader to understand or feel?"]].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="statement-panel wrap"><SectionTitle kicker="Programme details & enrolment" title="The current offer," accent="in one place." /><p>Visit the Selar listing for the current programme format, duration, support, price, and enrolment details. Review the offer and its terms there before purchasing.</p><Button href={links.mentorship}>Explore the current mentorship</Button></section>
    <section className="faq-section wrap"><SectionTitle kicker="Before you join" title="A couple of" accent="questions." /><FAQ items={[{ question: "How do I join?", answer: "Open the current mentorship listing on Selar and follow the enrolment instructions there. If you want to discuss fit first, use the mentorship enquiry form." }, { question: "Can I ask about the support or schedule first?", answer: "Yes. Share your writing goals and the details you want to clarify in your enquiry. Programme information shown on Selar should be reviewed before making a purchase." }]} /></section>
    <Invitation title="Let’s talk about your writing." href={enquiryHref("mentorship")} text="Tell me what you want to develop and where you’d like guidance." label="Ask About Mentorship" />
  </>;
}
