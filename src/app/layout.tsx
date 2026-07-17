import type { Metadata } from "next";
import { Quicksand, Nunito, VT323 } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LokkitaEdx",
  description:
    "Portfolio de edicao de video profissional. Edicao para YouTube, Shorts, Reels e TikTok. Conteudos de tecnologia, programacao, games e videos educativos.",
  keywords: [
    "edicao de video",
    "editor de video",
    "youtube",
    "shorts",
    "reels",
    "tiktok",
    "lokitta edx",
    "portfolio",
  ],
  authors: [{ name: "LokkitaEdx" }],
  openGraph: {
    title: "LokkitaEdx",
    description:
      "Portfolio de edicao de video profissional para criadores de conteudo.",
    type: "website",
    locale: "pt_BR",
  },
};

import { ThemeProvider } from "@/providers/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${quicksand.variable} ${nunito.variable} ${vt323.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--paper)] text-[var(--charcoal)] font-sans overflow-x-hidden transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
