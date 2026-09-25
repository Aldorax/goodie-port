export const links = {
  mentorship: "https://selar.com/37su372q1s",
  community: "https://chat.whatsapp.com/LKqHKuoahS7LrGBmt8hvk5?s=cl&p=a&mlu=0",
  substack: "https://substack.com/@coachgoodie1",
};

export const services = [
  {
    id: "content-strategy", title: "Content Strategy", number: "01", symbol: "strategy",
    short: "Give your ideas a direction — and your audience a reason to care.",
    audience: "For brands and founders who have something to say, but need a clearer plan.",
    problem: "When content feels scattered, more posts aren’t always the answer. Start with a message, an audience, and a purpose.",
    includes: ["Audience and communication goals", "Positioning and key messages", "Content pillars and editorial direction", "A practical content plan"],
  },
  {
    id: "email-marketing", title: "Email Marketing", number: "02", symbol: "mail",
    short: "Turn an inbox into the beginning of a real relationship.",
    audience: "For brands building relationships with subscribers, customers, or members.",
    problem: "A good email has a reason to arrive. Build a clear journey from the first hello to the next meaningful action.",
    includes: ["Newsletter strategy and copy", "Welcome sequences", "Campaign messaging", "Clear calls to action"],
  },
  {
    id: "storytelling-copywriting", title: "Storytelling & Copywriting", number: "03", symbol: "pen",
    short: "Find the human story behind what you do. Then find the right words.",
    audience: "For people and brands who want their message to sound like them — and mean something to their audience.",
    problem: "You know your work matters. The challenge is explaining why in a way that feels clear, human, and worth remembering.",
    includes: ["Brand stories and messaging", "Website copy", "Social content", "Story-led campaign copy"],
  },
  {
    id: "community-management", title: "Community Management", number: "04", symbol: "users",
    short: "Create a space people want to participate in, not just join.",
    audience: "For organisations and community-led brands bringing people around a shared purpose.",
    problem: "Membership is a beginning. Thoughtful communication and participation are what help a community feel alive.",
    includes: ["Community communication", "Engagement planning", "Programming and conversation prompts", "Member experience and retention planning"],
  },
];

export const sessions = [
  { id: "content-clarity", title: "Content Clarity Session", audience: "You have ideas, but aren’t sure what to say first.", outcome: "Work towards a focused message and a practical next step.", symbol: "strategy" },
  { id: "personal-brand", title: "Personal Brand Strategy", audience: "You want to communicate what you do and what you stand for.", outcome: "Clarify your positioning, audience, and the story connecting them.", symbol: "users" },
  { id: "content-session", title: "Content Strategy Session", audience: "You know your message, but need a plan for sharing it.", outcome: "Identify content pillars and a direction you can build on.", symbol: "book" },
  { id: "storytelling-session", title: "Storytelling Session", audience: "You have a story to tell and want to give it shape.", outcome: "Explore structure, voice, and the details that make it connect.", symbol: "pen" },
];

// Professional history supplied by Goodness. These are not case studies or claims of client results.
export const experiences = [
  { name: "AUVRAAI", role: "Co-founder", date: "Present", href: "https://auvraai.ai" },
  { name: "Impact Channel", role: "Community Manager", date: "Present", href: "https://whatsapp.com/channel/0029VbDWCZXCnA7tUPRDDj1c" },
  { name: "Writing & Storytelling", role: "Writing Coach & Storytelling Strategist", date: "Jun 2025 — Jul 2026", href: links.community },
  { name: "Lyna", role: "", date: "Jun — Dec 2025", href: "https://www.linkedin.com/company/lynacycle/" },
  { name: "Value Reorientation", role: "Writer", date: "2021 — 2025", href: "https://www.facebook.com/share/g/1cG3j1jtFr/" },
  { name: "Father and Daughter", role: "Community Manager", date: "", href: "https://share.google/FtIcmgcer1YTbJbRS" },
  { name: "Substack", role: "Writer", date: "", href: links.substack },
];

export const speakingTopics = [
  ["Storytelling", "Finding the human thread in an idea, experience, or brand."],
  ["Content Strategy", "Giving communication a clear audience, purpose, and direction."],
  ["Personal Branding & Visibility", "Making your voice and the value of your work easier to recognise."],
  ["Writing & Communication", "Turning what you mean into words people understand."],
  ["Community Building", "Creating a sense of belonging through thoughtful communication."],
  ["Digital Opportunities for Young People", "Exploring how writing, creativity, and community can open doors."],
];

export const enquiryServices = [
  ...services.map(({ id, title }) => ({ id, title })),
  { id: "ongoing-support", title: "Explore ongoing support" },
  { id: "brand-communication", title: "Brand Communication" },
  { id: "editing", title: "Proofreading & Editing — scope enquiry" },
  { id: "session", title: "1:1 Session" },
  { id: "mentorship", title: "Mentorship" },
  { id: "speaking", title: "Speaking invitation" },
  { id: "other", title: "Something else" },
];

export function enquiryHref(service: string, session?: string) {
  const query = new URLSearchParams({ service });
  if (session) query.set("session", session);
  return `/work-with-me?${query.toString()}#enquiry`;
}
