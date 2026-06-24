import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { blogData } from "../const/blogData";
import { IoArrowBackOutline } from "react-icons/io5";
import { parseAiResponseToHtml } from "ai-response-parser";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogData.find((item) => item.id === id);

  const parsedContent = useMemo(() => {
    if (!post) return "";
    return parseAiResponseToHtml(post.content);
  }, [post]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Manoj Belbase`;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', post.summary);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold text-white">Article not found</h2>
        <p className="text-gray-400">The blog post you are looking for does not exist.</p>
        <Link
          to="/blog"
          className="bg-secondary text-black font-semibold px-6 py-2 rounded-lg hover:bg-white transition-colors duration-200"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const recommendations = blogData
    .filter((item) => item.id !== post.id)
    .slice(0, 2);

  return (
    <div className="max-w-[850px] mx-auto min-h-screen pb-16">
      <div className="mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-secondary transition-colors"
        >
          <IoArrowBackOutline className="text-base" />
          <span>Back to Articles</span>
        </Link>
      </div>

      <article>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4">
          <span className="bg-secondary/15 text-secondary px-3 py-1 rounded-full font-medium border border-secondary/20">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-8">
          {post.title}
        </h1>

        <div className="h-[1px] bg-gray-800 w-full mb-8"></div>

        <div
          className="blog-content font-sans"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      </article>

      <div className="mt-16 bg-[#1E2226] border border-gray-700 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-secondary">
          <img
            src="/src/assets/profile.webp"
            alt="Manoj Belbase"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://placehold.co/150x150/black/white?text=MB";
            }}
          />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-white mb-1">Manoj Belbase</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Full Stack Developer specializing in responsive design systems, backend architecture, and optimized single-page web experiences.
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-gray-800 pt-12">
        <h3 className="text-xl font-bold text-white mb-6">You Might Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="bg-[#1E2226] border border-gray-700/80 hover:border-secondary/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-secondary font-medium tracking-wider uppercase">
                  {item.category}
                </span>
                <h4 className="font-bold text-white text-base mt-2 line-clamp-2 hover:text-secondary transition-colors">
                  <Link to={`/blog/${item.id}`}>{item.title}</Link>
                </h4>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>
              <Link
                to={`/blog/${item.id}`}
                className="text-xs font-semibold text-secondary hover:text-white mt-4 inline-block"
              >
                Read Article &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
