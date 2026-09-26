"use client";
import Icon from "@/app/components/site-icon";

import { useState } from "react";
import Link from "next/link";
import { links } from "@/lib/site-content";

const categories = [
  "All work",
  "Content & Brand Strategy",
  "Email Marketing",
  "Storytelling & Copywriting",
  "Community Building",
];
type WorkItem = {
  title: string;
  category: string;
  type: string;
  href?: string;
  copy: string;
  number: string;
  theme: string;
};
const work: WorkItem[] = [
  {
    title: "Stories, thoughts & everything between",
    category: "Storytelling & Copywriting",
    type: "Personal platform",
    href: links.substack,
    copy: "Explore my writing on Substack to get a feel for my voice and approach to storytelling.",
    number: "01",
    theme: "writing",
  },
  {
    title: "Impact Channel",
    category: "Community Building",
    type: "Community management",
    copy: "My community management experience includes work with Impact Channel.",
    number: "02",
    theme: "community",
  },
];

export default function WorkBrowser() {
  const [category, setCategory] = useState("All work");
  const shown = work.filter(
    (item) => category === "All work" || item.category === category,
  );
  return (
    <>
      <div className="filter-bar" aria-label="Filter work by discipline">
        {categories.map((item) => (
          <button
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="work-results" aria-live="polite" aria-atomic="true">
        <p className="result-count">
          {shown.length} {shown.length === 1 ? "space" : "spaces"} to explore ·{" "}
          {category}
        </p>
        {shown.length ? (
          <div className="work-grid">
            {shown.map((item) => {
              const card = (
                <>
                  <div className="portfolio-entry-top">
                    <span>{item.type}</span>
                    <span>
                      {item.number} {item.href && <Icon name="arrow" />}
                    </span>
                  </div>
                  <span className="portfolio-symbol" aria-hidden="true">
                    <Icon name={item.theme === "writing" ? "pen" : "users"} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="tile-link">
                    {item.category} {item.href && <Icon name="arrow" />}
                  </span>
                </>
              );
              return item.href ? (
                <a
                  key={item.title}
                  className={`portfolio-entry ${item.theme}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card}
                </a>
              ) : (
                <article
                  key={item.title}
                  className={`portfolio-entry ${item.theme}`}
                >
                  {card}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-work">
            <span aria-hidden="true">
              <Icon name="users" />
            </span>
            <h3>
              Let’s talk about your{" "}
              {category === "Email Marketing" ? "email" : "content"} project.
            </h3>
            <p>
              There are no public samples in this category yet. Share your brief
              to discuss the approach and relevant work that can be shared.
            </p>
            <Link
              className="inline-link"
              href={`/work-with-me?service=${category === "Email Marketing" ? "email-marketing" : "content-strategy"}`}
            >
              Discuss a project <Icon name="arrow" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
