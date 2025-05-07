import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import { PortableText } from '@portabletext/react';

const News_Details = () => {
  const location = useLocation();
  const { item, list } = location.state || {};
  const [post, setPost] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom PortableText components to handle images
  const portableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;
        return (
          <div style={{ textAlign: 'center' }}>
          <img
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            alt={value.alt || 'Post image'}
            className="my-4 rounded-lg inline-block"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        );
      },
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && _id == $id][0] {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          body
        }`;
        const data = await client.fetch(query, { id: item._id });
        console.log('Fetched Post:', data);
        setPost(data);
        if (data?.mainImage) {
          setThumb(urlFor(data.mainImage).url());
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };

    const fetchRelatedNews = async () => {
      try {
        const query = `*[_type == "post" && _id != $id] | order(publishedAt desc) [0...5] {
          _id,
          title,
          slug,
          publishedAt,
          mainImage
        }`;
        const data = await client.fetch(query, { id: item._id });
        console.log('Related News:', data);
        setRelatedNews(data);
      } catch (err) {
        console.error('Error fetching related news:', err);
      }
    };

    if (item?._id) {
      fetchPost();
      fetchRelatedNews();
    }

    setLoading(false);
  }, [item]);

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(fbShareUrl, '_blank');
  };

  if (!item || !post) return <div className="text-center py-20">Không tìm thấy bài viết!</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="border-black-500 flex flex-col md:flex-row flex-grow px-4 pt-20 pb-4 mt-4">
        {/* Main Content */}
        <div className="bg-white shadow-lg rounded-lg md:w-[80%] w-full p-6 md:p-8 flex flex-col border">
          <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
          <p className="text-gray-500 mt-1 text-sm">
            🕒 Ngày đăng: {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          <hr className="my-3 border-gray-300" />

          {thumb && (
            <img
              src={thumb}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}

          <div className="prose max-w-none">
            {post.body ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-gray-500">Không có nội dung bài viết.</p>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={shareOnFacebook}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
            >
              Chia sẻ lên Facebook
            </button>
          </div>
        </div>

        {/* Related News */}
        <aside className="mt-6 md:mt-0 md:ml-6 md:w-[20%] w-full bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            📌 Tin tức liên quan
          </h3>

          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <ul className="space-y-4">
              {relatedNews.map((news) => (
                <li key={news._id} className="flex items-start gap-3">
                  {news.mainImage && (
                    <img
                      src={urlFor(news.mainImage).width(60).height(60).crop('center').url()}
                      alt={news.title}
                      className="w-14 h-14 object-cover rounded"
                    />
                  )}
                  <div>
                    <Link
                      to={`/tin-tuc/${news.slug.current}`}
                      state={{ item: news, list }}
                      className="text-blue-600 font-semibold hover:text-blue-800"
                    >
                      {news.title}
                    </Link>
                    <p className="text-xs text-gray-500">
                      {new Date(news.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
};

export default News_Details;