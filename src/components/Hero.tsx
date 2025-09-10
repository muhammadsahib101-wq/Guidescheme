import Link from 'next/link';

export default function Hero() {
  return (
     <section className="bg-gradient-to-br from-[#FFFFFF] via-[#BFF5D4] to-[#FFFFFF] py-28 md:py-38" aria-labelledby="hero-heading">
      <div className="max-w-7xl px-5 mx-auto text-left md:text-left">
        <h1 id="hero-heading" className="md:text-5xl text-3xl font-raleway font-semibold text-black leading-tight">
          Discover 1,000+ Govt <br className="hidden md:block" />
          Schemes for You.
        </h1>
        <p className="mt-4 text-black text-base md:text-lg max-w-md font-open-sans">
          Find schemes for agriculture, education, business, health, housing, and more — in your state and category.
        </p>
        <div className="mt-10 flex justify-start">
          <Link href='/schemes'
            className="bg-darkyellow cursor-pointer text-black font-medium py-3 font-figtree text-[16px] px-6 rounded-full transition focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            aria-label="Find My Scheme - Start searching for government schemes"
            tabIndex={0}
          >
            Find My Scheme
          </Link>
        </div>
      </div>
    </section>
  );
}