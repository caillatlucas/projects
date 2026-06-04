import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Lucas Caillat — Creative Developer",
  description:
    "Portfolio de Lucas Caillat, développeur créatif freelance. Découvrez mes projets, expérimentations et contributions open source.",
  keywords: [
    "Lucas Caillat",
    "développeur",
    "freelance",
    "informatique",
    "portfolio",
    "creative developer",
  ],
  authors: [{ name: "Lucas Caillat" }],
  openGraph: {
    title: "Lucas Caillat — Creative Developer",
    description:
      "Portfolio de Lucas Caillat, développeur créatif freelance.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
