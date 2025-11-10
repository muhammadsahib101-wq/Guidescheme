"use client";

import { useState } from "react";
import { createReply, CreateReplyPayload } from "@/services/allService";

interface CommentFormProps {
	discussionId: string;
	onSuccess: () => void;
}

export default function CommentForm({
	discussionId,
	onSuccess,
}: CommentFormProps) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<CreateReplyPayload>({
		discussionId,
		yourName: "",
		yourEmail: "",
		subject: "",
		comment: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await createReply(formData);
			if (response.success) {
				onSuccess();
				setFormData({
					discussionId,
					yourName: "",
					yourEmail: "",
					subject: "",
					comment: "",
				});
			} else alert(response.message || "Failed to post comment");
		} catch (error) {
			console.error("Error posting comment:", error);
			alert("Failed to post comment. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-2">
			<input
				type="text"
				name="yourName"
				value={formData.yourName}
				onChange={handleChange}
				required
				placeholder="Your Name"
				className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-xs"
			/>
			<textarea
				name="comment"
				value={formData.comment}
				onChange={handleChange}
				required
				rows={2}
				maxLength={250}
				placeholder="Write a comment..."
				className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 resize-none text-xs"
			/>
			<button
				type="submit"
				disabled={loading}
				className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 rounded-md transition"
			>
				{loading ? "Posting..." : "Post"}
			</button>
		</form>
	);
}
