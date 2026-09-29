import { enquiryServices, sessions } from "./site-content";

export type Enquiry = {
  name: string;
  email: string;
  organisation: string;
  service: string;
  session: string;
  description: string;
  startDate: string;
  endDate: string;
  budgetAmount: string;
  budgetCurrency: string;
  eventName: string;
  location: string;
  audience: string;
  topic: string;
  format: string;
  timeline?: string;
  budget?: string;
  eventDate?: string;
  consent: boolean;
  website: string;
};

const limits: Record<
  Exclude<keyof Enquiry, "consent" | "timeline" | "budget" | "eventDate">,
  number
> = {
  name: 120,
  email: 254,
  organisation: 200,
  service: 80,
  session: 80,
  description: 6000,
  startDate: 10,
  endDate: 10,
  budgetAmount: 16,
  budgetCurrency: 3,
  eventName: 200,
  location: 200,
  audience: 500,
  topic: 300,
  format: 100,
  website: 200,
};

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export function validateEnquiry(input: unknown): {
  data?: Enquiry;
  error?: string;
} {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Please check your enquiry and try again." };
  const values = input as Record<string, unknown>;
  const data = { consent: values.consent === true } as Enquiry;
  for (const [key, max] of Object.entries(limits)) {
    const value = values[key] ?? "";
    if (typeof value !== "string" || value.length > max)
      return { error: `Please check the ${key} field.` };
    data[key as keyof typeof limits] = value.trim();
  }
  if (data.website) return { error: "This enquiry could not be accepted." };
  if (!data.name || !data.description)
    return { error: "Please add your name and a brief description." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { error: "Please enter a valid email address." };
  if (!enquiryServices.some((service) => service.id === data.service))
    return { error: "Please choose the support you need." };
  if (
    data.service === "session" &&
    data.session &&
    !sessions.some((session) => session.id === data.session)
  )
    return {
      error: "Please select a listed session, or choose help deciding.",
    };
  if (!data.consent)
    return {
      error:
        "Please confirm that your details can be used to respond to this enquiry.",
    };
  if (data.startDate && !isValidDate(data.startDate))
    return { error: "Please choose a valid start date." };
  if (data.endDate && !isValidDate(data.endDate))
    return { error: "Please choose a valid end date." };
  if (data.startDate && data.endDate && data.endDate < data.startDate)
    return { error: "The end date must be on or after the start date." };
  if (
    data.budgetAmount &&
    !/^(?:0|[1-9]\d{0,11})(?:\.\d{1,2})?$/.test(data.budgetAmount)
  )
    return { error: "Please enter a valid budget amount." };
  if (
    data.budgetAmount &&
    data.budgetCurrency !== "NGN" &&
    data.budgetCurrency !== "USD"
  )
    return { error: "Please choose Naira or US dollars for the budget." };
  if (!data.budgetAmount) data.budgetCurrency = "";
  if (
    data.service === "speaking" &&
    (!data.eventName ||
      !data.location ||
      !data.audience ||
      !data.topic ||
      !data.format)
  )
    return {
      error:
        "Please complete the event name, location, audience, topic, and format.",
    };
  if (data.service !== "session") data.session = "";
  if (data.service !== "speaking")
    for (const field of [
      "eventName",
      "location",
      "audience",
      "topic",
      "format",
    ] as const)
      data[field] = "";
  return { data };
}

export function enquiryText(data: Enquiry) {
  const service =
    enquiryServices.find((item) => item.id === data.service)?.title ??
    data.service;
  const session = sessions.find((item) => item.id === data.session)?.title;
  const timeline = [
    data.startDate && `Start date: ${data.startDate}`,
    data.endDate && `End date: ${data.endDate}`,
  ].filter(Boolean);
  const budget =
    data.budgetAmount && data.budgetCurrency
      ? `Budget: ${data.budgetCurrency} ${data.budgetAmount}`
      : data.budget
        ? `Budget: ${data.budget}`
        : "";
  return [
    "WEBSITE ENQUIRY — COMMISSIONER OF STORIES",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.organisation && `Brand / organisation: ${data.organisation}`,
    `Support: ${service}`,
    session && `Session: ${session}`,
    ...timeline,
    !timeline.length && data.timeline && `Timeline: ${data.timeline}`,
    budget,
    data.eventName && `Event: ${data.eventName}`,
    data.eventDate && `Proposed date: ${data.eventDate}`,
    data.location && `Location / platform: ${data.location}`,
    data.audience && `Audience: ${data.audience}`,
    data.topic && `Topic: ${data.topic}`,
    data.format && `Format: ${data.format}`,
    "",
    "Brief",
    data.description,
  ]
    .filter(Boolean)
    .join("\n");
}
