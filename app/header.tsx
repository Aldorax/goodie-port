"use client";
import Icon from "@/app/components/site-icon";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import BrandLogo from "./components/brand-logo";

const learning = [["Overview", "/learn"], ["1:1 Sessions", "/learn/sessions"], ["Mentorship", "/learn/mentorship"], ["The Classroom", "/learn#classroom"], ["Resources", "/learn#resources"]];
const navigation = [["About", "/about"], ["My Work", "/work"], ["Services", "/services"]];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const learnButton = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(false); setLearnOpen(false); };

  return <header className="site-header wrap full-header" onKeyDown={event => {
    if (event.key === "Escape") {
      if (learnOpen) { setLearnOpen(false); learnButton.current?.focus(); }
      else if (open) { setOpen(false); menuButton.current?.focus(); }
    }
  }}>
    <a className="skip-link" href="#main">Skip to content</a>
    <Link href="/" className="brand brand-image-link" aria-label="Commissioner of Stories home" onClick={close}><BrandLogo /></Link>
    <button ref={menuButton} className={`menu-button ${open ? "is-open" : ""}`} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation" onClick={() => { setOpen(!open); setLearnOpen(false); }}><span /><span /></button>
    <nav id="main-navigation" className={`primary-navigation ${open ? "mobile-open" : ""}`} aria-label="Main navigation">
      <Link href="/" className="mobile-home" aria-current={pathname === "/" ? "page" : undefined} onClick={close}>Home</Link>
      {navigation.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={close}><span className="nav-desktop-label">{label}</span><span className="nav-mobile-label">{label === "About" ? "About Goodness" : label === "My Work" ? "My Work & Proof" : label}</span></Link>)}
      <div className="learn-navigation" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setLearnOpen(false); }}>
        <button ref={learnButton} className={pathname.startsWith("/learn") ? "active-nav" : ""} aria-expanded={learnOpen} aria-controls="learning-navigation" onClick={() => setLearnOpen(!learnOpen)}>Learn With Me <span aria-hidden="true"><Icon name={learnOpen ? "minus" : "plus"} /></span></button>
        <div id="learning-navigation" className="learning-dropdown" hidden={!learnOpen}>{learning.map(([label, href]) => <Link href={href} key={href} onClick={close}>{label}<span aria-hidden="true"><Icon name="arrow" /></span></Link>)}</div>
      </div>
      <Link href="/speaking" aria-current={pathname === "/speaking" ? "page" : undefined} onClick={close}>Speaking</Link>
      <Link href="/work-with-me" className="button nav-cta" aria-current={pathname === "/work-with-me" ? "page" : undefined} onClick={close}>Work With Me <span aria-hidden="true"><Icon name="arrow" /></span></Link>
    </nav>
  </header>;
}
