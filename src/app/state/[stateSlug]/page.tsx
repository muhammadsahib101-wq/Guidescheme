import SchemeCard from "@/components/card/SchemeCard";
import RecentBlogSidebar from "@/components/card/RecentBlogSidebar";
import { getAllSchemes, ApiScheme } from "@/services/allService";
import BlogImage from "../../assets/blog1.jpg";
import { Metadata } from "next";

const SCHEMES_PER_PAGE = 6;

// Define the type for route params
type StatePageParams = {
  params: Promise<{ stateSlug: string }>; // Updated to reflect Promise
};

// -----------------
export async function generateMetadata({ params }: StatePageParams): Promise<Metadata> {
  const { stateSlug } = await params; // Await the params to get the stateSlug
  const stateName = stateSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `Government Schemes in ${stateName} | Welfare Programs 2025`,
    description: `Explore government schemes and welfare programs in ${stateName}, including benefits, eligibility criteria, and application processes.`,
    alternates: {
      canonical: `https://govtschemeguide.com/state/${stateSlug}`,
    },
  };
}

export default async function StatePage({ params }: StatePageParams) {
  const { stateSlug } = await params; // Await the params to get the stateSlug

  // Fetch schemes for the state
  const response = await getAllSchemes(
    stateSlug,
    undefined,
    SCHEMES_PER_PAGE,
    0
  );

  const schemes: ApiScheme[] = response?.data || [];
  const stateName =
    schemes.length > 0 && schemes[0].state?.length
      ? schemes[0].state[0].name
      : stateSlug
          .split("-")
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Government Schemes in ${stateName} | Welfare Programs 2025`,
    description: `Explore government schemes and welfare programs in ${stateName}.`,
    url: `https://govtschemeguide.com/state/${stateSlug}`,
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
                Government Schemes in {stateName}
              </h1>

              {schemes.length === 0 ? (
                <p className="text-gray-600 mb-6">
                  No schemes available for {stateName} at the moment.
                </p>
              ) : (
                <div className="space-y-6">
                  {schemes.map((scheme) => (
                    <SchemeCard
                      key={scheme._id}
                      imageUrl={scheme.cardImage?.url || BlogImage}
                      category={scheme.category?.name || "General"}
                      title={scheme.schemeTitle}
                      description={scheme.about}
                      author={scheme.author.name}
                      date={new Date(scheme.publishedOn).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                      slug={scheme.slug}
                    />
                  ))}
                </div>
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