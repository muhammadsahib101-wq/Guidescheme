"use client";

import { Reply } from "@/services/allService";
import { formatDate } from "@/app/lib/utils";

interface CommentListProps {
	replies: Reply[];
}

export default function CommentList({ replies }: CommentListProps) {
	if (replies.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center text-center py-8">
				<div className="text-3xl mb-2">💬</div>
				<p className="text-gray-500 text-xs">No comments yet. Be the first!</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{replies.map((reply) => (
				<div
					key={reply._id}
					className="border border-gray-200 rounded-md p-2 bg-gray-50 hover:bg-gray-100 transition"
				>
					<div className="flex justify-between items-start">
						<p className="font-semibold text-gray-800 text-xs truncate">
							{reply.yourName}
						</p>
						<p className="text-[10px] text-gray-500">
							{formatDate(reply.createdAt)}
						</p>
					</div>
					<p className="text-gray-700 text-xs leading-snug mt-1 whitespace-pre-wrap">
						{reply.comment}
					</p>
				</div>
			))}
		</div>
	);
}
