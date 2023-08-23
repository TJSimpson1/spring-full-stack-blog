import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePageCarousel = () => {
  return (
    <div className="homepage-carousel">
      <Carousel showThumbs={false} autoPlay={true} interval={5000} infiniteLoop={true}>
        <div className="carousel-slide">
          <img src="/images/browse.jpg" alt="Image 1" height={800} />
          <div className="carousel-text">
            <h3>Browse Articles</h3>
            <p>
              Head to the articles page, where you can explore a diverse range
              of informative and engaging content. Navigating through our
              collection of articles is a seamless and enriching experience.
            </p>
          </div>
        </div>
        <div className="carousel-slide">
          <img src="/images/signin.jpg" alt="Image 2" height={800}/>
          <div className="carousel-text">
            <h3>Sign In</h3>
            <p>
              If you have an account, sign in and rest easy knowing that your
              details are stored securely. We prioritise the safety of your
              personal information and have taken every step to ensure that your
              details are stored with the utmost security.
            </p>
          </div>
        </div>
        <div className="carousel-slide">
          <img src="/images/engage.jpg" alt="Image 3" height={800}/>
          <div className="carousel-text">
            <h3>Get Involved</h3>
            <p>
              Once signed in, head back to our articles to leave likes and
              comments on articles that spark your interest. Share your
              thoughts, ask questions, and connect with fellow readers who share
              similar passions.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HomePageCarousel;
