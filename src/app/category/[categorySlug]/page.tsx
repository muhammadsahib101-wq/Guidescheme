import SchemeCard from "@/components/card/SchemeCard";
import RecentBlogSidebar from "@/components/card/RecentBlogSidebar";
import { getAllSchemes, ApiScheme } from "@/services/allService";
import BlogImage from "../../assets/blog1.jpg";
import { Metadata } from "next";

const SCHEMES_PER_PAGE = 6;

// Define the type for route params
type CategoryPageParams = {
  params: Promise<{ categorySlug: string }>; // params is a Promise
};

// -----------------
export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const { categorySlug } = await params; // Await the params to get categorySlug
  const response = await getAllSchemes(undefined, undefined, SCHEMES_PER_PAGE, 0, undefined, undefined, categorySlug);
  const schemes: ApiScheme[] = response?.data || [];
  const categoryName =
    schemes.length > 0 && schemes[0].category?.name
      ? schemes[0].category.name
      : categorySlug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

  return {
    title: `${categoryName} Schemes | Government Welfare Programs 2025`,
    description: `Discover government schemes for ${categoryName}, including benefits, eligibility criteria, and application processes.`,
    keywords: `government schemes, ${categoryName}, welfare programs, benefits, eligibility`,
    authors: [{ name: "Govt Scheme Guide" }],
    robots: "index, follow",
    openGraph: {
      title: `${categoryName} Schemes | Government Welfare Programs 2025`,
      description: `Explore government schemes for ${categoryName}.`,
      type: "website",
      images: ["/logo.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Schemes | Government Welfare Programs 2025`,
      description: `Discover government schemes for ${categoryName}.`,
      images: ["/logo.jpg"],
    },
    alternates: {
      canonical: `https://govtschemeguide.com/category/${categorySlug}`,
    },
  };
}

export default async function CategorySchemesPage({ params }: CategoryPageParams) {
  const { categorySlug } = await params; // Await the params to get categorySlug

  // Fetch schemes for the category
  const response = await getAllSchemes(
    undefined,
    undefined,
    SCHEMES_PER_PAGE,
    0,
    undefined,
    undefined,
    categorySlug
  );

  const schemes: ApiScheme[] = response?.data || [];
  const totalSchemes = response?.total || 0;
  const categoryName =
    schemes.length > 0 && schemes[0].category?.name
      ? schemes[0].category.name
      : categorySlug
          .split("-")
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Schemes | Government Welfare Programs 2025`,
    description: `Explore government schemes and welfare programs for ${categoryName}.`,
    url: `https://govtschemeguide.com/category/${categorySlug}`,
    publisher: {
      "@type": "Organization",
      name: "Govt Scheme Guide",
      logo: {
        "@type": "ImageObject",
        url: "https://govtschemeguide.com/logo.jpg",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: schemes.map((scheme, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://govtschemeguide.com/schemes/${scheme.slug}`,
        name: scheme.schemeTitle,
        ...(scheme.about && { description: scheme.about }),
        ...(scheme.cardImage?.url && { image: scheme.cardImage.url }),
      })),
    },
  };

  return (
    <>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-white mt-14" aria-labelledby="schemes-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <main className="lg:w-2/3">
              <h1
                id="schemes-heading"
                className="text-3xl font-bold mb-6 text-gray-900"
              >
                {categoryName} Schemes
              </h1>

              {schemes.length === 0 ? (
                <section className="px-5 py-12 max-w-7xl mx-auto bg-white text-center rounded-lg shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-yellow-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Schemes Available
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn&apos;t find any schemes for {categoryName}.
                    <span className="block mt-1">I&apos;ll be adding some soon!</span>
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-medium"
                  >
                    Refresh
                  </button>
                </section>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      Showing 1-{Math.min(SCHEMES_PER_PAGE, totalSchemes)} of {totalSchemes} schemes
                    </p>
                  </div>
                  <div className="space-y-6">
                    {schemes.map((scheme) => (
                      <SchemeCard
                        key={scheme._id}
                        imageUrl={scheme.cardImage?.url || BlogImage}
                        category={scheme.category?.name || "General"}
                        title={scheme.schemeTitle}
                        description={scheme.about}
                        author={scheme.author.name}
                        date={new Date(scheme.publishedOn).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        slug={scheme.slug}
                      />
                    ))}
                  </div>
                </>
              )}
            </main>

            {/* Sidebar */}
            <aside className="lg:w-1/3 lg:pl-8">
              <div className="sticky top-6">
                <RecentBlogSidebar recentPosts={schemes} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}