import Icon from "@/app/components/site-icon";
import Link from "next/link";
import type { ReactNode } from "react";

export function External({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export function Button({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  const className = `button${secondary ? " button-secondary" : ""}`;
  const content = <>{children}<span aria-hidden="true"><Icon name="arrow" /></span></>;
  return href.startsWith("https:")
    ? <External href={href} className={className}>{content}</External>
    : <Link href={href} className={className}>{content}</Link>;
}

export function PageIntro({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent: string; children?: ReactNode }) {
  return <section className="page-intro wrap">
    <p className="eyebrow">{eyebrow}</p>
    <h1>{title}<br /><span className="heading-accent">{accent}</span></h1>
    {children && <div className="page-intro-copy">{children}</div>}
  </section>;
}

export function SectionTitle({ kicker, title, accent }: { kicker: string; title: string; accent?: string }) {
  return <div className="section-heading"><p className="section-kicker">{kicker}</p><h2>{title}{accent && <>{" "}<span className="heading-accent">{accent}</span></>}</h2></div>;
}

export function Invitation({ title = "Have something you’re trying to communicate?", text = "Let’s make the message make sense.", href = "/work-with-me", label = "Let’s Talk" }: { title?: string; text?: string; href?: string; label?: string }) {
  return <section className="contact-section"><div className="contact-glow" /><div className="contact-content"><p className="section-kicker">Your next chapter</p><h2>{title}</h2><p>{text}</p><Button href={href}>{label}</Button></div></section>;
}

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return <div className="faq-list">{items.map(item => <details key={item.question}><summary>{item.question}<Icon name="plus" /></summary><p>{item.answer}</p></details>)}</div>;
}
