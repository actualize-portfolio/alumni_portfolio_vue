import { createRouter, createWebHistory } from "vue-router";
import { decode } from "jsonwebtoken";
import store from "@/store";

const LandingPage = () =>
  import(/* webpackChunkName: "landingPage" */ "@/views/LandingPage.vue");
const FavoriteBooks = () =>
  import(/* webpackChunkName: "favoriteBooks" */ "@/views/FavoriteBooks.vue");
const ServiceWeb = () =>
  import(/* webpackChunkName: "serviceWeb" */ "@/views/ServiceWeb.vue");
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
    path: "/service_web",
    name: "ServiceWeb",
    component: ServiceWeb,
    meta: { requiresAuth: false },
  },
  {
    path: "/books",
    name: "FavoriteBooks",
    component: FavoriteBooks,
    meta: { requiresAuth: true },
  },
  {
    path: "/repo_tracker",
    name: "RepoTracker",
    component: RepoTracker,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const jwt = store.state.jwt;

    if (!jwt || decode(jwt).exp < new Date() / 1000) {
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
