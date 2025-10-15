"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import SchemeCard from "@/components/card/SchemeCard";
import RecentBlogSidebar from "@/components/card/RecentBlogSidebar";
import { getAllSchemes, searchSchemes, ApiScheme } from "@/services/allService";
import { StateSchemesLoadingSkeleton } from "@/components/skeletonLoader/StateSchemesLoadingSkeleton";
import BlogImage from "../../assets/blog1.jpg";

const SCHEMES_PER_PAGE = 6;

function StateSchemesContent() {
  const params = useParams();
  const stateSlug = params.stateSlug as string;
  const [schemes, setSchemes] = useState<ApiScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalSchemes, setTotalSchemes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [stateName, setStateName] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      setIsSearching(false);
      fetchData();
      return;
    }

    setIsSearching(true);
    setLoading(true);
    setError(null);
    setSchemes([]);

    try {
      const response = await searchSchemes(searchQuery);
      setSchemes(response.data || []);
      setTotalSchemes(response.data?.length || 0);
      setHasMore(false);
    } catch (err) {
      console.error("Error searching schemes:", err);
      setError("Failed to search schemes. Please try again.");
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = useCallback(
    async (initialSkip: number = 0, signal?: AbortSignal) => {
      setLoading(true);
      setError(null);
      setSchemes([]);
      setHasMore(true);
      setTotalSchemes(0);
      setSkip(0);
      setIsSearching(false);
      setSearchQuery("");

      try {
        const response = await getAllSchemes(
          undefined,
          undefined,
          SCHEMES_PER_PAGE,
          initialSkip,
          signal,
          stateSlug
        );

        if (signal?.aborted) return;

        setSchemes(response.data || []);
        setTotalSchemes(response.total || 0);
        setHasMore(
          response.data?.length === SCHEMES_PER_PAGE &&
            SCHEMES_PER_PAGE + initialSkip < (response.total || 0)
        );

        if (
          response.data &&
          response.data.length > 0 &&
          response.data[0].state
        ) {
          const state = response.data[0].state[0];
          setStateName(state?.name);
        } else {
          setStateName(
            stateSlug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          );
        }
      } catch (err) {
        if (!signal?.aborted) {
          console.error("Error fetching schemes:", err);
          setError("Failed to fetch schemes. Please try again.");
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [stateSlug]
  );

useEffect(() => {
  if (stateSlug) {
    document.title = `Government Schemes |  ${stateSlug}`;
  } else {
    document.title = "Government Schemes";
  }
}, [stateSlug]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(0, controller.signal);
    return () => controller.abort();
  }, [stateSlug, fetchData]);

  useEffect(() => {
    if (skip === 0) return;

    const controller = new AbortController();

    const loadMoreData = async () => {
      setLoadingMore(true);
      try {
        const response = await getAllSchemes(
          undefined,
          undefined,
          SCHEMES_PER_PAGE,
          skip,
          controller.signal,
          stateSlug
        );

        if (controller.signal.aborted) return;

        setSchemes((prev) => [...prev, ...(response.data || [])]);
        setHasMore(
          response.data?.length === SCHEMES_PER_PAGE &&
            skip + SCHEMES_PER_PAGE < (response.total || 0)
        );
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Error loading more schemes:", err);
          setError("Failed to load more schemes. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingMore(false);
        }
      }
    };

    if (!isSearching) {
      loadMoreData();
    }
    return () => controller.abort();
  }, [skip, stateSlug, isSearching]);

  const handleLoadMore = () => {
    setSkip((prev) => prev + SCHEMES_PER_PAGE);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPageTitle = () => {
    if (stateName) {
      return `Government Schemes in ${stateName} | Welfare Programs 2025`;
    }
    if (isSearching && searchQuery) {
      return `Search Results for "${searchQuery}" in ${stateName}`;
    }
    return "Government Schemes | Welfare Programs 2025";
  };

  const getPageHeading = () => {
    if (stateName) {
      return `Government Schemes in ${stateName}`;
    }
    if (isSearching && searchQuery) {
      return `Search Results for "${searchQuery}" in ${stateName}`;
    }
    return "Latest Government Schemes and Articles";
  };

  const getShowingText = () => {
    if (loading) return "";
    if (isSearching) {
      return `Showing ${totalSchemes} results for "${searchQuery}"`;
    }
    const showingEnd = Math.min(skip + SCHEMES_PER_PAGE, totalSchemes);
    return `Showing ${1}-${showingEnd} of ${totalSchemes} schemes`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: getPageTitle(),
    description: `Explore government schemes and welfare programs in ${stateName}.`,
    url: `https://www.govtschemeguide.com/state/${stateSlug}`,
    publisher: {
      "@type": "Organization",
      name: "Govt Scheme Guide",
      logo: {
        "@type": "ImageObject",
        url: "https://www.govtschemeguide.com/logo.jpg", // Use full absolute URL
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: schemes.map((scheme, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.govtschemeguide.com/schemes/${scheme.slug}`,
        name: scheme.schemeTitle,
        ...(scheme.about && { description: scheme.about }),
        ...(scheme.cardImage?.url && { image: scheme.cardImage.url }),
      })),
    },
  };

  if (loading && skip === 0) {
    return <StateSchemesLoadingSkeleton />;
  }

  return (
    <>
      <head>
        {/* <title>{getPageTitle()}</title> */}
        <meta
          name="description"
          content={`Discover government schemes in ${stateName}, including benefits, eligibility criteria, and application processes.`}
        />
        <meta
          name="keywords"
          content={`government schemes, ${stateName}, welfare programs, benefits, eligibility`}
        />
        <meta name="author" content="Govt Scheme Guide" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={getPageTitle()} />
        <meta
          property="og:description"
          content={`Explore government schemes in ${stateName}.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta
          name="twitter:description"
          content={`Discover government schemes in ${stateName}.`}
        />
        <meta name="twitter:image" content="/logo.jpg" />
        <link
          rel="canonical"
          href={`https://www.govtschemeguide.com/state/${stateSlug}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>

      <section className="bg-white mt-14" aria-labelledby="schemes-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="lg:w-2/3">
              <h1
                id="schemes-heading"
                className="text-3xl font-bold mb-6 text-gray-900"
              >
                {getPageHeading()}
              </h1>

              <div className="mb-6 flex justify-between items-center">
                {!loading && (
                  <p className="text-sm text-gray-600">{getShowingText()}</p>
                )}
              </div>

              <form onSubmit={handleSearch} className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search schemes and articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-gray-700 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                  aria-label="Search schemes and articles"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label="Submit search"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isSearching && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      fetchData();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </form>

              {error && (
                <div className="py-8 text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!error && schemes.length === 0 && (
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
                    We couldn&apos;t find any schemes for {stateName}.
                    <span className="block mt-1">
                      I&apos;ll be adding some soon!
                    </span>
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-medium"
                  >
                    Refresh
                  </button>
                </section>
              )}

              {!error && schemes.length > 0 && (
                <>
                  <div className="space-y-6">
                    {schemes.map((scheme) => (
                      <SchemeCard
                        key={scheme._id}
                        imageUrl={scheme.cardImage?.url || BlogImage}
                        category={scheme.category?.name || "General"}
                        title={scheme.schemeTitle}
                        description={scheme.about}
                        author={scheme.author.name}
                        date={formatDate(scheme.publishedOn)}
                        slug={scheme.slug}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-8 mb-8 flex justify-center">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium w-full sm:w-auto text-center ${
                          loadingMore ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {loadingMore ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          "Load More Schemes"
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>

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

export default function StateSchemesPage() {
  return (
    <Suspense fallback={<StateSchemesLoadingSkeleton />}>
      <StateSchemesContent />
    </Suspense>
  );
}
