import React, { useEffect, useState } from "react";
import { Article } from "../interfaces/Article";
import { User } from "../interfaces/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

interface ArticleFormProps {
  article: Article;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article }) => {
  const { user, isLoading }: { user: User | null; isLoading: boolean } =
  useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Article>(article);

  useEffect(() => {
    if (!isLoading) {
      setFormData((prevData) => ({
        ...prevData,
        author: user,
      }));
    }
  }, [isLoading, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "content") {
      const contentArray = value.split("\n");
      setFormData((prevData) => ({
        ...prevData,
        [name]: contentArray,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/articles", formData)
    .then(() => {
        navigate("/articles")
    })
    .catch(error => {
        console.error("Could not create article", error)
    })
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label>Content:</label>
        <textarea name="content" value={formData.content.join("\n")} onChange={handleChange}></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ArticleForm;
