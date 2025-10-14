// app/layout.js
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "LaTeXWriter — Fast Collaborative LaTeX Editor",
  description:
    "LaTeX Writer — a fast, collaborative LaTeX editor. Real-time compilation, templates, and PDF export. Start writing LaTeX instantly.",
  icons: {
    icon: "/logo.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DWCLLPY4G0"
        ></Script>
        <Script id="google-analytics">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DWCLLPY4G0');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2823773486701492"
          crossorigin="anonymous"
        ></Script>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
