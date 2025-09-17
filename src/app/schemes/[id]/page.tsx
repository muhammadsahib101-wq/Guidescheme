"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import {
	getSchemeBySlug,
	getAllSchemes,
	ApiScheme,
} from "@/services/allService";
import { SchemeDetailsPageSkeleton } from "@/components/skeletonLoader/SchemeDetailsPageSkeleton";
import SchemeMeta from "@/components/schemeDetails/SchemeMeta";
import SchemeHeader from "@/components/schemeDetails/SchemeHeader";
import SchemeNavigation from "@/components/schemeDetails/SchemeNavigation";
import SchemeSection from "@/components/schemeDetails/SchemeSection";
import SchemeSidebar from "@/components/schemeDetails/SchemeSidebar";
import SchemeError from "@/components/schemeDetails/SchemeError";
import { formatDate } from "@/app/lib/utils";

const DEFAULT_ERROR_MESSAGE =
	"Failed to fetch scheme details. Please try again.";
const NOT_FOUND_MESSAGE =
	"The scheme you're looking for doesn't exist or has been removed.";
const FEATURED_SCHEMES_LIMIT = 10;

export default function SchemeDetailsPage() {
	const params = useParams();
	const schemeId = params.id as string;

	const [scheme, setScheme] = useState<ApiScheme | null>(null);
	const [featuredSchemes, setFeaturedSchemes] = useState<ApiScheme[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeSection, setActiveSection] = useState<string | null>(null);

	const fetchSchemeDetails = useCallback(
		async (signal: AbortSignal) => {
			if (!schemeId) return;

			try {
				setLoading(true);
				setError(null);
				setScheme(null);

				const [schemeData, allSchemesData] = await Promise.all([
					getSchemeBySlug(schemeId, signal),
					getAllSchemes(),
				]);

				if (signal.aborted) return;

				if (!schemeData?.success || !schemeData.data) {
					setError(NOT_FOUND_MESSAGE);
					return;
				}

				setScheme(schemeData.data);

				if (allSchemesData?.success && allSchemesData.data) {
					setFeaturedSchemes(
						allSchemesData.data
							.filter((s) => s.isFeatured && s._id !== schemeId)
							.slice(0, FEATURED_SCHEMES_LIMIT)
					);
				}
			} catch (err) {
				if (signal.aborted) return;
				console.error("Error fetching scheme details:", err);
				setError(DEFAULT_ERROR_MESSAGE);
			} finally {
				if (!signal.aborted) {
					setLoading(false);
				}
			}
		},
		[schemeId]
	);

	useEffect(() => {
		const controller = new AbortController();
		fetchSchemeDetails(controller.signal);
		return () => controller.abort();
	}, [fetchSchemeDetails]);

	const scrollToSection = useCallback((sectionId: string) => {
		setActiveSection(sectionId);
		const element = document.getElementById(sectionId);
		element?.scrollIntoView({ behavior: "smooth", block: "start" });
	}, []);

	if (loading && !scheme) {
		return <SchemeDetailsPageSkeleton />;
	}

	if (error || !scheme) {
		return <SchemeError error={error || DEFAULT_ERROR_MESSAGE} />;
	}

	return (
		<>
			<SchemeMeta scheme={scheme} />
			<main className="min-h-screen">
				<SchemeHeader scheme={scheme} formatDate={formatDate} />
				<SchemeNavigation scheme={scheme} />

				{/* Grid Layout */}
				<div className="container mx-auto px-4 pb-8 md:grid md:grid-cols-12 md:gap-8">
					{/* Main Content */}
					<div className="md:col-span-8 lg:col-span-9">
						<SchemeSection scheme={scheme} formatDate={formatDate} />
					</div>

					{/* Sidebar */}
					<div className="mt-6 md:mt-0 md:col-span-4 lg:col-span-3">
						<SchemeSidebar featuredSchemes={featuredSchemes} />
					</div>
				</div>
			</main>
		</>
	);
}
