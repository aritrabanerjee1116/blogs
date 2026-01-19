import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../api/api";

const BlogDetails = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await getPostById(id);
      setPost(res.data);
    } catch (error) {
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <p className="loadingText">Loading blog...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <h2>Blog Not Found ❌</h2>
        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p className="desc">{post.body}</p>

      <div className="tagBox">
        {post.tags?.map((tag, i) => (
          <span key={i} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="actions">
        <Link to={`/author/${post.userId}`}>
          <button>View Author Posts</button>
        </Link>

        <Link to="/">
          <button className="secondaryBtn">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
