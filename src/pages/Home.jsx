import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllPosts } from "../api/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "asc";

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getAllPosts();
      setPosts(res.data.posts); 
    } catch (error) {
      alert("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sort === "desc") return b.title.localeCompare(a.title);
    return a.title.localeCompare(b.title);
  });

 

  return (
    <div className="container">
      <h1>All Blog Posts</h1>

      {loading ? (
        <p className="loadingText">Loading posts...</p>
      ) : (
        <div className="blogList">
          {sortedPosts.map((post) => (
            <div className="blogCard" key={post.id}>
              <h3>{post.title}</h3>
              <p className="desc">{post.body.slice(0, 90)}...</p>

              <div className="actions">
                <Link to={`/blog/${post.id}`}>
                  <button>View Details</button>
                </Link>

                <Link to={`/author/${post.userId}`}>
                  <button className="secondaryBtn">
                    View Author ({post.userId})
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
