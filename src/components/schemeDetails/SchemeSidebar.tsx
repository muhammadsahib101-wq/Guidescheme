import { ApiScheme } from "@/services/allService";
import Link from "next/link";

export default function SchemeSidebar({
	featuredSchemes,
}: {
	featuredSchemes: ApiScheme[];
}) {
	return (
		<aside className="sticky top-24 rounded-xl shadow-lg border border-gray-200 bg-white overflow-hidden">
			<h2 className="text-lg font-semibold py-3 px-4 bg-darkyellow text-gray-800">
				Featured Schemes
			</h2>
			{featuredSchemes.length > 0 ? (
				<div className="divide-y divide-gray-200">
					{featuredSchemes.map((featuredScheme) => (
						<div
							key={featuredScheme._id}
							className="p-4 flex items-start gap-3 hover:bg-gray-50 transition"
						>
							<div className="text-yellow-500 flex-shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div>
								<Link
									href={`/schemes/${featuredScheme.slug}`}
									className="block text-sm font-medium text-gray-900 leading-snug hover:text-blue-600"
								>
									{featuredScheme.schemeTitle}
								</Link>
								<p className="text-xs text-gray-600 mt-1">
									Category:{" "}
									<span className="font-medium">
										{featuredScheme.category?.name || "General"}
									</span>
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="p-4 text-center text-sm text-gray-500">
					No featured schemes available
				</div>
			)}
		</aside>
	);
}
