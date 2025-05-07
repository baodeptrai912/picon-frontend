import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { client } from '../lib/sanityClient';
import { ArrowLeft } from 'lucide-react';

const RecruitmentDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const query = `*[_type == "jobOpening" && slug.current == $slug][0] {
          _id,
          title,
          description,
          location
        }`;
        const data = await client.fetch(query, { slug });
        setJob(data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20">Đang tải...</div>;
  }

  if (!job) {
    return <div className="text-center py-20 text-red-500">Vị trí không tồn tại!</div>;
  }

  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <button
          className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>
        <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-semibold text-indigo-700 mb-4">{job.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-6 space-x-2">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{job.location}</span>
          </div>
          <div className="text-gray-700 leading-relaxed text-base md:text-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Mô tả công việc</h2>
            <p>{job.description}</p>
          </div>
          <button
            onClick={() => {
              navigate('/tuyen-dung', { state: { openModal: true, jobTitle: job.title } });
            }}
            className="mt-8 bg-indigo-600 text-white font-medium py-3 px-8 rounded-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ứng tuyển ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDetailsPage;
