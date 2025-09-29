// app/layout.js
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Footer } from "@/components/Footer";

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
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
