import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Government Scheme Guide | Trusted Platform for Govt Scheme Information",
  description:
    "Govtschemeguide.com is a simple and trusted website to find the latest government schemes in India. The website covers schemes for students, farmers, women, workers, business owners, and families in every state.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/fav.png", // ✅ your favicon
    shortcut: "/fav.png",
    apple: "/fav.png", // ✅ iOS/Apple touch icon
  },
  openGraph: {
    title: "Government Scheme Guide | Trusted Platform for Govt Scheme Information",
    description:
      "Govtschemeguide.com is a simple and trusted website to find the latest government schemes in India. The website covers schemes for students, farmers, women, workers, business owners, and families in every state.",
    url: "https://govtschemeguide.com",
    type: "website",
    images: ["/about-img.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Scheme Guide | Trusted Platform for Govt Scheme Information",
    description:
      "Govtschemeguide.com is a simple and trusted website to find the latest government schemes in India. The website covers schemes for students, farmers, women, workers, business owners, and families in every state.",
    images: ["/about-img.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
{/* <div id="google_translate_element" style={{ display: "none" }}></div> */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
