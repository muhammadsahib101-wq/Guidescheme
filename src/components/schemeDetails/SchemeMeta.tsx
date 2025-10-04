// import Head from "next/head";
import { ApiScheme } from "@/services/allService";

export default function SchemeMeta({ scheme }: { scheme: ApiScheme }) {
const categorySlug = scheme?.slug || "general";
	return (
		// eslint-disable-next-line @next/next/no-head-element
		<head>
			<title>{scheme.schemeTitle} | Government Scheme Details</title>
			<meta name="description" content={scheme.about} />
			<meta
				name="keywords"
				content={`${scheme.schemeTitle}, government scheme, ${
					scheme.category?.name || ""
				}, benefits, eligibility`}
			/>
			<meta name="author" content={scheme.author.name} />
			<meta name="robots" content="index, follow" />
			<meta
				property="og:title"
				content={`${scheme.schemeTitle} | Government Scheme Details`}
			/>
			<meta property="og:description" content={scheme.about} />
			<meta property="og:type" content="article" />
			<meta
				property="og:image"
				content={scheme.bannerImage?.url || scheme.cardImage?.url}
			/>
			<meta name="twitter:card" content="summary_large_image" />
			<meta
				name="twitter:title"
				content={`${scheme.schemeTitle} | Government Scheme Details`}
			/>
			<link
				rel="canonical"
				href={`https://govtschemeguide.com/category/${categorySlug}`}
			/>
			<meta name="twitter:description" content={scheme.about} />
			<meta
				name="twitter:image"
				content={scheme.bannerImage?.url || scheme.cardImage?.url}
			/>
		</head>
	);
}
