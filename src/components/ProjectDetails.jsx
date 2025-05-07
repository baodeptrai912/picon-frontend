import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, MapPin, Hourglass, Calendar } from 'lucide-react';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  // 🔽 Add this to render images inside project.body
  const portableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;
        return (
          <div style={{ textAlign: 'center' }}>
            <img
              src={urlFor(value).width(800).fit('max').auto('format').url()}
              alt={value.alt || 'Project image'}
              className="my-4 rounded-lg inline-block"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        );
      },
    },
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const query = `*[_type == "project" && slug.current == $slug][0] {
          _id,
          name,
          location,
          status,
          startDate,
          image,
          body
        }`;
        const data = await client.fetch(query, { slug });
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
      }
    };
    fetchProject();
  }, [slug]);

  if (!project) return <h2 className="text-center text-red-500 text-2xl font-semibold">Dự án không tồn tại!</h2>;

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <button
        className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5" />
        Quay lại
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.name}</h1>
      {project.image && (
        <img
          src={urlFor(project.image).url()}
          alt={project.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}
      <div className="mt-4 text-lg text-gray-700">
        <p className="flex items-center space-x-2">
          <MapPin size={16} />
          <strong>Vị trí:</strong> <span>{project.location}</span>
        </p>
        <p className="flex items-center space-x-2">
          <Hourglass size={16} />
          <strong>Trạng thái:</strong> <span>{project.status}</span>
        </p>
        <p className="flex items-center space-x-2">
          <Calendar size={16} />
          <strong>Ngày khởi công:</strong> <span>{project.startDate}</span>
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chi tiết dự án</h2>
        {/* ✅ Pass custom components to PortableText */}
        <PortableText value={project.body} components={portableTextComponents} />
      </div>
    </div>
  );
};

export default ProjectDetail;
