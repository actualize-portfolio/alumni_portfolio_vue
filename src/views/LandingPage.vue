<template>
  <section class="resume-section" id="about">
    <div class="resume-section-content">
      <h1 class="mb-0">
        Alumni
        <span class="text-primary">Portfolio</span>
      </h1>
      <div class="subheading mb-3">
        Actualize Coding Bootcamp
        <a target="_blank" href="https://anyonecanlearntocode.com/">Learn More</a>
      </div>
      <h2 class="mb-2">Project Overview</h2>
      <p class="lead mb-3">
        This web application is the user-facing end of a project created by
        myself, aimed at giving newer developers a learning experience about
        some of the processes and conventions they may encounter at their first
        companies while not being too overwhelming in its source code. It's
        meant to be somewhat opinionated about style, testing, and developer
        workflow, focusing on simple concepts and top-notch execution over any
        single triumphant "idea for an app".
      </p>
      <p class="lead mb-3">
        Developers that contribute to this project are exposed to several key
        concepts in preparation for professional onboarding. They will attribute
        development time to stories, follow foundational Git practices, write
        quality code and accompanying tests, elicit peer review, shepherd their
        code all the way through CI-CD, and treat the application as a
        first-class product. As an additional benefit of their participation,
        developers will be able to contribute personal single-page application
        snippets that showcase their talents while also demonstrating their
        adherence to team development and stewardship of a high-quality code
        base.
      </p>
      <p class="lead mb-0">Jamie Gates</p>
      <small
        >Creator, Senior Technical Lead,
        <span class="text-primary">Actualize Alumn</span></small
      >
      <div
        class="d-flex flex-column flex-md-row justify-content-between mb-5"
      ></div>
      <p class="lead mb-3"></p>
      <div class="flex-grow-1">
        <h3 class="mb-0">Front End</h3>
        <div class="subheading mb-3">
          <a target="_blank"
            class="social-icon"
            href="https://v3.vuejs.org/guide/introduction.html"
            >Vue.js<i class="fab fa-vuejs"></i
          ></a>
        </div>
        <p class="lead mb-3">
          The client side runs on Vue.js 3. It utilizes Vuex for state
          management and Vue Router for navigation. The usage of Vue is a
          reflection of my recently discovered love of the framework itself.
          Having mainly been a back end engineer since I began, I needed an
          approachable solution for the front end. Vue has given me just that.
        </p>
        <p class="lead mb-3">
          Please click on the navigation items to see contributions to the
          project.
        </p>
      </div>
      <div class="flex-shrink-0">
        <span class="text-primary"
          ><a target="_blank" href="https://github.com/actualize-portfolio/alumni_portfolio_vue"
            >See project on Github</a
          ></span
        >
      </div>
      <div
        class="d-flex flex-column flex-md-row justify-content-between mb-5"
      ></div>
      <div class="flex-grow-1">
        <h3 class="mb-0">Back End</h3>
        <div class="subheading mb-3">
          <a target="_blank" href="https://rubyonrails.org/">Ruby on Rails</a>
        </div>
        <p class="lead mb-3">
          The server side is Rails version 6 running in API mode with a Postgres
          database and a Sidekiq sidecar for asynchronous tasks. It uses a
          service object interactor pattern and employs some basic
          authentication with Bcrypt. It is hosted on Heroku.com at
          <span
            ><strong>https://alumni-portfolio-api.herokuapp.com/</strong></span
          >
        </p>
      </div>
      <div class="flex-shrink-0">
        <span class="text-primary"
          ><a target="_blank" href="https://github.com/actualize-portfolio/alumni_portfolio_api"
            >See project on Github</a
          ></span
        >
      </div>
      <div
        class="d-flex flex-column flex-md-row justify-content-between mb-5"
      ></div>
      <div class="social-icons">
        <a class="social-icon" href="https://github.com/actualize-portfolio"
          ><i class="fab fa-github"></i
        ></a>
        <a
          class="social-icon"
          href="https://www.linkedin.com/school/actualize-coding-bootcamp/mycompany/"
          ><i class="fab fa-linkedin"></i
        ></a>
      </div>
    </div>
  </section>
</template>
<script></script>
<style scoped>
body {
  padding-top: 3.5rem;
}

.jumbotron {
  background-color: #e9ecef;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}
</style>
