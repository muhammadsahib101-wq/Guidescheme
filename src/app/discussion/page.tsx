export default function DiscussionPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 px-4">
			{/* Animated Icon */}
			<div className="text-6xl mb-6 animate-pulse">🚧</div>

			{/* Title */}
			<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
				Discussion Forum
			</h1>

			{/* Subtitle */}
			<p className="text-lg md:text-xl text-gray-700 mb-8 text-center">
				This page is under construction 🚀 <br />
				We are working hard, it will be available soon!
			</p>

			{/* Animated Dots */}
			<div className="flex space-x-2">
				<span className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></span>
				<span className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
				<span className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
			</div>

			{/* Footer small note */}
			<p className="mt-10 text-sm text-gray-500 italic">
				Stay tuned! Exciting discussions are coming soon ✨
			</p>
		</div>
	);
}
