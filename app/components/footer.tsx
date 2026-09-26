import Icon from "@/app/components/site-icon";
import Link from "next/link";
import { links } from "@/lib/site-content";
import { External } from "./site-ui";
import BrandLogo from "./brand-logo";

export default function Footer() {
  const email = process.env.CONTACT_EMAIL;
  return (
    <footer className="footer wrap">
      <div className="footer-grid">
        <div>
          <Link
            href="/"
            className="footer-brand brand-image-link"
            aria-label="Commissioner of Stories home"
          >
            <BrandLogo footer />
          </Link>
          <p className="footer-positioning">
            Content & Email Strategist.
            <br />
            Storyteller. Community Builder.
            <br />
            <br />
            Goodness Adeniyi Orishe
          </p>
        </div>
        <nav aria-label="Explore">
          <span className="nav-label">EXPLORE</span>
          <Link href="/about">About Goodness</Link>
          <Link href="/work">My Work & Proof</Link>
          <Link href="/services">Services</Link>
          <Link href="/speaking">Speaking</Link>
        </nav>
        <nav aria-label="Learn">
          <span className="nav-label">GROW</span>
          <Link href="/learn">Learn With Me</Link>
          <Link href="/learn/sessions">1:1 Sessions</Link>
          <Link href="/learn/mentorship">Mentorship</Link>
          <Link href="/learn#resources">Resources</Link>
        </nav>
        <nav aria-label="Connect">
          <span className="nav-label">CONNECT</span>
          <Link href="/work-with-me">
            Work With Me <Icon name="arrow" />
          </Link>
          {email && <a href={`mailto:${email}`}>{email}</a>}
          <External href={links.substack}>
            Substack <Icon name="arrow" />
          </External>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        Every story <span className="heading-accent">matters.</span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Goodness Adeniyi Orishe</span>
        <span>WRITTEN WITH PURPOSE. MADE WITH HEART.</span>
      </div>
    </footer>
  );
}
