import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostsByUser } from "../api/api";

const Author = () => {
  const { authorId } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthorPosts = async () => {
    try {
      setLoading(true);
      const res = await getPostsByUser(authorId);
      setPosts(res.data.posts);
    } catch (error) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorPosts();
  }, [authorId]);

  return (
    <div className="container">
      <h1>Author Posts (User {authorId})</h1>

      {loading ? (
        <p className="loadingText">Loading author posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found for this author ❌</p>
      ) : (
        <div className="blogList">
          {posts.map((post) => (
            <div className="blogCard" key={post.id}>
              <h3>{post.title}</h3>
              <p className="desc">{post.body.slice(0, 90)}...</p>

              <Link to={`/blog/${post.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      <Link to="/">
        <button className="secondaryBtn">Back Home</button>
      </Link>
    </div>
  );
};

export default Author;
