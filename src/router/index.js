import { createRouter, createWebHistory } from "vue-router";
import { decode } from "jsonwebtoken";

const LandingPage = () =>
  import(/* webpackChunkName: "landingPage" */ "@/views/LandingPage.vue");
const FavoriteBooks = () =>
  import(/* webpackChunkName: "favoriteBooks" */ "@/views/FavoriteBooks.vue");
const RepoTracker = () =>
  import(/* webpackChunkName: "repoTracker" */ "@/views/RepoTracker.vue");
const LoginPage = () =>
  import(/* webpackChunkName: "loginPage" */ "@/views/LoginPage.vue");

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/books",
    name: "FavoriteBooks",
    component: FavoriteBooks,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/repo_tracker",
    name: "RepoTracker",
    component: RepoTracker,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const jwt = JSON.parse(localStorage.getItem("vuex"))["jwt"];
    const decodedJwt = decode(jwt);

    if (!jwt) {
      next({
        name: "LoginPage",
        query: {
          nextUrl: to.fullPath,
        },
      });
    } else if (decodedJwt.exp < new Date() / 1000) {
      next({
        name: "LoginPage",
        query: {
          nextUrl: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
