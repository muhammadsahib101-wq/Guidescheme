import Head from "next/head";
import Script from "next/script";
import HowItWorks from "@/components/HowItWorks";

// Environment variable for base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://govtschemeguide.com";

export default function AboutPage() {
  return (
    <>
      <head>
        <title>
          About Govt Schemes India | Empowering Citizens with Welfare Information
        </title>
        <meta
          name="description"
          content="Learn about Govt Schemes India, a platform dedicated to making over 1,000 government welfare schemes accessible to all Indians, from urban professionals to rural farmers."
        />
        <meta
          name="keywords"
          content="government schemes, welfare programs, India, accessible benefits, EWS, backward communities, AR Online Services"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="About Govt Schemes India" />
        <meta
          property="og:description"
          content="Discover how Govt Schemes India empowers citizens by simplifying access to government welfare schemes."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/about`} />
        <meta property="og:image" content={`${BASE_URL}/about-img.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Govt Schemes India" />
        <meta
          name="twitter:description"
          content="Learn about our mission to make government welfare schemes accessible to every Indian."
        />
        <meta name="twitter:image" content={`${BASE_URL}/about-img.png`} />
        <link rel="canonical" href={`${BASE_URL}/about`} />
        <link
          rel="preload"
          href="/fonts/raleway.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style>{`
          @font-face {
            font-family: 'Raleway';
            src: url('/fonts/raleway.woff2') format('woff2');
            font-display: swap;
          }
          a:focus, button:focus {
            outline: 2px solid #2563EB;
            outline-offset: 2px;
          }
        `}</style>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' https://*.govtschemesindia.com; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';"
        />
      </head>

      {/* Structured Data for Organization and WebPage */}
      <Script id="organization-ld-json" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Govt Schemes India",
            "url": "${BASE_URL}",
            "logo": "${BASE_URL}/about-img.png",
            "sameAs": [
              "https://twitter.com/govtschemesindia",
              "https://facebook.com/govtschemesindia",
              "https://linkedin.com/company/govtschemesindia"
            ]
          }
        `}
      </Script>
      <Script id="webpage-ld-json" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About Govt Schemes India",
            "url": "${BASE_URL}/about",
            "description": "Learn about Govt Schemes India, a platform dedicated to making government welfare schemes accessible to all Indians.",
            "publisher": {
              "@type": "Organization",
              "name": "Govt Schemes India",
              "logo": {
                "@type": "ImageObject",
                "url": "${BASE_URL}/about-img.png"
              }
            }
          }
        `}
      </Script>

      <header
        className="relative w-full py-20 bg-gradient-to-br from-[#FFFFFF] via-[#BFF5D4] to-[#FFFFFF]"
        role="banner"
        aria-labelledby="header-heading"
      >
        <div className="flex items-center justify-center h-full">
          <h1
            id="header-heading"
            className="text-4xl md:text-5xl font-bold font-raleway text-black mb-6"
          >
            About Us
          </h1>
        </div>
      </header>

      <HowItWorks className="mt-8" />

      <section
        className="px-4 py-20 bg-gradient-to-b from-gray-100 to-gray-200/20"
        aria-labelledby="about-heading"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="px-3 py-5">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2
                  id="about-heading"
                  className="text-4xl md:text-5xl font-bold font-raleway text-gray-900 mb-6"
                >
                  Who We Are
                </h2>
              </div>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                GovtSchemeGuide.com is the online platform providing accurate and
                verified information about various Central and State government
                schemes. We provide you with detailed information as soon as a
                scheme is released, along with easy guidelines to help you apply
                if you fulfill the eligibility criteria.
              </p>
            </div>

          
            {/* What We Do Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What Do We Do?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Real-Time Updates:</strong> With us, you get updates as
                  soon as the scheme is announced. We help you get up-to-date
                  information regarding various welfare schemes, along with any
                  major updates made to the existing schemes.
                </li>
                <li>
                  <strong>Clear Guidance:</strong> We provide step-by-step
                  guidelines to our users to easily apply for various schemes that
                  they qualify for. We have a dedicated team to provide verified
                  information.
                </li>
                <li>
                  <strong>Detailed Information:</strong> Not only do we provide
                  information as quickly as possible, but we also provide every
                  major plus minor detail in simple language.
                </li>
                <li>
                  <strong>Categorised Details:</strong> We provide multiple
                  categories of schemes on a single platform. With our
                  easy-to-use website, you can look through the scheme of your
                  choice easily.
                </li>
                <li>
                  <strong>Credible Sources:</strong> With our dedicated team of
                  Writers and Editors, every piece of information present on our
                  website is taken from credible sources and verified before being
                  published.
                </li>
              </ul>
            </div>

            {/* Vision Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our vision is to provide factual information to help users find
                government welfare schemes easily. Our platform also:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
                <li>
                  Helps businesses make informed financial decisions after viewing
                  the welfare schemes provided for them by the government.
                </li>
                <li>
                  Promotes higher education by helping students look through the
                  skill training programs and scholarships provided by the
                  government.
                </li>
                <li>
                  Supports small businesses by helping them learn about subsidies
                  and funds.
                </li>
                <li>
                  Promotes improved healthcare among marginalized societies by
                  helping them learn about the healthcare schemes and funds
                  released by the government.
                </li>
              </ul>
            </div>

            {/* Why Choose Us Section */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Choose GovtSchemeGuide.com?
              </h2>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li>
                  ✅ Verified and reliable information from credible sources.
                </li>
                <li>
                  ✅ Simple and easy-to-use user interface, available for all
                  devices.
                </li>
                <li>✅ No opinion-heavy journalism.</li>
                <li>
                  ✅ Simple and direct language that is easy to understand.
                </li>
              </ul>
            </div>

            {/* Problems & Solutions Section */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How We Solve Common Problems
              </h2>
              <p className="text-gray-700 mb-4">
                While the government releases various welfare schemes for the
                common public, the common public often faces various difficulties
                while navigating the government portals. Refer to some of these
                common difficulties below and how GovtSchemeGuide.com solves them
                for you:
              </p>

              <div className="space-y-10">
                {[
                  {
                    title: "Complex Navigation & Language",
                    problem:
                      "Portals released by the government often use difficult language and have a very confusing UI, which is not for the general public.",
                    solution: [
                      "We break down complex procedures into simple points.",
                      "We use simple, easy-to-understand language wherever possible.",
                      "We provide clear eligibility criteria and FAQs for better understanding.",
                      "EEAT Compliance: All data is verified by our editors from official government portals.",
                    ],
                  },
                  {
                    title: "Outdated Information",
                    problem:
                      "One of the major problems of government websites is that they are often outdated.",
                    solution: [
                      "We post regular updates credited from official sources, press releases, and newspapers.",
                      "We send alerts about deadlines and new scheme launches.",
                      "EEAT Compliance: We always cite official sources.",
                    ],
                  },
                  {
                    title: "Difficulty in Understanding Eligibility",
                    problem:
                      "Eligibility criteria are often written in jargon by the government.",
                    solution: [
                      "We simplify eligibility into bullet points with examples.",
                      "We avoid using complex words or jargon.",
                      "EEAT Compliance: Eligibility is taken from official government documents and re-verified if changes occur.",
                    ],
                  },
                  {
                    title: "Lengthy & Tedious Application Process",
                    problem:
                      "Government portals often provide a long and tedious application process.",
                    solution: [
                      "We provide step-by-step tutorials with screenshots and videos (if possible).",
                      "We list required documents beforehand so users can prepare.",
                      "We provide error-fixing guidance for common mistakes.",
                      "EEAT Compliance: We follow the process ourselves to ensure 100% accuracy.",
                    ],
                  },
                  {
                    title: "No Clear Guidance",
                    problem:
                      "Government portals are unable to answer individual queries.",
                    solution: [
                      "We offer a scheme comparison tool to evaluate multiple schemes easily.",
                      "We provide an expert Q&A section with answers to the most common queries.",
                    ],
                  },
                  {
                    title: "Scams & Fake Websites",
                    problem:
                      "Hundreds of fake websites mislead citizens as official portals.",
                    solution: [
                      "We provide verified direct links to official portals (e.g., NSP scholarship links).",
                      "We send scam alerts regularly to keep users safe.",
                      "EEAT Compliance: We disclose our non-government affiliation and prioritize user security over monetization.",
                    ],
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200"
                  >
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      <strong>Problem:</strong> {item.problem}
                    </p>
                    <p className="text-gray-800 font-medium mb-2">
                      ✅ Solution:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      {item.solution.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Section */}
            <div className="mb-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Trust GovtSchemeGuide.com? – EEAT in Action
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-semibold text-green-600">
                    Experience
                  </h3>
                  <p className="text-gray-700 mt-2">
                    We track 500+ schemes and provide information to over 1
                    million users.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-semibold text-green-600">
                    Expertise
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Our team includes individuals from different backgrounds who
                    fact-check all the data published.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-semibold text-green-600">
                    Authoritativeness
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Our information is taken from official government documents
                    and trusted media outlets.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-semibold text-green-600">
                    Trustworthiness
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Everything on our platform is 100% factual with zero paid
                    promotions.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <a
                href={BASE_URL}
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold shadow-md hover:shadow-lg transition"
                aria-label="Explore government schemes"
              >
                🔗 Explore Schemes Now
              </a>
              <p className="mt-4 text-gray-600">
                📧 Got Questions? Contact us at{" "}
                <a
                  href="mailto:support@govtschemeguide.com"
                  className="text-blue-600 underline"
                  aria-label="Email support"
                >
                  support@govtschemeguide.com
                </a>
              </p>
              <p className="mt-6 text-sm text-gray-500">
                *Disclaimer: We are an independent informational resource. Always
                verify details on official websites before applying.*
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}