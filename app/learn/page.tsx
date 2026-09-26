import Icon from "@/app/components/site-icon";
import type { Metadata } from "next";
import Link from "next/link";
import {
  PageIntro,
  SectionTitle,
  Button,
  FAQ,
  Invitation,
} from "../components/site-ui";
import { links } from "@/lib/site-content";

export const metadata: Metadata = { title: "Learn With Me" };
const pathways = [
  {
    label: "ONE QUESTION. A CLEARER DIRECTION.",
    title: "1:1 Sessions",
    text: "Focused support for a specific content, brand, or storytelling challenge.",
    href: "/learn/sessions",
    symbol: "strategy",
  },
  {
    label: "MAKE ROOM FOR YOUR DEVELOPMENT.",
    title: "Mentorship",
    text: "Explore guidance for developing your writing and storytelling practice.",
    href: "/learn/mentorship",
    symbol: "pen",
  },
  {
    label: "EXPLORE AT YOUR OWN PACE.",
    title: "Resources",
    text: "Start with my public writing and a prompt for your next blank page.",
    href: "#resources",
    symbol: "book",
  },
];

export default function LearnPage() {
  return (
    <>
      <PageIntro
        eyebrow="LEARN WITH ME"
        title="Find your words."
        accent="Make them yours."
      >
        <p>
          For writers finding their voice, creators seeking direction, and
          people ready to communicate with more intention.
        </p>
        <Button href="#find-support">Find the right support</Button>
      </PageIntro>
      <section className="content-section wrap" id="find-support">
        <SectionTitle
          kicker="Start where you are"
          title="What do you need"
          accent="right now?"
        />
        <div className="pathway-grid">
          {pathways.map((path) => (
            <Link key={path.title} href={path.href} className="pathway-card">
              <span className="tile-symbol" aria-hidden="true">
                <Icon name={path.symbol} />
              </span>
              <span className="nav-label">{path.label}</span>
              <h3>{path.title}</h3>
              <p>{path.text}</p>
              <span className="tile-link">
                Explore{" "}
                <span aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="learning-banner wrap">
        <div>
          <p className="section-kicker">1:1 with Goodness</p>
          <h2>
            A little clarity
            <br />
            <span className="heading-accent">can change the next step.</span>
          </h2>
          <p>
            Content clarity, personal branding, content strategy, or
            storytelling. Compare the focus of each conversation and enquire
            about the one that fits.
          </p>
          <Button href="/learn/sessions">Find My Session</Button>
        </div>
        <div className="learning-banner-art" aria-hidden="true">
          <span>
            <Icon name="message" />
          </span>
          <p>
            Your questions.
            <br />
            <span className="heading-accent">Our starting point.</span>
          </p>
        </div>
      </section>
      <section className="editorial-split wrap">
        <div>
          <p className="section-kicker">Writing & storytelling mentorship</p>
          <h2>
            Give your voice
            <br />
            <span className="heading-accent">room to grow.</span>
          </h2>
        </div>
        <div className="prose">
          <p>
            Explore writing mentorship with Coach Goodie. Bring your questions
            about voice, structure, clarity, and the stories you want to tell.
          </p>
          <p>
            Current programme details, pricing, and enrolment are available
            through the mentorship listing on Selar.
          </p>
          <Button href="/learn/mentorship">Explore Mentorship</Button>
        </div>
      </section>
      <section className="content-section wrap" id="resources">
        <SectionTitle
          kicker="Explore at your own pace"
          title="A little inspiration"
          accent="for the page."
        />
        <div className="resource-grid">
          <article className="resource-card">
            <span className="resource-label">PUBLIC WRITING · EXTERNAL</span>
            <h3>Notes from Goodness</h3>
            <p>
              Explore my Substack for writing and reflections. Any subscription
              or paid-post terms are shown on Substack.
            </p>
            <Button href={links.substack} secondary>
              Read on Substack
            </Button>
          </article>
          <article className="resource-card peach-card">
            <span className="resource-label">FREE · WRITING PROMPT</span>
            <h3>Start with a moment.</h3>
            <p>
              Think of a small moment that changed how you saw something. What
              happened? What did you notice? What do you understand now that you
              didn’t then?
            </p>
            <p className="prompt-instruction">
              Write for ten minutes. Find the one sentence you most want to
              keep. Begin again from there.
            </p>
          </article>
        </div>
      </section>
      <section className="faq-section wrap">
        <SectionTitle
          kicker="A little more clarity"
          title="Before we"
          accent="begin."
        />
        <FAQ
          items={[
            {
              question: "Should I choose a session or mentorship?",
              answer:
                "A session begins with one defined question or challenge. Mentorship is a route to explore if you want support with your writing development. Share your goals if you are unsure where to begin.",
            },
            {
              question: "Where can I find dates and prices?",
              answer:
                "For mentorship, check the current Selar listing. For 1:1 sessions, enquire first to confirm scope, format, duration, availability, and fee before booking.",
            },
          ]}
        />
      </section>
      <Invitation
        title="You don’t need all the right words yet."
        text="A question, an idea, or a story you can’t stop thinking about is a good place to start."
        href="/learn/sessions"
        label="Find My Session"
      />
    </>
  );
}
