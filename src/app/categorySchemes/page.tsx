"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	CategoriesListSkeleton,
	CategoriesGridErrorState,
} from "../../components/skeletonLoader/CategoriesGridLoadingSkeleton";
import { Category, getSchemesByCategory } from "@/services/allService";

export default function CategoriesGrid() {
	const router = useRouter();
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchCategories() {
			try {
				setLoading(true);
				setError(false);
				const response = await getSchemesByCategory();
				if (response.success && response.data) {
					setCategories(response.data);
				} else {
					setError(true);
				}
			} catch (error) {
				console.error("Error fetching categories:", error);
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchCategories();
	}, []);

	return (
		<section className="max-w-7xl mx-auto px-4 py-16 bg-white">
			<div className="text-start md:text-center mb-12">
				<h2 className="text-2xl md:text-4xl font-medium font-raleway text-black mb-2">
					Browse Schemes by Category
				</h2>
				<p className="text-black mb-8 font-figtree">
					Explore 1,000+ government schemes across 20+ categories — tailored for
					farmers, students, businesses, and every citizen.
				</p>
			</div>

			{error ? (
				<CategoriesGridErrorState onRetry={() => window.location.reload()} />
			) : (
				<div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
					{loading ? (
						<CategoriesListSkeleton />
					) : (
						categories.map((cat) => (
							<div
								key={cat.categoryId}
								onClick={() => {
									router.push(`/category/${cat.slug}`);
								}}
								className="flex flex-col items-center justify-center p-6 border rounded-xl text-center cursor-pointer bg-white border-[#D1D1DB] hover:shadow-md transition"
							>
								<Image
									src={cat.image || "/fallback-icon.png"}
									alt={cat.name}
									width={48}
									height={48}
									className="h-12 w-12 mb-4 object-cover rounded-full"
								/>
								<p className="text-sm text-gray-600 mb-1 font-figtree">
									Schemes {cat.totalSchemes}
								</p>
								<h3 className="font-semibold text-gray-900 font-figtree">
									{cat.name}
								</h3>
							</div>
						))
					)}
				</div>
			)}

			<div className="mt-10 flex justify-center">
				<button className="bg-darkyellow hover:bg-yellow-500 cursor-pointer text-black font-medium py-3 font-figtree text-[16px] px-6 rounded-full transition">
					View All Categories
				</button>
			</div>
		</section>
	);
}
