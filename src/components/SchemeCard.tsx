import Link from 'next/link';

interface SchemeCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  eligibility: string;
  benefits: string;
}

export default function SchemeCard({ id, title, category, description, eligibility, benefits }: SchemeCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" aria-labelledby={`scheme-title-${id}`}> 
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 id={`scheme-title-${id}`} className="text-xl font-semibold text-gray-900">{title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{category}</span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-1">Eligibility:</h4>
          <p className="text-gray-600 text-sm line-clamp-2">{eligibility}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-1">Benefits:</h4>
          <p className="text-gray-600 text-sm line-clamp-2">{benefits}</p>
        </div>
        <div className="mt-4">
          <Link 
            href={`/schemes/${id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
            aria-label={`View details for ${title}`}
          >
            View Details
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}