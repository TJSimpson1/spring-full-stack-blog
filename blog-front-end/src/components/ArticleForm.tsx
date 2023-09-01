import React, { useEffect, useState } from "react";
import { Article } from "../interfaces/Article";
import { User } from "../interfaces/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  min-height: 200px; /* Set a minimum height */
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; /* Allow vertical resizing */
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

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
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <FormLabel>Article Name:</FormLabel>
          <FormInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel>Title:</FormLabel>
          <FormInput
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel>Content:</FormLabel>
          <FormTextArea
            name="content"
            value={formData.content.join("\n")}
            onChange={handleChange}
          />
        </div>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ArticleForm;
