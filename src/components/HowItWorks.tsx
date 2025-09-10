import Image from 'next/image';
import Logo from '../app/assets/Govt Scheme Guide photo.jpg';
import Link from 'next/link';
export default function HowItWorks({ className }: {className: string}) {
  return (
    <section className={`pb-12 bg-white" aria-labelledby="how-it-works-heading ` + className}>
      <div className="max-w-7xl px-5 mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
        {/* Image Section */}
        <figure className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md" aria-label="How Govt Schemes India works illustration">
          <Image
            src={Logo}
            alt="Illustration showing support for government schemes in India"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
          <figcaption className="sr-only">About Us – GovtSchemeGuide.com</figcaption>
        </figure>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-start">
          <h2 id="how-it-works-heading" className="text-2xl md:text-4xl font-semibold font-raleway text-black mb-4">
            About Us – GovtSchemeGuide.com
          </h2>
          <p className="text-black mb-4 font-figtree">
           Searching for government schemes to make your life easier? GovtSchemeGuide.com is the perfect destination for you. We provide accurate information about government schemes from trusted sources. We help users apply for the schemes according to the eligibility criteria to help them improve their quality of life.  
          </p>

          <Link href="/about" className="bg-darkyellow cursor-pointer text-black font-medium py-3 font-figtree text-[16px] px-6 rounded-full transition focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2" aria-label="Learn more about Govt Schemes India" tabIndex={0}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}