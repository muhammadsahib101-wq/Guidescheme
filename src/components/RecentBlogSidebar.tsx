import Image from 'next/image';
import Link from 'next/link';

type RecentBlogItemProps = {
  imageUrl: string;
  title: string;
  author: string;
  date: string;
  slug: string;
};

const RecentBlogItem = ({ imageUrl, title, author, date, slug }: RecentBlogItemProps) => {
  return (
    <li className="flex items-start mb-4">
      <div className="relative w-[101px] h-[86px] mr-3 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div>
        <h3 className="text-sm font-normal font-figtree text-black leading-tight mb-0.5">
          <Link href={`#${slug}`} className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm">
            {title}
          </Link>
        </h3>
        <p className="text-xs text-black">By {author}</p>
        <p className="text-xs text-black">{date}</p>
      </div>
    </li>
  );
};

const RecentBlogSidebar = ({ recentPosts }: { recentPosts: RecentBlogItemProps[] }) => {
  return (
    <aside className="bg-[#F9F9F9] pt-0 rounded-lg border border-gray-100" aria-labelledby="recent-blog-heading">
      <h2 id="recent-blog-heading" className="bg-darkyellow rounded-t-xl text-base font-extrabold text-black font-figtree mb-4 py-3 px-4 border-b border-gray-200">Recent Blog</h2>
      <div className='p-6'>
       
        <ul className="list-none p-0 m-0" aria-label="List of recent blog posts">
          {recentPosts.map((post) => (
            <RecentBlogItem
              key={post.slug}
              imageUrl={post.imageUrl}
              title={post.title}
              author={post.author}
              date={post.date}
              slug={post.slug}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RecentBlogSidebar;
