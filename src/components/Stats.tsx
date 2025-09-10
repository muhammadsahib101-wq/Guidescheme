
import Image from 'next/image';
import Icon from '../app/assets/stats/icon1.png';

export default function Stats() {
const stats = [
  {
    icon: Icon,
    number: '1,000+',
    label: 'Govt Schemes Listed',
  },
  {
   icon: Icon,
    number: '20+',
    label: 'Categories Covered',
  },
  {
    icon: Icon,
    number: '1 Million+',
    label: 'Citizens Guided',
  },
  {
    icon: Icon,
    number: '100%',
    label: 'Verified Information',
  },
];
  return (
     <section className="bg-[#FEFCD6] py-12 px-4" aria-labelledby="stats-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="stats-heading" className="text-2xl md:text-4xl font-semibold font-raleway text-black mb-8 text-center">Our Impact in Numbers</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center" aria-label="Key statistics">
          {stats.map((item, idx) => (
            <li key={idx} className="flex flex-row md:flex-col items-center justify-center">
              <Image src={item.icon} alt={item.label} width={48} height={48} />
              <div className="flex flex-col text-left md:text-center md:mt-3 mt-0 ml-4 md:ml-0">
                <span className="text-4xl font-semibold font-raleway text-black">{item.number}</span>
                <span className="text-black mt-1 font-figtree text-md">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}