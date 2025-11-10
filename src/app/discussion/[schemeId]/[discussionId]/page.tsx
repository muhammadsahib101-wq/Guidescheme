"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
	getDiscussionById,
	getAllReplies,
	Discussion,
	Reply,
} from "@/services/allService";
import { formatDate } from "@/app/lib/utils";
import CommentForm from "@/components/discussion/CommentForm";
import CommentList from "@/components/discussion/CommentList";

export default function DiscussionDetailPage() {
	const params = useParams();
	const router = useRouter();
	const schemeId = params.schemeId as string;
	const discussionId = params.discussionId as string;

	const [discussion, setDiscussion] = useState<Discussion | null>(null);
	const [replies, setReplies] = useState<Reply[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(
		async (signal: AbortSignal) => {
			if (!discussionId) return;
			try {
				setLoading(true);
				setError(null);
				const [discussionData, repliesData] = await Promise.all([
					getDiscussionById(discussionId, signal),
					getAllReplies(discussionId, signal),
				]);

				if (signal.aborted) return;

				if (discussionData.success && discussionData.data) {
					setDiscussion(discussionData.data);
				} else {
					setError("Discussion not found");
				}

				if (repliesData.success) {
					setReplies(repliesData.data || []);
				}
			} catch (err) {
				if (signal.aborted) return;
				setError("Failed to load discussion. Please try again.");
			} finally {
				if (!signal.aborted) setLoading(false);
			}
		},
		[discussionId]
	);

	useEffect(() => {
		const controller = new AbortController();
		fetchData(controller.signal);
		return () => controller.abort();
	}, [fetchData]);

	const handleCommentSuccess = () => {
		const controller = new AbortController();
		getAllReplies(discussionId, controller.signal).then((repliesData) => {
			if (repliesData.success) setReplies(repliesData.data || []);
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="animate-pulse space-y-4 w-full max-w-2xl">
					<div className="h-6 bg-gray-200 rounded w-1/3"></div>
					<div className="h-48 bg-gray-200 rounded-lg"></div>
				</div>
			</div>
		);
	}

	if (error || !discussion) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
				<p className="text-red-700 font-semibold mb-4">
					{error || "Discussion not found"}
				</p>
				<button
					onClick={() => router.push(`/discussion/${schemeId}`)}
					className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
				>
					Back to Discussions
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-16 bg-gray-50">
			<div className="container mx-auto px-4 py-6 max-w-auto">
				<button
					onClick={() => router.push(`/discussion/${schemeId}`)}
					className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2 font-figtree font-medium text-sm"
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
					Back to Discussions
				</button>

				<div className="flex flex-col lg:flex-row gap-6">
					<div className="w-full lg:w-[70%] bg-white border border-gray-200 shadow-sm rounded-lg p-5">
						{/* 🔶 Scheme Information */}
						{discussion.scheme && (
							<div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-gray-700">
								<p className="font-semibold text-amber-800">
									<span className="font-bold text-gray-800">Scheme Title:</span>{" "}
									{discussion.scheme.schemeTitle}
								</p>
								{discussion.scheme.slug && (
									<button
										onClick={() =>
											router.push(`/schemes/${discussion.scheme.slug}`)
										}
										className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-2 underline"
									>
										View Full Scheme Details
									</button>
								)}
							</div>
						)}

						{/* 🟦 Discussion Information */}
						<div className="mb-6">
							<h1 className="text-xl font-bold text-gray-900 mb-2">
								<span className="font-semibold text-gray-700">
									Discussion Title:
								</span>{" "}
								{discussion.discussionTitle}
							</h1>
							<p className="text-xs text-gray-500 mb-3">
								{formatDate(discussion.createdAt)}
							</p>
							<div className="bg-gray-50 rounded-md p-3 border-l-4 border-blue-500 text-sm text-gray-700">
								<span className="font-semibold text-gray-800">
									Discussion Summary:
								</span>{" "}
								{discussion.discussionInBrief}
							</div>
						</div>

						{/* 🧍 Author Info */}
						<div className="border-t border-gray-200 pt-4 mt-2">
							<h3 className="text-sm font-semibold mb-2 text-gray-800">
								Author Information
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
								<p>
									<strong>Name:</strong> {discussion.name}
								</p>
								<p>
									<strong>Mobile:</strong> {discussion.mobileNo}
								</p>
							</div>
						</div>

						{/* 🏠 Address Info */}
						<div className="border-t border-gray-200 pt-4 mt-4">
							<h3 className="text-sm font-semibold mb-2 text-gray-800">
								Address
							</h3>
							<div className="text-xs text-gray-700 space-y-1">
								<p>
									<strong>Locality:</strong> {discussion.locality || "-"}
								</p>
								<p>
									<strong>PIN Code:</strong> {discussion.pinCode || "-"}
								</p>
							</div>
						</div>
					</div>

					{/* 💬 Comments Panel */}
					<div className="w-full lg:w-[30%] flex flex-col gap-3 lg:sticky lg:top-20 h-[80vh]">
						<div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
							<h3 className="text-sm font-semibold px-3 py-2 border-b border-gray-200 text-gray-800">
								Comments ({replies.length})
							</h3>
							<div className="flex-1 overflow-y-auto px-3 pb-3 pt-3 custom-scroll">
								<CommentList replies={replies} />
							</div>
						</div>

						<div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
							<CommentForm
								discussionId={discussionId}
								onSuccess={handleCommentSuccess}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
