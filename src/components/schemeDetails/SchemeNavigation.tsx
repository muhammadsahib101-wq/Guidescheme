"use client";

import { useRouter } from "next/navigation";

export default function SchemeNavigation({
	activeSection,
	scrollToSection,
}: {
	activeSection: string | null;
	scrollToSection: (sectionId: string) => void;
}) {
	const router = useRouter();

	const sections = [
		{ id: "about", label: "About Scheme" },
		{ id: "eligibility", label: "Eligibility Criteria" },
		{ id: "application", label: "Application Process" },
	];

	return (
		<div className="container px-3 mx-auto flex flex-wrap justify-center gap-3 mb-6">
			{sections.map(({ id, label }) => (
				<button
					key={id}
					onClick={() => scrollToSection(id)}
					className={`min-w-[160px] px-4 py-2 rounded-full font-medium text-base font-figtree transition-all duration-200 
						${
							activeSection === id
								? "bg-yellow-500 shadow-md"
								: "bg-darkyellow hover:bg-yellow-400"
						}
					`}
				>
					{label}
				</button>
			))}

			{/* Discussion Forum Button */}
			<button
				onClick={() => router.push("/discussion")}
				className="min-w-[160px] px-4 py-2 rounded-full font-medium text-base font-figtree transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white shadow-md"
			>
				Discussion Forum
			</button>
		</div>
	);
}
