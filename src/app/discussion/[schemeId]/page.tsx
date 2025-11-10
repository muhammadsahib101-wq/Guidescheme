"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAllDiscussions, Discussion } from "@/services/allService";
import DiscussionCard from "@/components/discussion/DiscussionCard";
import CreateDiscussionForm from "@/components/discussion/CreateDiscussionForm";

export default function DiscussionListPage() {
	const params = useParams();
	const router = useRouter();
	const schemeId = params.schemeId as string;

	const [discussions, setDiscussions] = useState<Discussion[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showCreateForm, setShowCreateForm] = useState(false);

	const fetchData = useCallback(
		async (signal: AbortSignal) => {
			if (!schemeId) return;

			try {
				setLoading(true);
				setError(null);

				const discussionsData = await getAllDiscussions(schemeId, signal);
				if (signal.aborted) return;

				if (discussionsData.success) {
					setDiscussions(discussionsData.data || []);
				}
			} catch (err) {
				if (signal.aborted) return;
				console.error("Error fetching discussions:", err);
				setError("Failed to load discussions. Please try again.");
			} finally {
				if (!signal.aborted) setLoading(false);
			}
		},
		[schemeId]
	);

	useEffect(() => {
		const controller = new AbortController();
		fetchData(controller.signal);
		return () => controller.abort();
	}, [fetchData]);

	const handleCreateSuccess = () => {
		setShowCreateForm(false);
		const controller = new AbortController();
		fetchData(controller.signal);
	};

	const fisrtdiscussions =
		discussions.length > 0 ? discussions[0].scheme : null;

	// -------------------- Loading --------------------
	if (loading) {
		return (
			<div className="min-h-screen pt-16 bg-gray-50 flex justify-center items-center">
				<div className="animate-pulse w-full max-w-3xl space-y-4 px-4">
					<div className="h-6 bg-gray-200 rounded w-1/3"></div>
					<div className="h-32 bg-gray-200 rounded-lg"></div>
					<div className="h-32 bg-gray-200 rounded-lg"></div>
				</div>
			</div>
		);
	}

	// -------------------- Error --------------------
	if (error) {
		return (
			<div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center px-4">
				<div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
					<p className="text-red-700 font-semibold mb-4">{error}</p>
					<button
						onClick={() => {
							const controller = new AbortController();
							fetchData(controller.signal);
						}}
						className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	// -------------------- Main Content --------------------
	return (
		<div className="min-h-screen pt-16 bg-gray-50">
			<div className="container mx-auto px-4 py-6 max-w-auto">
				{/* Back Button */}
				<button
					onClick={() => router.back()}
					className="text-blue-600 hover:text-blue-800 mb-5 flex items-center gap-2 font-figtree font-medium text-sm"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					Back
				</button>

				{/* Header */}
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-6">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
						Discussion Forum
					</h1>

					{fisrtdiscussions && (
						<p className="text-gray-600 text-sm flex items-center gap-2">
							<span className="inline-block w-1 h-5 bg-amber-500 rounded-full"></span>
							{fisrtdiscussions?.schemeTitle}
						</p>
					)}
				</div>

				{/* Create Discussion Section */}
				<div className="mb-6">
					{!showCreateForm ? (
						<button
							onClick={() => setShowCreateForm(true)}
							className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold text-sm shadow-sm flex items-center gap-2"
						>
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
									d="M12 4v16m8-8H4"
								/>
							</svg>
							Create New Discussion
						</button>
					) : (
						<div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
							<CreateDiscussionForm
								schemeId={schemeId}
								onSuccess={handleCreateSuccess}
								onCancel={() => setShowCreateForm(false)}
							/>
						</div>
					)}
				</div>

				{/* Discussions List */}
				{discussions.length === 0 ? (
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
						<div className="text-4xl mb-3">💬</div>
						<h2 className="text-lg font-semibold text-gray-800 mb-2">
							No Discussions Yet
						</h2>
						<p className="text-gray-500 text-sm mb-4 max-w-sm mx-auto">
							Be the first to start a discussion about this scheme!
						</p>
						{!showCreateForm && (
							<button
								onClick={() => setShowCreateForm(true)}
								className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
							>
								Create First Discussion
							</button>
						)}
					</div>
				) : (
					<div>
						<div className="flex items-center gap-2 mb-4">
							<div className="w-1 h-6 bg-amber-500 rounded-full"></div>
							<h2 className="text-lg font-semibold text-gray-900">
								All Discussions ({discussions.length})
							</h2>
						</div>

						{/* Discussion Cards Grid */}
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{discussions.map((discussion) => (
								<DiscussionCard
									key={discussion._id}
									discussion={discussion}
									schemeId={schemeId}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
