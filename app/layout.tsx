import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/src/components/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokédex - Discover All Pokémon",
  description: "Explore the complete Pokédex with detailed information about all Pokémon. Browse through stats, abilities, types, and more!",
  keywords: ["Pokemon", "Pokédex", "Pokedex", "Pokemon List", "Pokemon Stats", "Pokemon Database"],
  authors: [{ name: "Pokédex Team" }],
  openGraph: {
    title: "Pokédex - Discover All Pokémon",
    description: "Explore the complete Pokédex with detailed information about all Pokémon.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
