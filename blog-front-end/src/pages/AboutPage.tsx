import React from "react";

const AboutPage = () => (
  <article className="about-page">
    <h1>About Me</h1>
    <p>
      Greetings! I'm Travis, a dedicated Software Developer with a passion for
      problem-solving and a penchant for crafting innovative solutions. With a
      solid foundation in Mathematics and German, I've nurtured a diverse skill
      set that has shaped me into a versatile and analytical professional.
    </p>
    <section>
      <h2>Education and Academic Exploration</h2>
      <p>
        My time at the University of Leeds was marked by a unique combination of
        studies - German & Mathematics. This seemingly disparate pairing allowed
        me to cultivate a diverse skill set, encompassing not only mathematical
        acumen but also proficiency in programming languages like Python, R, and
        C++. An enriching year at Ludwig-Maximilians-Universität München further
        expanded my horizons, enhancing my adaptability and broadening my
        academic foundation.
      </p>
      <p>
        For my dissertation, I studied the Boundary Element Method, which is a
        numerical method to solve linear partial differential equations which
        can be represented in boundary integral equations (as integrals). I used
        Python to solve two problems using the Boundary Element Method, one with
        Dirichlet boundary conditions (where the value of the function is
        specified on the boundary), and another with Robin boundary conditions
        (which is a linear combination of the values of the field and its
        derivatives on the boundary). A copy of my work can be found below.
      </p>
      <iframe src="/documents/BEM.pdf" width="100%" height="600px">
        <p>
          Your browser does not support PDF embedding. You can{" "}
          <a href="/documents/BEM.pdf">download the PDF here</a>.
        </p>
      </iframe>
    </section>
    <section>
      <h2>Entering Software Development</h2>
      <p>
        My journey into software development began when I found the perfect
        intersection between mathematics and programming. Undergoing rigorous
        training, I transitioned into a Full Stack Java Developer role, working
        within the Scrum framework. My contributions included everything from
        designing intricate APIs to modernizing user interfaces. It's been a
        journey of both personal growth and professional learning.
      </p>
      <p>
        From Java and Python to JavaScript/TypeScript, my skill set spans
        various programming languages. I'm well-versed in Spring Boot, React,
        UNIX, SQL, and Git. My agile approach to project management, inspired by
        the Scrum methodology, stems from a desire to ensure effective
        collaboration and tangible results.
      </p>
    </section>
  </article>
);

export default AboutPage;
