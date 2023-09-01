import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLocalState } from "../hooks/useLocalStorage";
import { useUser } from "../hooks/useUser";
import { User } from "../interfaces/User";
import styled from "styled-components";
import HomePageCarousel from "../components/HomePageCarousel";
import "bootstrap/dist/css/bootstrap.css";

const InfoBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgb(250, 250, 250);
  padding: 20px;
  margin: 50px 0px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const InfoBox = styled.div`
  padding: 20px;
  border-radius: 8px;
  color: #000;
  border: solid rgb(200, 200, 200) 1px;
  text-align: center;
  flex: 1;
  margin: 0 10px;

  transition: background 0.2s ease-in-out; /* Adding a transition for smooth animation */

  &:hover {
    background: white;
  }

  img {
    max-height: 150px; /* Limit the image width to the container width */
    width: auto; /* Maintain aspect ratio */
  }
`;

const HomePage = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const { user, isLoading }: { user: User | null; isLoading: boolean } =
    useUser();

  if (isLoading) {
    // Render a loading indicator while user data is being fetched
    return <LoadingSpinner />;
  }

  return (
    <>
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to my website</h1>
          <p>Discover amazing content and connect with a vibrant community.</p>
        </div>
      </header>

      <InfoBoxContainer>
        <InfoBox>
          <img src="/images/mysql_logo.png" alt="MySQL Logo"></img>
          <h2>MySQL</h2>
          <p>
            Blogs often require structured data storage for content, user
            information, comments, and more. MySQL provides a well-defined
            structure through tables, columns, and relationships, making it easy
            to organize and manage blog data. MySQL's querying capabilities
            allow us to efficiently retrieve data based on specific criteria,
            such as fetching blog posts by date, author, category, or keyword.
            This is crucial for presenting relevant content to users.
          </p>
        </InfoBox>
        <InfoBox>
          <img src="/images/springboot_logo.png" alt="MySQL Logo"></img>
          <h2>Spring Boot Security</h2>
          <p>
            With Spring Boot Security, we can define authorization rules that
            control what actions users with different roles are allowed to
            perform. This is achieved through method-level security annotations
            and configuration. Spring Boot Security also simplifies user
            management by providing built-in support for user details, password
            encoding, and handling user roles and authorities.
          </p>
        </InfoBox>
        <InfoBox>
          <img src="/images/react_logo.png" alt="MySQL Logo"></img>
          <h2>React (Typescript)</h2>
          <p>
            React revolves around the concept of reusable components. A
            component is a self-contained, modular unit that encapsulates its
            own logic and UI. This approach promotes reusability,
            maintainability, and separation of concerns. TypeScript introduces
            static typing to JavaScript, allowing you to define types for
            variables, function parameters, return values, and more. This
            catches type-related errors at compile time, providing enhanced code
            quality and reducing runtime errors.
          </p>
        </InfoBox>
      </InfoBoxContainer>

      <div className="text-container">
        <h3>
          Read below to see what you can do on this website and learn what is possible once you are signed in!
        </h3>
      </div>

      <div className="carousel-container">
        <HomePageCarousel />
      </div>

      <div className="text-container">
        <h3>
          See the different user types below and find out what they can do.
        </h3>
      </div>

      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              User
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              The basic user can access the home and about page, as well as the
              articles page. They can click on any article and view the content,
              and, if signed in, can leave comments on articles. They cannot
              however create articles or access any further pages.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              Author
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="accordion-body">
              Like a user, an author can view articles and leave comments. They
              have the additional functionality of being able to create
              articles, and once created, these articles will be displayed on
              the articles page.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              Admin
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              Admins have full access to every page on the website, and are able
              to perform the same actions as any other user type. They can
              access the information of any user, and are responsible for the
              maintainence of the user profiles.
            </div>
          </div>
        </div>
      </div>

      <div className="text-container">
        <h3>
          Thank you for visiting my website, please take a look around and see what you can do!
        </h3>
      </div>
    </>
  );
};

export default HomePage;
