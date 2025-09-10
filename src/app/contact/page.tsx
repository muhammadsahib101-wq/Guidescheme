import type { Metadata } from "next";
import ContactPageClient from "./contactForm";

export const metadata: Metadata = {
  title: "Contact Us | GovtSchemeGuide",
  description:
    "Have questions about central/state government schemes? Contact GovtSchemeGuide for support, feedback, and partnership queries.",
  alternates: {
    canonical: "https://www.govtschemeguide.com/contact",
  },
  openGraph: {
    title: "Contact GovtSchemeGuide",
    description:
      "Reach out for scheme information, eligibility queries, feedback, or support.",
    url: "https://www.govtschemeguide.com/contact",
    siteName: "GovtSchemeGuide",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://www.govtschemeguide.com/logo.png",
        width: 600,
        height: 400,
        alt: "GovtSchemeGuide Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact GovtSchemeGuide",
    description:
      "We’re here to help with government schemes and applications.",
    images: ["https://www.govtschemeguide.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/fav.png",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GovtSchemeGuide",
  url: "https://www.govtschemeguide.com",
  logo: "https://www.govtschemeguide.com/logo.png",
  sameAs: [
    "https://facebook.com/yourpage",
    "https://instagram.com/yourpage",
    "https://youtube.com/@yourchannel",
    "https://twitter.com/yourhandle",
    "https://t.me/yourtelegram"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "care@govtschemeguide.com",
      telephone: "+91 8273040400",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["en", "hi"]
    }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "97, Van Vihar, Mehuwala",
    addressLocality: "Dehradun",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
    postalCode: "248171"
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.govtschemeguide.com/contact"
  }
};

export default function Page() {
  return (
    <>
      {/* JSON-LD (no client JS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <main id="main-content">
        <h1 className="sr-only">Contact GovtSchemeGuide</h1>
        <ContactPageClient />
      </main>
    </>
  );
}
