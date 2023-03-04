import { createRouter, createWebHistory } from "vue-router";
import jwt_decode from "jwt-decode";
import store from "@/store";

const LandingPage = () =>
  import(/* webpackChunkName: "landingPage" */ "@/views/LandingPage.vue");
const FavoriteBooks = () =>
  import(/* webpackChunkName: "favoriteBooks" */ "@/views/FavoriteBooks.vue");
const SunnySorter = () =>
  import(/* webpackChunkName: "sunnySorter" */ "@/views/SunnySorter.vue");
const RepoTracker = () =>
  import(/* webpackChunkName: "repoTracker" */ "@/views/RepoTracker.vue");
const LoginPage = () =>
  import(/* webpackChunkName: "loginPage" */ "@/views/LoginPage.vue");
const NewUser = () =>
  import(/* webpackChunkName: "newUser" */ "@/views/NewUser.vue");
const UnitConverter = () =>
  import(/* webpackChunkName: "pathNotFound" */ "@/views/UnitConverter.vue");
const PathNotFound = () =>
  import(/* webpackChunkName: "pathNotFound" */ "@/views/PathNotFound.vue");

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
    path: "/users/new",
    name: "NewUser",
    component: NewUser,
  },
  {
    path: "/books",
    name: "FavoriteBooks",
    component: FavoriteBooks,
    meta: { requiresAuth: true },
  },
  {
    path: "/sunny_sorter",
    name: "SunnySorter",
    component: SunnySorter,
    meta: { requiresAuth: true },
  },
  {
    path: "/repo_tracker",
    name: "RepoTracker",
    component: RepoTracker,
    meta: { requiresAuth: false },
  },
  {
    path: "/unit_converter",
    name: "UnitConverter",
    component: UnitConverter,
    meta: { requiresAuth: false },
  },
  { path: "/404", component: PathNotFound },
  { path: "/:pathMatch(.*)*", redirect: "/404" },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const jwt = store.state.sessions.jwt;

    if (!jwt || jwt_decode(jwt).exp < new Date() / 1000) {
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
