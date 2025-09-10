"use client";

import React from "react";

export const StateSchemesLoadingSkeleton = () => {
	return (
		<div className="min-h-screen bg-white mt-14">
			<div className="max-w-7xl mx-auto px-5">
				{/* Header Skeleton */}
				<div className="animate-pulse mb-8">
					<div className="h-10 bg-gray-200 rounded w-1/2 mx-auto md:mx-0"></div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content Skeleton */}
					<div className="lg:col-span-2 space-y-6">
						{[1, 2, 3, 4, 5].map((item) => (
							<div key={item} className="border border-gray-200 rounded-lg p-4">
								<div className="flex flex-col md:flex-row gap-4">
									{/* Image Skeleton */}
									<div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg"></div>

									{/* Content Skeleton */}
									<div className="w-full md:w-2/3 space-y-3">
										<div className="h-4 bg-gray-200 rounded w-1/4"></div>
										<div className="h-6 bg-gray-200 rounded w-3/4"></div>
										<div className="h-4 bg-gray-200 rounded w-full"></div>
										<div className="h-4 bg-gray-200 rounded w-5/6"></div>
										<div className="h-4 bg-gray-200 rounded w-2/3"></div>
										<div className="flex items-center space-x-4 pt-2">
											<div className="h-4 bg-gray-200 rounded w-1/3"></div>
											<div className="h-4 bg-gray-200 rounded w-1/3"></div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Sidebar Skeleton */}
					<div className="lg:col-span-1">
						<div className="bg-gray-100 p-4 rounded-lg">
							<div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
							<div className="space-y-4">
								{[1, 2, 3, 4, 5].map((item) => (
									<div key={item} className="flex gap-3">
										<div className="w-1/3 h-20 bg-gray-200 rounded"></div>
										<div className="w-2/3 space-y-2">
											<div className="h-4 bg-gray-200 rounded w-full"></div>
											<div className="h-3 bg-gray-200 rounded w-1/2"></div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const StateSchemesErrorState = ({
	stateName,
	onRetry,
}: {
	stateName: string;
	onRetry: () => void;
}) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] bg-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-16 w-16 text-red-500 mb-4"
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
				Failed to load schemes for {stateName}
			</h3>
			<p className="text-gray-600 mb-6 text-center max-w-md">
				We couldn&apos;t fetch the government schemes for this state. Please
				check your connection and try again.
			</p>
			<button
				onClick={onRetry}
				className="px-6 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-medium"
			>
				Retry
			</button>
		</div>
	);
};
