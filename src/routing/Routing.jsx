import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import BlogDetails from "../pages/BlogDetails";
import Author from "../pages/Author";
import NotFound from "../pages/NotFound";

const Routing = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/author/:authorId" element={<Author />} />

        {/* ✅ Invalid routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
