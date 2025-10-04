import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import CategoriesGrid from "@/components/CategoriesGrid";
import Head from "next/head";
import Script from "next/script";
import FeaturedSchemes from "@/components/FeaturedSchemes";

export default function Home() {
	return (
		<>
			<Head>
				<title>
			Govt Schemes India | Discover 1,000+ Government Welfare Schemes
				</title>
				<meta
					name="description"
					content="Find and compare over 1,000+ government welfare schemes in India. Get eligibility, benefits, and application steps for agriculture, education, business, health, and more."
				/>
				<meta
					name="keywords"
					content="government schemes, India, welfare, eligibility, benefits, application, agriculture, education, business, health, housing"
				/>
				<meta name="robots" content="index, follow" />
				<link rel="icon" href="/fav.ico" />
				<meta
					property="og:title"
					content="Govt Schemes India | Discover 1,000+ Government Welfare Schemes"
				/>
				<meta
					property="og:description"
					content="Find and compare over 1,000+ government welfare schemes in India. Get eligibility, benefits, and application steps for agriculture, education, business, health, and more."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.govtschemesindia.com/" />
				<meta property="og:image" content="/about-img.png" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Govt Schemes India | Discover 1,000+ Government Welfare Schemes"
				/>
				<meta
					name="twitter:description"
					content="Find and compare over 1,000+ government welfare schemes in India. Get eligibility, benefits, and application steps for agriculture, education, business, health, and more."
				/>
				<meta name="twitter:image" content="/about-img.png" />
				<link rel="canonical" href="https://www.govtschemesindia.com/" />
			</Head>

			{/* Structured Data for Website */}
			<Script id="website-ld-json" type="application/ld+json">
				{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Govt Schemes India",
            "url": "https://www.govtschemesindia.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.govtschemesindia.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}
			</Script>

			<main id="main-content" tabIndex={-1} aria-label="Homepage main content">
				<Hero />
				<FeaturedSchemes />
				<HowItWorks className="" />
				<Stats />
				<CategoriesGrid />
			</main>
		</>
	);
}
