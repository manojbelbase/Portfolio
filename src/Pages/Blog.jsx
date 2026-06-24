import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogData } from "../const/blogData";
import { IoSearchOutline } from "react-icons/io5";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "Blog - Manoj Belbase | Web Development Articles & Tutorials";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Explore high-quality web development articles, tutorials, React guides, backend clean architectures, and modern styling optimization by Manoj Belbase.');
  }, []);

  const categories = ["All", ...new Set(blogData.map((post) => post.category))];

  const filteredPosts = blogData.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold text-white">
            <span className="text-secondary">#</span>blog
          </h1>
          <div className="border w-[20%] border-secondary"></div>
        </div>
        <p className="text-gray-400 text-sm md:text-base">
          Sharing my learnings, industry insights, tutorials, and thoughts on building scalable web applications.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#1E2226] border border-gray-700 p-4 rounded-xl shadow-lg"
      >
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black border border-gray-600 rounded-lg px-4 py-2 pl-10 text-white focus:outline-none focus:border-secondary transition-all"
          />
          <IoSearchOutline className="absolute left-3 top-3 text-gray-400 text-lg" />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-secondary border-secondary text-black"
                  : "bg-black/50 border-gray-600 text-gray-300 hover:border-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-[#1E2226] border border-gray-700/80 rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="bg-black border border-gray-600 px-2.5 py-0.5 rounded-full text-secondary font-medium">
                    {post.category}
                  </span>
                  <div className="flex gap-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white leading-snug hover:text-secondary transition-colors duration-200">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-700/50 flex justify-end">
                <Link
                  to={`/blog/${post.id}`}
                  className="text-xs font-semibold text-secondary hover:text-white border border-secondary hover:bg-secondary hover:text-black transition-all duration-300 px-4 py-1.5 rounded-md"
                >
                  Read Article &rarr;
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No articles found matching your criteria.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Blog;
