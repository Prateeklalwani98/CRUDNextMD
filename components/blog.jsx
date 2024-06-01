import axios from "axios";
import { useState, useEffect } from "react";
import DelBtn from "./delBtn";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/topics`
        );
        setBlogs(response.data.topics);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleEdit = async (id, field) => {
    const oldValue = blogs.find((blog) => blog._id === id)[field];
    const newValue = prompt(`Enter new ${field}:`, oldValue);
    if (!newValue || newValue === oldValue) return;
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,
        {
          [field]: newValue,
        }
      );
      const updatedBlog = response.data.topic;
      if (updatedBlog) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === id ? { ...blog, [field]: updatedBlog[field] } : blog
          )
        );
      } else {
        console.error("Updated blog data is missing or undefined");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="formContainer ">
        {blogs.map((blog) => (
          <div key={blog._id} className="card">
            <h2
              className="card-title"
              onClick={() => handleEdit(blog._id, "title")}
            >
              {blog.title}
            </h2>
            <p
              className="card-note"
              onClick={() => handleEdit(blog._id, "note")}
            >
              {blog.note}
            </p>
            <DelBtn id={blog._id} />
          </div>
        ))}
      </div>
    </>
  );
}
