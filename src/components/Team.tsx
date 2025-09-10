import Image, { StaticImageData } from 'next/image';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string | StaticImageData;
  alt: string;
  description: string;
  skills: string[];
}

function TeamMember({ name, image, alt, description, skills }: TeamMemberProps) {
  return (
    <div className="group bg-gradient-to-br from-white to-white/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      <div className="relative">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={image}
            alt={alt}
            width={400}
            height={320}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw" // Optimize for responsive layouts
          />

         
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`} // Use skill in key for uniqueness
                className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;