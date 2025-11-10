"use client";

import { Discussion } from "@/services/allService";
import { formatDate } from "@/app/lib/utils";
import Link from "next/link";

interface DiscussionCardProps {
	discussion: Discussion;
	schemeId: string;
}

export default function DiscussionCard({
	discussion,
	schemeId,
}: DiscussionCardProps) {
	return (
		<Link
			href={`/discussion/${schemeId}/${discussion._id}`}
			className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 group"
		>
			<div className="p-6">
				{/* Header */}
				<div className="flex justify-between items-start mb-4">
					<h3 className="text-xl md:text-2xl font-semibold font-figtree text-gray-900 flex-1 group-hover:text-blue-600 transition-colors line-clamp-2 pr-4">
						{discussion.discussionTitle}
					</h3>
					<span className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
						{formatDate(discussion.createdAt)}
					</span>
				</div>

				{/* Description */}
				<p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
					{discussion.discussionInBrief}
				</p>

				{/* Categories */}
				{discussion.category && discussion.category.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-4">
						{discussion.category.map((cat, index) => (
							<span
								key={index}
								className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full border border-amber-200"
							>
								{cat}
							</span>
						))}
					</div>
				)}

				{/* Footer */}
				<div className="flex items-center justify-between pt-4 border-t border-gray-200">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
							<svg
								className="w-5 h-5 text-gray-600"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div>
							<p className="text-sm font-semibold text-gray-900">
								{discussion.name}
							</p>
							<p className="text-xs text-gray-500">
								{discussion.city}, {discussion.district}
							</p>
						</div>
					</div>
					<div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
						<span className="text-sm font-medium mr-2">View</span>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Link>
	);
}

