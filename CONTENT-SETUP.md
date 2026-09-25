# Commissioner of Stories — content and enquiry setup

## What is ready

Seven main routes: `/`, `/about`, `/work`, `/services`, `/learn`, `/speaking`, `/work-with-me`.
Supporting routes: `/learn/sessions`, `/learn/mentorship`, `/privacy`.
The Classroom and Resources links lead to substantive sections on `/learn`; no empty programme or resource pages are published.

Content is shared in `lib/site-content.ts`. Professional history is distinct from project proof. The four 1:1 themes from the brief are enquiry options; no unconfirmed durations, prices, or dates are advertised.

## Enquiry delivery

Copy `.env.example` to `.env.local` and restart the development server after setting values. Never commit secrets.

- `CONTACT_EMAIL`: professional email shown publicly. Enables an email-compose link after reviewing an enquiry when no webhook is configured. The visitor must send from their email app; the site does not claim receipt.
- `ENQUIRY_WEBHOOK_URL`: an HTTPS endpoint belonging to your chosen form/email service or workflow. The server POSTs `{ source, submittedAt, enquiry }` as JSON. `enquiry` includes the validated fields in `lib/enquiry.ts` and consent. The endpoint must return a successful HTTP status only after accepting the enquiry for delivery/storage.
- `ENQUIRY_WEBHOOK_TOKEN`: optional bearer token sent only by the server.

Without a destination, the form states that online enquiries are not open and offers review, copy, and download. It does not claim a draft was sent. With a webhook, the confirmation screen appears only after a successful endpoint response. Failed delivery retains the form and draft. Configure rate limiting / spam protection in the receiving service or hosting layer before public launch.

Do not use the writing group invite as a private enquiry destination.

## Content still needed from Goodness

- Professional email, personal LinkedIn / Instagram URLs, and permission before publishing any personal WhatsApp number.
- Approved project details: problem, scope, approach, deliverables, samples, dated outcomes, and permission to display client names/assets. AUVRAAI and Lyna remain professional-history entries; they are not published as case studies.
- Verified metrics and testimonials with names, roles, project context, and permission. No made-up stats or testimonials are used.
- Personal origin story, interests beyond work, and verified features/recognition.
- Confirmed learning formats, duration, fees, support, class schedules, and actual programme/resource assets. Current mentorship enquiries/purchases link to the supplied Selar listing.
- Past speaking events, dates, audiences, photos/clips, and authorised feedback.
- Final confirmation of service arrangements, revision/pricing policy, response process, and availability. These are currently described as scope-dependent and subject to agreement.
- Review privacy information against the chosen hosting/delivery provider and actual retention practices before publishing. Add applicable booking/purchase terms once established; purchases currently take place on Selar under the terms shown there.

After receiving approved case-study or programme content, add its own page and connect it from the work/learning index. Do not publish empty future-offer pages.
