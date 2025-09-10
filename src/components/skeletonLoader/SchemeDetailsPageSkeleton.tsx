"use client";

import React from "react";

export const SchemeDetailsPageSkeleton = () => {
	return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Header Skeleton */}
				<div className="animate-pulse">
					<div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>

					{/* Author and Share Buttons Skeleton */}
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center space-x-4">
							<div className="w-10 h-10 bg-gray-200 rounded-full"></div>
							<div className="space-y-2">
								<div className="h-4 bg-gray-200 rounded w-24"></div>
								<div className="h-4 bg-gray-200 rounded w-32"></div>
							</div>
						</div>
						<div className="flex space-x-4">
							{[1, 2, 3].map((item) => (
								<div
									key={item}
									className="w-5 h-5 bg-gray-200 rounded-full"
								></div>
							))}
						</div>
					</div>

					{/* Tabs Skeleton */}
					<div className="flex flex-wrap gap-2 mb-8">
						{["About", "Eligibility", "Application", "View All"].map((tab) => (
							<div
								key={tab}
								className="h-10 bg-gray-200 rounded-full w-24"
							></div>
						))}
					</div>

					{/* Main Content Skeleton */}
					<div className="space-y-6">
						{[1, 2, 3, 4].map((item) => (
							<div key={item} className="space-y-3">
								<div className="h-6 bg-gray-200 rounded w-1/3"></div>
								<div className="h-4 bg-gray-200 rounded w-full"></div>
								<div className="h-4 bg-gray-200 rounded w-5/6"></div>
								<div className="h-4 bg-gray-200 rounded w-2/3"></div>
							</div>
						))}

						<div className="h-64 bg-gray-200 rounded-lg"></div>

						{[5, 6].map((item) => (
							<div key={item} className="space-y-3">
								<div className="h-6 bg-gray-200 rounded w-1/3"></div>
								<div className="h-4 bg-gray-200 rounded w-full"></div>
								<div className="h-4 bg-gray-200 rounded w-5/6"></div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
	return (
		<div className="flex flex-col items-center justify-center h-64 bg-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-12 w-12 text-gray-400 mb-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<p className="text-gray-600 text-lg">Scheme details not available</p>
			<button
				onClick={onRetry}
				className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors"
			>
				Try Again
			</button>
		</div>
	);
};
