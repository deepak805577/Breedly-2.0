"use client";
import { useParams } from "next/navigation";
import { blogs } from "../../data/blogs";
import "../blog.css";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return <p style={{ padding: 40 }}>Blog not found</p>;

  return (
    <article className="blog-detail">
      <img src={blog.cover} alt={blog.title} className="cover" />

      <h1>{blog.title}</h1>
      <span className="readtime">{blog.readTime}</span>

      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: blog.content
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/\n/g, "<br />")
        }}
      />

      <div className="blog-cta">
        🐾 Explore dog breeds that match your lifestyle →
        <a href="/breeds"> Browse Breeds</a>
      </div>
    </article>
  );
}
