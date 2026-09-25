import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/site-ui";

export const metadata: Metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return <>
    <PageIntro eyebrow="YOUR INFORMATION" title="A little clarity" accent="on privacy."><p>How information is handled on the Commissioner of Stories website.</p></PageIntro>
    <article className="privacy-copy wrap prose">
      <h2>Information you choose to share</h2><p>The enquiry forms ask for your name, email, and information about your project or event. Optional fields are labelled. These details are intended to help Goodness understand and respond to your enquiry.</p>
      <h2>Preparing and sending an enquiry</h2><p>Preparing a draft happens in your browser. Reviewing, copying, or downloading it does not send it to Goodness. Drafts are not stored in browser storage by this site and may be lost when you leave or reload the page.</p><p>When online delivery is available, selecting “Send enquiry” sends the form to the website’s server and its configured enquiry delivery service. When email is offered instead, you must send the message from your email app. A draft or opened email is not a confirmed submission.</p>
      <h2>Technical information</h2><p>This site does not add advertising trackers or analytics cookies. The hosting service may process ordinary technical request information when it serves the website.</p>
      <h2>External websites</h2><p>Links to Selar, Substack, WhatsApp, and other platforms take you to services with their own privacy information and terms. Purchases and subscriptions on those platforms are handled there.</p>
      <h2>Questions about your information</h2><p>Use an available contact method on the <Link href="/work-with-me">Work With Me page</Link> to ask about information you have shared or request a correction or deletion.</p>
    </article>
  </>;
}
