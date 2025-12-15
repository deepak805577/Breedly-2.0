"use client";
import { useState } from "react";
import Link from "next/link";
import { blogs } from "../data/blogs";
import "./blog.css";

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");

  // Collect unique tags
  const tags = ["All", ...new Set(blogs.flatMap(b => b.tags))];

  const filteredBlogs =
    activeTag === "All"
      ? blogs
      : blogs.filter(blog => blog.tags.includes(activeTag));

  return (
    <main className="blog-page">
      <h1>📖 BreedLy Blog</h1>
      <p className="subtitle">
        Practical dog adoption & care guides. No fluff. No fear.
      </p>

      {/* TAG FILTER */}
      <div className="tag-bar">
        {tags.map(tag => (
          <button
            key={tag}
            className={`tag ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* BLOG GRID */}
      <div className="blog-grid">
        {filteredBlogs.map(blog => (
          <Link
            href={`/blog/${blog.slug}`}
            key={blog.slug}
            className="blog-card"
          >
            <img src={blog.cover} alt={blog.title} />
            <div className="blog-content">
              <span>{blog.readTime}</span>
              <h2>{blog.title}</h2>
              <p>{blog.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <p className="empty">No blogs under this tag yet 🐾</p>
      )}
    </main>
  );
}
