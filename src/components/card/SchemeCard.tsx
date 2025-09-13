import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type SchemeCardProps = {
	imageUrl: string | StaticImageData;
	category: string;
	title: string;
	description: string;
	author: string;
	date: string;
	slug: string;
};

const SchemeCard = ({
	imageUrl,
	category,
	title,
	description,
	author,
	date,
	slug,
}: SchemeCardProps) => {
	return (
		<article className="w-full max-w-[924px] md:h-[250px] bg-[#F9F9F9] rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 mb-8">
			<Link
				href={`/schemes/${slug}`}
				className="flex flex-col md:flex-row h-full"
			>
				{/* Image Container - Fixed size on desktop, responsive on mobile */}
				<div className="w-full h-[200px] md:w-[308px] md:h-full relative flex-shrink-0">
					<Image
						src={imageUrl}
						alt={title}
						fill
						className="object-cover object-center"
						sizes="(max-width: 768px) 100vw, 308px"
						priority
					/>
				</div>

				{/* Content Container */}
				<div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
					<span className="inline-block text-xs px-3 py-1 rounded-2xl font-medium font-figtree bg-[#D8D417]/25 text-black uppercase mb-3">
						{category}
					</span>
					<h2 className="hover:text-blue-600 text-xl md:text-2xl font-figtree font-semibold text-[#212121] leading-tight mb-3">
						{title}
					</h2>
					<p className="text-[#525052] font-normal font-figtree text-base mb-4 line-clamp-2 md:line-clamp-3">
						{description}
					</p>
					<div className="flex items-center text-sm text-black font-figtree flex-wrap">
						<span className="mr-2">By {author}</span>
						<span className="hidden md:inline-block mx-2">|</span>
						<span>{date}</span>
					</div>
				</div>
			</Link>
		</article>
	);
};

export default SchemeCard;
