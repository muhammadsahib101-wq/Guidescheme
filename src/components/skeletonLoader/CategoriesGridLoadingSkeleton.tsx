import React from "react";

export const CategoriesListSkeleton = () => {
	return (
		<>
			{[...Array(12)].map((_, index) => (
				<div
					key={index}
					className="flex flex-col items-center justify-center p-6 border rounded-xl text-center bg-white border-[#D1D1DB] animate-pulse"
				>
					<div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
					<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
					<div className="h-5 bg-gray-200 rounded w-1/2"></div>
				</div>
			))}
		</>
	);
};

export const CategoriesGridErrorState = ({
	onRetry,
}: {
	onRetry: () => void;
}) => {
	return (
		<section className="max-w-7xl mx-auto px-4 py-16 bg-white text-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-16 w-16 text-red-500 mx-auto mb-4"
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
				Failed to Load Categories
			</h3>
			<p className="text-gray-600 mb-6 max-w-md mx-auto">
				We couldn&apos;t fetch the scheme categories. Please check your internet
				connection and try again.
			</p>
			<button
				onClick={onRetry}
				className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-full transition"
			>
				Retry
			</button>
		</section>
	);
};
