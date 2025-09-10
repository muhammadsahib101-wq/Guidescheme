"use client";

import React from "react";

export const FeaturedSchemesListSkeleton = () => {
	return (
		<>
			{[...Array(10)].map((_, index) => (
				<div
					key={index}
					className="border border-[#D1D1DB] px-4 py-5 transition duration-300 bg-white rounded-xl animate-pulse"
				>
					<div className="flex justify-center mb-5">
						<div className="bg-gray-200 p-4 rounded-full w-16 h-16"></div>
					</div>
					<div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
				</div>
			))}
		</>
	);
};

export const FeaturedSchemesErrorState = ({
	onRetry,
}: {
	onRetry: () => void;
}) => {
	return (
		<section className="px-5 py-12 max-w-7xl mx-auto bg-white text-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-12 w-12 text-red-500 mx-auto mb-4"
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
				Failed to Load State Schemes
			</h3>
			<p className="text-gray-600 mb-6">
				We couldn&apos;t fetch the state-wise scheme data. Please check your
				connection.
			</p>
			<button
				onClick={onRetry}
				className="px-6 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-medium"
			>
				Try Again
			</button>
		</section>
	);
};
