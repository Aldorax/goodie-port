import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import Header from "./header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: { default: "Commissioner of Stories | Goodness Adeniyi Orishe", template: "%s | Commissioner of Stories" },
  description:
    "Meet Goodness Adeniyi Orishe, Commissioner of Stories. Content and email strategy, storytelling, community building, and writing mentorship — words with purpose, stories with heart.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><Header /><main id="main">{children}</main><Footer /></body>
    </html>
  );
}
