export default function SchemeError({ error }: { error: string | null }) {
	return (
		<main className="max-w-7xl mx-auto px-4 py-8">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-red-600 mb-4">
					{error || "Scheme not found"}
				</h1>
				<p className="text-gray-600 mb-4">
					The scheme you&apos;re looking for doesn&apos;t exist or has been
					removed.
				</p>
				<button
					onClick={() => window.history.back()}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Go Back
				</button>
			</div>
		</main>
	);
}
