import { ApiScheme } from "@/services/allService";
import Image from "next/image";

export default function SchemeHeader({
  scheme,
  formatDate,
}: {
  scheme: ApiScheme;
  formatDate: (dateString: string) => string;
}) {
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center bg-white w-full">
          {scheme.bannerImage?.url && (
            <div className="relative w-full aspect-[4/1]">
              <Image
                src={scheme.bannerImage.url}
                alt={scheme.schemeTitle}
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto p-4 pt-8">
        <h1 className="text-4xl font-semibold font-figtree text-[#212121] text-left mb-4">
          {scheme.schemeTitle}
        </h1>

        <div className="flex md:flex-row flex-col items-center justify-between mb-6">
          <div className="flex items-center w-full md:w-[60%]">
            <div className="w-10 h-10 rounded-full mr-2 bg-gray-300 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-base text-black font-bold font-figtree">
                  Author:
                </p>
                <p className="text-base text-black font-normal">
                  By {scheme.author.name}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-500">Published on</p>
                <p className="text-base text-gray-500">
                  {formatDate(scheme.publishedOn)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-start md:justify-end space-x-4 mt-5 md:mt-0 w-full md:w-[40%]">
            <h6 className="text-black text-base font-figtree font-semibold">
              Share this post
            </h6>
            <button className="text-gray-600 hover:text-gray-800">
              <span className="sr-only">Share</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7l-7.05 4.11c-.54-.5-1.25-.81-2.04-.81-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.04.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.24c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 12.24h-3v-5.5c0-1.25-.025-2.86-1.74-2.86-1.74 0-2.01 1.36-2.01 2.77v5.59h-3v-11h2.88v1.53h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v6.44z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
