import Image from "next/image";
import Link from "next/link";
import Icon from "./components/site-icon";
import { Button, Invitation, SectionTitle, External } from "./components/site-ui";
import { links, services } from "@/lib/site-content";

export default function Home() {
  return <>
    <section className="studio-hero" aria-labelledby="hero-heading">
      <div className="studio-hero-grid wrap">
        <div className="studio-hero-copy">
          <p className="eyebrow">GOODNESS ADENIYI ORISHE / COMMISSIONER OF STORIES</p>
          <h1 id="hero-heading">Good stories.<br />Clear strategy.<br /><span>Real connection.</span></h1>
          <p className="studio-description">I help brands turn ideas into stories people remember, content that connects, and emails that convert.</p>
          <div className="studio-actions"><Button href="/work">Explore my work</Button><Link href="/work-with-me">Let’s work together <Icon name="arrow" /></Link></div>
          <div className="studio-specialties"><span>Content & email strategy</span><span>Storytelling</span><span>Community</span></div>
        </div>
        <div className="studio-portrait">
          <div className="portrait-label"><span>THE PERSON BEHIND THE WORDS</span><span>01 / INTRODUCTION</span></div>
          <Image src="/goodness-portrait.png" alt="Goodness Adeniyi Orishe" width={1086} height={1448} sizes="(max-width: 700px) 90vw, 42vw" loading="eager" />
          <div className="portrait-caption"><div><strong>Goodness Adeniyi</strong><span>Strategist. Writer. Community builder.</span></div><Link href="/about" aria-label="Meet Goodness"><Icon name="arrow" /></Link></div>
        </div>
      </div>
      <div className="hero-index wrap"><span>STRATEGY WITH INTENTION. WORDS WITH SUBSTANCE.</span><a href="#expertise">Explore the practice <Icon name="down" /></a></div>
    </section>

    <section className="experience-summary wrap"><p className="section-kicker">A practice built<br />on experience.</p><div><strong>2021—2025</strong><span>Writing & communication</span></div><div><strong>2025—2026</strong><span>Writing coaching & storytelling strategy</span></div><Link href="/about">Explore my journey <Icon name="arrow" /></Link></section>

    <section className="expertise-section wrap" id="expertise">
      <div className="editorial-section-head"><p className="section-kicker">01 / HOW I CAN HELP</p><div><h2>The right message.<br /><span className="heading-accent">A deliberate direction.</span></h2><p>From the first idea to the words your audience sees. A considered approach to how your brand communicates.</p></div></div>
      <div className="expertise-list">{services.map(service => <Link href={`/services#${service.id}`} className="expertise-row" key={service.id}><span className="row-number">{service.number}</span><Icon name={service.symbol} className="expertise-icon" /><h3>{service.title}</h3><p>{service.short}</p><Icon name="arrow" className="row-arrow" /></Link>)}</div>
    </section>

    <section className="selected-section wrap">
      <div className="section-top"><SectionTitle kicker="02 / WRITING & COMMUNITY" title="A closer look" accent="at the practice." /><Link href="/work" className="inline-link">Explore my work <Icon name="arrow" /></Link></div>
      <div className="editorial-work-grid">
        <External href={links.substack} className="editorial-work writing-feature"><div className="feature-meta"><span>PERSONAL WRITING</span><Icon name="arrow" /></div><div className="feature-title">Life, work &<br />the words<br /><span>in between.</span></div><div className="feature-bottom"><Icon name="book" /><div><h3>Notes from Goodness</h3><p>Read my writing on Substack</p></div></div></External>
        <Link href="/work#community" className="editorial-work community-feature"><div className="feature-meta"><span>COMMUNITY & TEACHING</span><Icon name="arrow" /></div><div className="feature-title">Good words<br />bring people<br /><span>together.</span></div><div className="feature-bottom"><Icon name="users" /><div><h3>Beyond the page</h3><p>Writing coaching & community practice</p></div></div></Link>
      </div>
    </section>

    <section className="approach-band"><div className="wrap approach-layout"><div><p className="section-kicker">03 / THE WAY I THINK</p><h2>Understand first.<br />Then find<br /><span>the words.</span></h2></div><div className="approach-detail"><p className="approach-lead">I find the story. I spot what’s missing. I make the message make sense.</p><p>Every brief starts with a person, a purpose, and an audience. I take the time to understand all three before deciding what to say — and how to say it.</p><Link href="/about" className="inline-link">Meet Goodness <Icon name="arrow" /></Link><ol><li><span>01</span>Listen to the context.</li><li><span>02</span>Find a clear direction.</li><li><span>03</span>Create with the audience in mind.</li></ol></div></div></section>

    <section className="content-section wrap working-section"><div className="editorial-section-head"><p className="section-kicker">04 / WORKING TOGETHER</p><h2>Thoughtful work.<br /><span className="heading-accent">A straightforward process.</span></h2></div><div className="principle-grid">{[["A conversation, first.", "We make room for the context behind your brief, so the work responds to what you actually need."], ["A shared direction.", "Clear scope, considered decisions, and a reason behind the words we choose."], ["People at the centre.", "Your audience’s questions and experience inform the message from the first idea to the final draft."]].map(([title, copy], index) => <article key={title}><span className="nav-label">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="next-paths wrap"><Link href="/learn" className="next-path"><div className="path-heading"><Icon name="book" /><span className="section-kicker">LEARN WITH ME</span><Icon name="arrow" /></div><h2>Develop your voice.<br /><span className="heading-accent">Build your practice.</span></h2><p>Focused 1:1 sessions, writing mentorship, and space to learn alongside other writers.</p><span className="inline-link">Explore sessions & mentorship</span></Link><Link href="/speaking" className="next-path"><div className="path-heading"><Icon name="mic" /><span className="section-kicker">SPEAKING</span><Icon name="arrow" /></div><h2>Bring a useful<br /><span className="heading-accent">conversation to the room.</span></h2><p>Storytelling, content, and community — shaped around the people you’re bringing together.</p><span className="inline-link">Explore speaking</span></Link></section>
    <Invitation title="Let’s give your message a clear direction." text="Tell me what you’re working on. We’ll find the right place to start." label="Start a conversation" />
  </>;
}
