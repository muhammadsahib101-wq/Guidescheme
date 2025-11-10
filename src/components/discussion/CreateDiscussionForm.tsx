"use client";

import { useState } from "react";
import {
	createDiscussion,
	CreateDiscussionPayload,
} from "@/services/allService";

interface CreateDiscussionFormProps {
	schemeId: string;
	onSuccess: () => void;
	onCancel: () => void;
}

export default function CreateDiscussionForm({
	schemeId,
	onSuccess,
	onCancel,
}: CreateDiscussionFormProps) {
	const initialFormData: CreateDiscussionPayload = {
		scheme: schemeId,
		discussionTitle: "",
		discussionInBrief: "",
		name: "",
		mobileNo: "",
		locality: "",
		pinCode: "",
		gender: "",
		category: [],
		dateOfBirth: "",
		cast: "",
		religion: "",
		houseNumber: "",
		city: "",
		wardNumber: "",
		tehsil: "",
		district: "",
		state: "",
	};

	const [formData, setFormData] =
		useState<CreateDiscussionPayload>(initialFormData);
	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await createDiscussion({
				...formData,
				state: formData.state || undefined,
			});

			if (response.success) {
				onSuccess();
				setFormData({ ...initialFormData });
			} else {
				alert(response.message || "Failed to create discussion");
			}
		} catch (error) {
			console.error("Error creating discussion:", error);
			alert("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
				{/* Header */}
				<div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center justify-between">
					<div>
						<h2 className="text-lg md:text-xl font-semibold text-white">
							Create New Discussion
						</h2>
						<p className="text-blue-100 text-xs mt-1">
							Share your thoughts and questions about this scheme
						</p>
					</div>

					{/* Close Button */}
					<button
						type="button"
						onClick={onCancel}
						className="absolute top-3 right-4 text-white hover:text-blue-200 transition"
						aria-label="Close"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-5 space-y-6">
					{/* Discussion Details */}
					<section>
						<div className="flex items-center gap-2 mb-3">
							<div className="w-1 h-5 bg-amber-500 rounded-full"></div>
							<h3 className="text-base font-semibold text-gray-900">
								Discussion Details
							</h3>
						</div>

						<div className="bg-gray-50 rounded-lg p-4 space-y-3">
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Discussion Title <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="discussionTitle"
									value={formData.discussionTitle}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
									placeholder="Enter discussion title"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Discussion Brief <span className="text-red-500">*</span>
								</label>
								<textarea
									name="discussionInBrief"
									value={formData.discussionInBrief}
									onChange={handleChange}
									required
									rows={3}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
									placeholder="Describe your topic..."
								/>
							</div>
						</div>
					</section>

					{/* Personal Info */}
					<section>
						<div className="flex items-center gap-2 mb-3">
							<div className="w-1 h-5 bg-amber-500 rounded-full"></div>
							<h3 className="text-base font-semibold text-gray-900">
								Personal Information
							</h3>
						</div>

						<div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
									placeholder="Your full name"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Mobile Number <span className="text-red-500">*</span>
								</label>
								<input
									type="tel"
									name="mobileNo"
									value={formData.mobileNo}
									onChange={handleChange}
									required
									pattern="[0-9]{10}"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
									placeholder="10-digit number"
								/>
							</div>
						</div>
					</section>

					{/* Address Info */}
					<section>
						<div className="flex items-center gap-2 mb-3">
							<div className="w-1 h-5 bg-amber-500 rounded-full"></div>
							<h3 className="text-base font-semibold text-gray-900">
								Address Information
							</h3>
						</div>

						<div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Address <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="locality"
									value={formData.locality}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
									placeholder="Area / Locality"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									PIN Code <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="pinCode"
									value={formData.pinCode}
									onChange={handleChange}
									required
									pattern="[0-9]{6}"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
									placeholder="6-digit PIN code"
								/>
							</div>
						</div>
					</section>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 mt-4 border-t border-gray-200">
						<button
							type="button"
							onClick={onCancel}
							className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm transition"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 text-sm transition"
						>
							{loading ? "Creating..." : "Create Discussion"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
