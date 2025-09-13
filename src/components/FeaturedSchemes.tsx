"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	FeaturedSchemesErrorState,
	FeaturedSchemesListSkeleton,
} from "./skeletonLoader/FeaturedSchemesLoadingSkeleton";
import { getSchemesByState, StateSchemeData } from "@/services/allService";
import MapImage from "../../public/noun-india-7842135.png";

export default function FeaturedSchemes() {
	const router = useRouter();
	const [states, setStates] = useState<StateSchemeData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchStates() {
			try {
				setLoading(true);
				setError(false);
				const data = await getSchemesByState();
				if (data.length > 0) {
					setStates(data);
				} else {
					setError(true);
				}
			} catch {
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		fetchStates();
	}, []);

	const getImageSrc = (src?: string) => {
		if (!src) return MapImage;
		if (src.startsWith("http")) return src;
		return MapImage;
	};

	return (
		<section className="px-5 py-12 max-w-7xl mx-auto bg-white">
			<header>
				<h2 className="text-4xl font-medium font-raleway text-black mb-2">
					Explore Schemes by Your State
				</h2>
				<p className="text-black mb-8 font-figtree">
					Get benefits tailored to your region from over 1,000+ government
					schemes.
				</p>
			</header>

			{error ? (
				<FeaturedSchemesErrorState onRetry={() => window.location.reload()} />
			) : (
				<ul className="grid gap-3 md:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{loading ? (
						<FeaturedSchemesListSkeleton />
					) : (
						states.map((state) => (
							<li
								key={state.stateId}
								onClick={() => {
									router.push(`/state/${state.slug}`);
								}}
								className="border border-[#D1D1DB] px-4 py-5 transition duration-300 bg-white rounded-xl hover:shadow-md cursor-pointer"
							>
								<div className="flex justify-center mb-5">
									<div className="bg-green-700 w-[72px] h-[72px] p-4 rounded-full">
										<Image
											src={getImageSrc(state.image)}
											alt={`Map icon for ${state.name}`}
											width={48}
											height={48}
										/>
									</div>
								</div>
								<h3 className="text-center font-figtree font-semibold text-black text-md">
									{state.name}
								</h3>
								<p className="text-center text-sm text-black">
									Total Schemes: {state.totalSchemes || 0}
								</p>
							</li>
						))
					)}
				</ul>
			)}
		</section>
	);
}
