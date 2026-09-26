import Icon from "@/app/components/site-icon";
import type { Metadata } from "next";
import Link from "next/link";
import {
  PageIntro,
  SectionTitle,
  Invitation,
  Button,
  External,
} from "../components/site-ui";
import WorkBrowser from "../components/work-browser";
import { experiences } from "@/lib/site-content";

export const metadata: Metadata = { title: "My Work & Proof" };
export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="MY WORK & PROOF"
        title="The work. The thinking."
        accent="The difference it makes."
      >
        <p>
          Explore my public writing and community practice. Personal work is
          labelled separately from client projects.
        </p>
      </PageIntro>
      <section className="content-section wrap">
        <SectionTitle
          kicker="Browse my work"
          title="Start with"
          accent="the words."
        />
        <WorkBrowser />
      </section>
      <section className="editorial-split wrap">
        <div>
          <p className="section-kicker">Writing & campaign samples</p>
          <h2>
            Read the work.
            <br />
            <span className="heading-accent">Get to know the voice.</span>
          </h2>
        </div>
        <div className="prose">
          <p>
            My Substack is the place to explore my personal writing. It offers a
            direct introduction to how I use words, build a story, and connect
            with a reader.
          </p>
          <p>
            For a specific content or email brief, tell me what you need. We can
            discuss relevant examples and what is available to share.
          </p>
          <Link className="inline-link" href="/work-with-me">
            Discuss a similar project <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <section className="content-section wrap">
        <div className="section-top">
          <SectionTitle
            kicker="Professional experience"
            title="The work behind"
            accent="the work."
          />
          <p>
            Selected roles and experience alongside the public work samples
            above.
          </p>
        </div>
        <div className="journey-list">
          {experiences
            .filter((experience) => experience.name !== "Substack")
            .map((experience) => {
              const row = (
                <>
                  <div>
                    <h3>{experience.name}</h3>
                    {experience.role && <p>{experience.role}</p>}
                  </div>
                  <span>{experience.date}</span>
                  {experience.href && (
                    <span aria-hidden="true">
                      <Icon name="arrow" />
                    </span>
                  )}
                </>
              );
              return experience.href ? (
                <External
                  href={experience.href}
                  className="experience-row"
                  key={experience.name}
                >
                  {row}
                </External>
              ) : (
                <div className="experience-row" key={experience.name}>
                  {row}
                </div>
              );
            })}
        </div>
      </section>
      <section className="statement-panel wrap" id="community">
        <p className="section-kicker">Community practice</p>
        <h2>
          Words open the door.
          <br />
          <span className="heading-accent">People make the community.</span>
        </h2>
        <p>
          My professional experience includes writing coaching, storytelling
          strategy, and community management. These roles sit alongside my
          personal writing and co-founder experience.
        </p>
        <Button href="/about" secondary>
          Explore my journey
        </Button>
      </section>
      <section className="content-section wrap quiet-note">
        <span className="nav-label">A NOTE ON PROOF</span>
        <p>
          Public writing and community links are shared here as examples of my
          practice. Client results, campaign metrics, and testimonials will only
          appear with their supporting context and permission.
        </p>
      </section>
      <Invitation
        title="Working on something similar?"
        text="Tell me about your audience, your message, and what you want it to achieve."
        label="Discuss a Similar Project"
      />
    </>
  );
}
