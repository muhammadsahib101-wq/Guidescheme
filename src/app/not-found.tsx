import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
			<div className="max-w-md w-full">
				{/* Simple decorative SVG */}
				<svg
					className="mx-auto h-24 w-24 text-gray-300"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>

				<h1 className="mt-8 text-6xl md:text-8xl font-extrabold text-gray-800 tracking-tighter">
					404
				</h1>

				<p className="mt-4 text-2xl font-semibold text-gray-700">
					Page Not Found
				</p>

				<p className="mt-2 text-base text-gray-500">
					Sorry, we couldn’t find the page you’re looking for. It might have
					been moved or deleted.
				</p>

				<div className="mt-8">
					<Link
						href="/"
						className="inline-block px-8 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
					>
						Go Back Home
					</Link>
				</div>
			</div>
		</main>
	);
}
