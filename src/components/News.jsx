import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import { Mail, Phone, MapPin,} from "lucide-react"
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          author->{
            name
          },
          body
        }`;
        const data = await client.fetch(query);
        console.log('Sanity Data:', data); // Log to verify data
        setNewsItems(data);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };
    fetchNews();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow max-w-6xl mx-auto p-4">
        <header className="text-center py-20">
          <h1 className="text-4xl font-bold">Chuyên mục tin tức</h1>
          <p className="text-gray-600 mt-6">
            Cập nhật những tin tức mới nhất từ công ty chúng tôi
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-1">
          {currentItems.map((item) => (
            <article
              key={item._id}
              className="border border-cyan-500 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow p-4 h-64 flex flex-col justify-between hover:bg-gray-100"
            >
              {item.mainImage && (
                <img
                  src={urlFor(item.mainImage).url()}
                  alt={item.title}
                  className="w-full h-48 object-cover mb-4 max-h-40"
                />
              )}
              <div className="flex flex-col flex-grow">
                <Link to={`/tin-tuc/${item.slug.current}`} state={{ item, list: newsItems }}>
                  <h3 className="text-sm font-semibold cursor-pointer hover:text-cyan-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                <div className="mt-auto">
                  <p className="text-sm text-gray-500">
                    Ngày đăng: {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Pagination */}
        <nav className="mt-8 flex justify-center">
          <ul className="inline-flex items-center gap-3">
            {[...Array(Math.ceil(newsItems.length / itemsPerPage)).keys()].map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-1 border rounded-[10px] p-4 ${
                    currentPage === number + 1
                      ? 'bg-blue-200'
                      : 'bg-white hover:bg-cyan-100 hover:scale-110 transition-transform duration-300'
                  }`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(newsItems.length / itemsPerPage)}
                className={`text-center px-3 py-1 border rounded-[10px] p-4 ${
                  currentPage === Math.ceil(newsItems.length / itemsPerPage)
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-white hover:bg-cyan-100 hover:scale-110 transition-transform duration-300'
                }`}
              >
                ➤
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default News;