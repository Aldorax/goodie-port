import { enquiryServices, sessions } from "./site-content";

export type Enquiry = {
  name: string; email: string; organisation: string; service: string; session: string;
  description: string; timeline: string; budget: string; eventName: string;
  eventDate: string; location: string; audience: string; topic: string; format: string;
  consent: boolean; website: string;
};

const limits: Record<Exclude<keyof Enquiry, "consent">, number> = {
  name: 120, email: 254, organisation: 200, service: 80, session: 80,
  description: 6000, timeline: 200, budget: 200, eventName: 200,
  eventDate: 40, location: 200, audience: 500, topic: 300, format: 100, website: 200,
};

export function validateEnquiry(input: unknown): { data?: Enquiry; error?: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { error: "Please check your enquiry and try again." };
  const values = input as Record<string, unknown>;
  const data = { consent: values.consent === true } as Enquiry;
  for (const [key, max] of Object.entries(limits)) {
    const value = values[key] ?? "";
    if (typeof value !== "string" || value.length > max) return { error: `Please check the ${key} field.` };
    data[key as keyof typeof limits] = value.trim();
  }
  if (data.website) return { error: "This enquiry could not be accepted." };
  if (!data.name || !data.description) return { error: "Please add your name and a brief description." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { error: "Please enter a valid email address." };
  if (!enquiryServices.some(service => service.id === data.service)) return { error: "Please choose the support you need." };
  if (data.service === "session" && data.session && !sessions.some(session => session.id === data.session)) return { error: "Please select a listed session, or choose help deciding." };
  if (!data.consent) return { error: "Please confirm that your details can be used to respond to this enquiry." };
  if (data.service === "speaking" && (!data.eventName || !data.timeline || !data.location || !data.audience || !data.topic || !data.format)) return { error: "Please complete the event name, proposed timing, location, audience, topic, and format. You can enter ‘To be confirmed’ if needed." };
  if (data.service !== "session") data.session = "";
  if (data.service !== "speaking") for (const field of ["eventName", "eventDate", "location", "audience", "topic", "format"] as const) data[field] = "";
  return { data };
}

export function enquiryText(data: Enquiry) {
  const service = enquiryServices.find(item => item.id === data.service)?.title ?? data.service;
  const session = sessions.find(item => item.id === data.session)?.title;
  return [
    "WEBSITE ENQUIRY — COMMISSIONER OF STORIES", "",
    `Name: ${data.name}`, `Email: ${data.email}`, data.organisation && `Brand / organisation: ${data.organisation}`,
    `Support: ${service}`, session && `Session: ${session}`,
    data.timeline && `Timeline: ${data.timeline}`, data.budget && `Budget: ${data.budget}`,
    data.eventName && `Event: ${data.eventName}`, data.eventDate && `Proposed date: ${data.eventDate}`,
    data.location && `Location / platform: ${data.location}`, data.audience && `Audience: ${data.audience}`,
    data.topic && `Topic: ${data.topic}`, data.format && `Format: ${data.format}`,
    "", "Brief", data.description,
  ].filter(Boolean).join("\n");
}
