// src/components/card/RecentBlogSidebar.tsx
import Image from "next/image";
import Link from "next/link";
import { ApiScheme } from "@/services/allService";
import BlogImage from "../../app/assets/blog1.jpg";

interface RecentBlogSidebarProps {
	recentPosts: ApiScheme[];
}

export default function RecentBlogSidebar({
	recentPosts,
}: RecentBlogSidebarProps) {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Recent Schemes
			</h2>
			<ul className="space-y-4">
				{recentPosts.slice(0, 5).map((post) => (
					<li
						key={post._id}
						className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
					>
						<Link
							href={`/schemes/${post.slug}`}
							className="flex gap-4 items-center group"
						>
							<div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden relative">
								<Image
									src={post.cardImage?.url || BlogImage}
									alt={post.schemeTitle}
									layout="fill"
									objectFit="cover"
									className="transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<div className="flex-1">
								<h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
									{post.schemeTitle}
								</h3>
								<p className="text-sm text-gray-500 mt-1">
									By {post.author.name} on {formatDate(post.publishedOn)}
								</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
