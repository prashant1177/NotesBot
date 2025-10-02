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
    <html lang="en" data-google-analytics-opt-out="">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DWCLLPY4G0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DWCLLPY4G0', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Google AdSense Auto Ads */}
        <Script
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2823773486701492"
          crossorigin="anonymous"
        />
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
