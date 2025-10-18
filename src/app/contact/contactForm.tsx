"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

type FieldNames = "name" | "email" | "phone" | "subject" | "message";
type FormDataType = Partial<Record<FieldNames, string>>;

export default function ContactPageClient() {
	const [formData, setFormData] = useState<FormDataType>({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errors, setErrors] = useState<FormDataType>({});
	const statusRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		emailjs.init("AhNTAJZR48W_gt4c9");
	}, []);

	const validate = (data: FormDataType) => {
		const e: FormDataType = {};

		if (!data.name?.trim()) e.name = "Name is required.";
		else if (data.name.trim().length < 3)
			e.name = "Enter at least 3 characters.";

		if (!data.email?.trim()) e.email = "Email is required.";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
			e.email = "Enter a valid email.";

		if (data.phone && !/^[0-9]{10}$/.test(data.phone.trim()))
			e.phone = "Phone must be 10 digits.";

		if (!data.subject?.trim()) e.subject = "Please select a subject.";

		if (!data.message?.trim()) e.message = "Message is required.";
		else if (data.message.trim().length < 10)
			e.message = "Message must be at least 10 characters.";

		return e;
	};

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target as { name: FieldNames; value: string };
		const next = { ...formData, [name]: value };
		setFormData(next);
		const v = validate(next);
		setErrors((prev) => ({ ...prev, [name]: v[name] }));
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const v = validate(formData);
		if (Object.keys(v).length) {
			setErrors(v);
			return;
		}
		setErrors({});
		setIsSubmitting(true);

		try {
			const result = await emailjs.send("service_1ck5srw", "template_vcw89gx", {
				name: formData.name,
				email: formData.email,
				phone: formData.phone || "Not provided",
				subject: formData.subject,
				message: formData.message,
			});

			console.log("Email sent successfully:", result);
			setIsSubmitted(true);
		} catch (error) {
			console.error("Failed to send email:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (isSubmitted) statusRef.current?.focus();
	}, [isSubmitted]);

	return (
		<div className="bg-gray-50 min-h-screen pb-12 pt-16">
			<header className="text-center mb-12 py-12 bg-gradient-to-br from-[#FFFFFF] via-[#BFF5D4] to-[#FFFFFF]">
				<h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
				<p className="text-lg text-gray-700 max-w-3xl mx-auto">
					Have questions about government schemes or need assistance? We&apos;re
					here to help!
				</p>
			</header>
			<div className="max-w-7xl mx-auto px-4 lg:px-8">
				{errors.message && (
					<div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
						<strong>Error: </strong>
						{errors.message}
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
					{/* LEFT: FORM */}
					<main className="bg-white rounded-lg shadow p-6" role="form">
						{!isSubmitted ? (
							<>
								<h3 className="text-2xl font-semibold text-gray-900 mb-6">
									Send Us a Message
								</h3>
								<form onSubmit={onSubmit} noValidate>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
										{/* Name */}
										<div>
											<label
												htmlFor="name"
												className="block text-sm font-medium text-gray-800 mb-1"
											>
												Your Name <span className="sr-only">(required)</span>*
											</label>
											<input
												id="name"
												name="name"
												type="text"
												autoComplete="name"
												inputMode="text"
												required
												minLength={3}
												value={formData.name || ""}
												onChange={onChange}
												aria-invalid={Boolean(errors.name)}
												aria-describedby={
													errors.name ? "name-error" : undefined
												}
												className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
												placeholder="Enter your full name"
											/>
											{errors.name && (
												<p
													id="name-error"
													role="alert"
													className="mt-1 text-sm text-red-600"
												>
													{errors.name}
												</p>
											)}
										</div>

										{/* Email */}
										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium text-gray-800 mb-1"
											>
												Email Address *
											</label>
											<input
												id="email"
												name="email"
												type="email"
												autoComplete="email"
												required
												value={formData.email || ""}
												onChange={onChange}
												aria-invalid={Boolean(errors.email)}
												aria-describedby={
													errors.email ? "email-error" : undefined
												}
												className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
												placeholder="you@example.com"
											/>
											{errors.email && (
												<p
													id="email-error"
													role="alert"
													className="mt-1 text-sm text-red-600"
												>
													{errors.email}
												</p>
											)}
										</div>

										{/* Phone */}
										<div>
											<label
												htmlFor="phone"
												className="block text-sm font-medium text-gray-800 mb-1"
											>
												Phone Number (optional)
											</label>
											<input
												id="phone"
												name="phone"
												type="tel"
												autoComplete="tel"
												inputMode="numeric"
												pattern="[0-9]{10}"
												value={formData.phone || ""}
												onChange={onChange}
												aria-invalid={Boolean(errors.phone)}
												aria-describedby={
													errors.phone ? "phone-error" : undefined
												}
												className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
												placeholder="10-digit mobile number"
											/>
											{errors.phone && (
												<p
													id="phone-error"
													role="alert"
													className="mt-1 text-sm text-red-600"
												>
													{errors.phone}
												</p>
											)}
										</div>

										{/* Subject */}
										<div>
											<label
												htmlFor="subject"
												className="block text-sm font-medium text-gray-800 mb-1"
											>
												Subject *
											</label>
											<select
												id="subject"
												name="subject"
												required
												value={formData.subject || ""}
												onChange={onChange}
												aria-invalid={Boolean(errors.subject)}
												aria-describedby={
													errors.subject ? "subject-error" : undefined
												}
												className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
											>
												<option value="">Select a subject</option>
												<option>General Inquiry</option>
												<option>Scheme Information</option>
												<option>Eligibility Question</option>
												<option>Application Assistance</option>
												<option>Website Feedback</option>
												<option>Report an Issue</option>
												<option>Other</option>
											</select>
											{errors.subject && (
												<p
													id="subject-error"
													role="alert"
													className="mt-1 text-sm text-red-600"
												>
													{errors.subject}
												</p>
											)}
										</div>
									</div>

									{/* Message */}
									<div className="mb-6">
										<label
											htmlFor="message"
											className="block text-sm font-medium text-gray-800 mb-1"
										>
											Your Message *
										</label>
										<textarea
											id="message"
											name="message"
											required
											minLength={10}
											rows={5}
											value={formData.message || ""}
											onChange={onChange}
											aria-invalid={Boolean(errors.message)}
											aria-describedby={
												errors.message ? "message-error" : undefined
											}
											className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
											placeholder="Please describe your query in detail"
										/>
										{errors.message && (
											<p
												id="message-error"
												role="alert"
												className="mt-1 text-sm text-red-600"
											>
												{errors.message}
											</p>
										)}
									</div>

									<div className="flex justify-end">
										<button
											type="submit"
											aria-busy={isSubmitting}
											className="px-6 py-3 rounded-md text-black bg-darkyellow disabled:opacity-60"
											disabled={isSubmitting}
										>
											{isSubmitting ? "Sending…" : "Send Message"}
										</button>
									</div>
								</form>
							</>
						) : (
							<div
								ref={statusRef}
								tabIndex={-1}
								aria-live="polite"
								className="p-6 text-center"
							>
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
									{/* check icon */}
									<svg
										viewBox="0 0 24 24"
										className="h-6 w-6"
										aria-hidden="true"
									>
										<path
											d="M9 12.5l2 2 4-5"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										/>
										<circle
											cx="12"
											cy="12"
											r="10"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Thank you for contacting us!
								</h3>
								<p className="text-gray-700">
									We usually respond within 24–48 hours.
								</p>
								<button
									onClick={() => {
										setIsSubmitted(false);
										setFormData({
											name: "",
											email: "",
											phone: "",
											subject: "",
											message: "",
										});
									}}
									className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
								>
									Send another message
								</button>
							</div>
						)}
					</main>

					{/* RIGHT: INFO */}
					<aside
						className="space-y-6"
						aria-label="Contact information and social links"
					>
						{/* Contact Information */}
						<section className="bg-white rounded-lg shadow p-6">
							<h4 className="text-lg font-semibold text-gray-900 mb-4">
								Contact Information
							</h4>
							<p className="text-gray-700 mb-2">
								<span className="font-medium">Email</span>
								<br />
								<a href="mailto:care@govtschemeguide.com" className="underline">
									care@govtschemeguide.com
								</a>
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-medium">Phone</span>
								<br />
								<a href="tel:+918273040400" className="underline">
									+91 8273040400
								</a>
							</p>
							<p className="text-gray-700">
								<span className="font-medium">Address</span>
								<br />
								97, Van Vihar, Mehuwala, Dehradun, Uttarakhand, India – 248171
							</p>
						</section>

						{/* Follow Us */}
						<section className="bg-white rounded-lg shadow p-6">
							<h4 className="text-lg font-semibold text-gray-900 mb-4">
								Follow Us
							</h4>
							<ul
								className="flex gap-4 text-orange-600"
								aria-label="Social media"
							>
								{/* Inline SVG icons (no blocking CSS) */}
								<li>
									<a
										href="https://facebook.com/yourpage"
										aria-label="Facebook"
										rel="me noopener"
										target="_blank"
									>
										<svg
											viewBox="0 0 24 24"
											className="h-6 w-6"
											aria-hidden="true"
										>
											<path d="M13 22v-9h3l1-4h-4V7c0-1.1.9-2 2-2h2V1h-3a5 5 0 00-5 5v3H7v4h3v9h3z" />
										</svg>
									</a>
								</li>
								<li>
									<a
										href="https://twitter.com/yourhandle"
										aria-label="Twitter"
										rel="me noopener"
										target="_blank"
									>
										<svg
											viewBox="0 0 24 24"
											className="h-6 w-6"
											aria-hidden="true"
										>
											<path d="M22 5.8a8.4 8.4 0 01-2.4.7A4.2 4.2 0 0021.4 4a8.3 8.3 0 01-2.6 1 4.2 4.2 0 00-7.2 3.8A12 12 0 013 5.1a4.2 4.2 0 001.3 5.6 4.2 4.2 0 01-1.9-.5v.1a4.2 4.2 0 003.3 4.1 4.2 4.2 0 01-1.9.1 4.2 4.2 0 003.9 2.9A8.4 8.4 0 012 19.5a12 12 0 006.5 1.9c7.8 0 12.1-6.5 12.1-12.1v-.6A8.6 8.6 0 0022 5.8z" />
										</svg>
									</a>
								</li>
								<li>
									<a
										href="https://instagram.com/yourpage"
										aria-label="Instagram"
										rel="me noopener"
										target="_blank"
									>
										<svg
											viewBox="0 0 24 24"
											className="h-6 w-6"
											aria-hidden="true"
										>
											<path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.9a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2zM12 9a3 3 0 110 6 3 3 0 010-6z" />
										</svg>
									</a>
								</li>
								<li>
									<a
										href="https://youtube.com/@yourchannel"
										aria-label="YouTube"
										rel="me noopener"
										target="_blank"
									>
										<svg
											viewBox="0 0 24 24"
											className="h-6 w-6"
											aria-hidden="true"
										>
											<path d="M23.5 7.2a3 3 0 00-2.1-2.1C19.6 4.5 12 4.5 12 4.5s-7.6 0-9.4.6A3 3 0 00.5 7.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 4.8 3 3 0 002.1 2.1c1.8.6 9.4.6 9.4.6s7.6 极速4g 0 9.4-.6a3 3 0 002.1-2.1A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-4.8zM9.8 15.3V8.7L15.8 12l-6 3.3z" />
										</svg>
									</a>
								</li>
								<li>
									<a
										href="https://t.me/yourtelegram"
										aria-label="Telegram"
										rel="me noopener"
										target="_blank"
									>
										<svg
											viewBox="0 0 24 24"
											className="h-6 w-6"
											aria-hidden="true"
										>
											<path d="M9.6 极速4g4.7l-.4 4.8c.6 0 .8-.2 1.1-.5l2.6-2.5 5.4 4c1 .6 1.8.3 2.1-.9l3.8-17.7v0c.3-1.3-.5-1.8-1.5-1.5L1.6 9.5C.3 10 .3 10.8 1.4 11.1l4.8 1.5 11.1-7-7.7 8.9z" />
										</svg>
									</a>
								</li>
							</ul>
						</section>

						{/* Feedback */}
						<section className="bg-white rounded-lg shadow p-6">
							<h4 className="text-lg font-semibold text-gray-极速4g mb-2">
								Feedback and Suggestions
							</h4>
							<p className="text-gray-700 mb-2">
								Consumer feedback is our priority. If you have any suggestions
								for us, we request you to send your feedback to the given email
								address..
							</p>
							<a
								href="mailto:feedback@govtschemeguide.com"
								className="underline"
							>
								feedback@govtschemeguide.com
							</a>
						</section>
					</aside>
				</div>
			</div>
		</div>
	);
}
