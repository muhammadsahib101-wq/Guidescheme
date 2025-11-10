"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DiscussionPage() {
	const router = useRouter();

	useEffect(() => {
		router.push("/schemes");
	}, [router]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 px-4">
			<div className="text-6xl mb-6 animate-pulse">🔄</div>
			<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
				Redirecting...
			</h1>
			<p className="text-lg md:text-xl text-gray-700 mb-8 text-center">
				Please select a scheme to view discussions.
			</p>
		</div>
	);
}
