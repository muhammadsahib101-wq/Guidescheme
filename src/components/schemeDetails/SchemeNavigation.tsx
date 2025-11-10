"use client";

import { ApiScheme } from "@/services/allService";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";

export default function SchemeNavigation({ scheme }: { scheme: ApiScheme }) {
	const router = useRouter();

	const sections = useMemo(() => {
		const createdSections = [];
		const linkKeys: (keyof ApiScheme)[] = ["link1", "link2", "link3"];

		for (const key of linkKeys) {
			const linkData = scheme[key] as { name?: string; url?: string };

			if (linkData && linkData.name && linkData.url) {
				createdSections.push({ id: linkData.name, url: linkData.url });
			}
		}
		return createdSections;
	}, [scheme]);

	return (
		<div className="container px-3 mx-auto flex flex-wrap justify-center gap-3 mb-6">
			{sections.map(({ id, url }) => (
				<Link
					target="_blank"
					href={url}
					key={url}
					className={`min-w-[160px] text-center px-4 py-2 rounded-full font-medium text-base font-figtree transition-all duration-200 bg-darkyellow hover:bg-yellow-400`}
				>
					{id}
				</Link>
			))}

			{/* Discussion Forum Button */}
			<button
				onClick={() => router.push(`/discussion/${scheme._id}`)}
				className="min-w-[160px] px-4 py-2 rounded-full font-medium text-base font-figtree transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white shadow-md"
			>
				Discussion Forum
			</button>
		</div>
	);
}
