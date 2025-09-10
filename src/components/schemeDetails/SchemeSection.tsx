import { ApiScheme } from "@/services/allService";
import { useEffect } from "react";

export default function SchemeSection({
	scheme,
}: {
	scheme: ApiScheme;
	formatDate: (dateString: string) => string;
}) {
	const renderContent = (
		content: string | undefined,
		renderFn: (content: string) => React.ReactNode,
		fallback: string = "Not Available"
	) => {
		return content ? (
			renderFn(content)
		) : (
			<p className="text-gray-500">{fallback}</p>
		);
	};

	const renderTableRow = (label: string, value: string | undefined) => (
		<tr className="border-b border-gray-200 even:bg-gray-50 hover:bg-gray-100 transition-colors">
			<td className="py-3 px-4 text-sm font-medium text-gray-700">{label}</td>
			<td className="py-3 px-4 text-sm text-gray-700">
				{value || "Not Available"}
			</td>
		</tr>
	);

	useEffect(() => {
		if (scheme.textWithHTMLParsing?.htmlDescription) {
			setTimeout(() => {
				const htmlContent = document.querySelector(".html-content");
				if (htmlContent) {
					const anchors = htmlContent.querySelectorAll("a");
					anchors.forEach((anchor) => {
						if (!anchor.style.color || anchor.style.color === "") {
							anchor.style.color = "#2563eb";
							anchor.style.textDecoration = "underline";
							anchor.style.fontWeight = "500";
						}
					});
				}
			}, 100);
		}
	}, [scheme.textWithHTMLParsing?.htmlDescription]);

	return (
		<section className="w-full bg-white p-0 md:p-6 rounded-xl">
			<style>
				{`
          /* Anchor link styling - Only target anchors without inline colors */
          .html-content a:not([style*="color"]) {
            color: #2563eb !important;
            text-decoration: underline !important;
            font-weight: 500 !important;
          }
          .html-content a:not([style*="color"]):hover {
            color: #1d4ed8 !important;
          }
          
          /* Enhanced HTML content styling - preserve original colors */
          .html-content {
            font-family: 'Figtree', sans-serif;
            line-height: 1.7;
          }
          
          .html-content h1, 
          .html-content h2, 
          .html-content h3, 
          .html-content h4, 
          .html-content h5, 
          .html-content h6 {
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
            line-height: 1.3;
          }
          
          .html-content h1 {
            font-size: 1.75rem;
            padding-bottom: 0.5rem;
            margin-top: 0;
          }
          
          .html-content h2 {
            font-size: 1.5rem;
            padding-bottom: 0.5rem;
          }
          
          .html-content h3 {
            font-size: 1.25rem;
          }
          
          .html-content p {
            margin-bottom: 1rem;
            line-height: 1.6;
          }
          
          .html-content ul, 
          .html-content ol {
            margin-bottom: 1.25rem;
            padding-left: 1.5rem;
          }
          
          .html-content li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
          
          .html-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            background: white;
            transition: box-shadow 0.2s ease;
          }
          
          .html-content table:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          }
          
          .html-content th {
            background-color: #fef9c3;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
            border: 1px solid #fde68a;
            font-size: 0.875rem;
          }
          
          .html-content td {
            padding: 0.75rem;
            border: 1px solid #fde68a;
            font-size: 0.875rem;
          }
          
          .html-content tr:nth-child(even) {
            background-color: #fffbeb;
          }
          
          .html-content blockquote {
            border-left: 3px solid #f59e0b;
            background-color: #fffbeb;
            padding: 1rem 1.25rem;
            margin: 1.5rem 0;
            border-radius: 0 0.5rem 0.5rem 0;
          }
          
          .html-content strong {
            font-weight: 600;
          }
          
          @media (max-width: 768px) {
            .html-content table {
              display: block;
              overflow-x: auto;
            }
            
            .html-content h1 {
              font-size: 1.5rem;
            }
            
            .html-content h2 {
              font-size: 1.25rem;
            }
            
            .html-content h3 {
              font-size: 1.125rem;
            }
          }
        `}
			</style>

			{/* About Section */}
			<div id="about" className="mb-8">
				<h1 className="text-2xl md:text-3xl font-bold mb-5 text-gray-900">
					About the Scheme
				</h1>
				{renderContent(scheme.about, (about) => (
					<div className="rounded-xl bg-gray-50 p-0 md:p-6">
						<p className="text-gray-700 leading-relaxed">{about}</p>
					</div>
				))}

				{scheme.objectives && (
					<>
						<h3 className="text-xl font-bold my-5 text-gray-900 mt-6">
							Objective
						</h3>
						{renderContent(scheme.objectives, (objectives) => (
							<div className="rounded-xl bg-gray-50 p-0 md:p-6">
								<p className="text-gray-700 leading-relaxed">{objectives}</p>
							</div>
						))}
					</>
				)}
			</div>

			{/* HTML Content from API */}
			{scheme.textWithHTMLParsing?.htmlDescription && (
				<div className="mb-8 rounded-xl bg-gray-50 p-2 md:p-6 overflow-hidden">
					<div
						className="html-content"
						dangerouslySetInnerHTML={{
							__html: scheme.textWithHTMLParsing.htmlDescription,
						}}
					/>
				</div>
			)}

			{/* Salient Features Section */}
			{scheme.salientFeatures && scheme.salientFeatures.length > 0 && (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-900">
						Salient Features
					</h2>
					<div className="rounded-xl bg-gray-50 p-5 md:p-6">
						<ul className="space-y-4">
							{scheme.salientFeatures.map((feature, index) => (
								<li
									key={feature._id || index}
									className="flex items-start space-x-3"
								>
									<span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-semibold">
										{index + 1}
									</span>
									<div>
										<h3 className="font-semibold text-gray-900">
											{feature.subTitle || "Feature"}
										</h3>
										<p className="text-gray-700 leading-relaxed">
											{feature.subDescription || "Description not available"}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}

			{/* Helpline Number Section */}
			{scheme.helplineNumber && (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-900">
						Helpline Number
					</h2>
					<div className="rounded-xl bg-gray-50 p-2 md:p-6 overflow-x-auto">
						<table className="min-w-full">
							<tbody>
								{renderTableRow(
									"Toll-Free Number",
									scheme.helplineNumber?.tollFreeNumber
								)}
								{renderTableRow(
									"Email Support",
									scheme.helplineNumber?.emailSupport
								)}
								{renderTableRow(
									"Availability",
									scheme.helplineNumber?.availability
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* FAQs Section */}
			{scheme.frequentlyAskedQuestions &&
				scheme.frequentlyAskedQuestions.length > 0 && (
					<div className="mb-8">
						<h2 className="text-xl font-bold mb-4 text-gray-900">
							Frequently Asked Questions (FAQs)
						</h2>
						<div className="rounded-xl bg-gray-50 p-2 md:p-6">
							<div className="space-y-4">
								{scheme.frequentlyAskedQuestions.map((faq, index) => (
									<div
										key={faq._id || index}
										className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
									>
										<h3 className="font-semibold text-gray-900 mb-2 flex items-start">
											<span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs mt-1">
												{index + 1}
											</span>
											<span>{faq.question || "Question not available"}</span>
										</h3>
										<p className="text-gray-700 leading-relaxed pl-9">
											{faq.answer || "Answer not available"}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

			{/* Sources and References Section */}
			{scheme.sourcesAndReferences &&
				scheme.sourcesAndReferences.length > 0 && (
					<div className="mb-8">
						<h2 className="text-xl font-bold mb-4 text-gray-900">
							Sources and References
						</h2>
						<div className="rounded-xl bg-gray-50 p-2 md:p-6">
							<ul className="space-y-3">
								{scheme.sourcesAndReferences.map((source, index) => (
									<li
										key={source._id || index}
										className="md:p-3 rounded-lg bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
									>
										<div className="flex-1">
											<strong className="text-gray-900">
												{source.sourceName || "Source"}
											</strong>
										</div>

										{source.sourceLink && (
											<a
												target="_blank"
												rel="noopener noreferrer"
												href={source.sourceLink}
												className="bg-amber-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors text-sm whitespace-nowrap flex items-center justify-center"
											>
												Visit Source
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-4 w-4 ml-1"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
													/>
												</svg>
											</a>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				)}

			{/* Disclaimer Section */}
			{scheme.disclaimer && (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-900">Disclaimer</h2>
					<div className="rounded-xl bg-gray-50 p-2 md:p-6">
						{renderContent(scheme.disclaimer?.description, (desc) => (
							<p className="text-gray-700 leading-relaxed">{desc}</p>
						))}
					</div>
				</div>
			)}

			{/* List Category Section */}
			{scheme.listCategory && (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-900">
						List Category
					</h2>
					<div className="rounded-xl bg-gray-50 p-2 md:p-6">
						{Array.isArray(scheme.listCategory) ? (
							<>
								<h3 className="font-semibold text-lg text-gray-900 mb-3">
									Categories
								</h3>
								<ul className="list-disc pl-5 space-y-2 text-gray-700">
									{scheme.listCategory.map((category, index) => (
										<li key={index} className="leading-relaxed">
											{category || "Not Available"}
										</li>
									))}
								</ul>
							</>
						) : (
							<p className="text-gray-700 leading-relaxed">
								{scheme.listCategory}
							</p>
						)}
					</div>
				</div>
			)}
		</section>
	);
}
