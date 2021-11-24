import { v4 as uuidv4 } from "uuid";

const INITIALIZE = (state) => {
  state.storeReady = true;
};

const SET_TOKEN = (state, token) => {
  state.jwt = token;
};

const CREATE_FAVORITE_BOOK = (state, book) => {
  const index = state.favoriteBooks.books.findIndex((b) => b.id === book.id);

  if (index !== -1) {
    state.favoriteBooks.books[index].is_favorite = true;
  }

  state.favoriteBooks.books = [...state.favoriteBooks.books];
};

const DESTROY_FAVORITE_BOOK = (state, book) => {
  const index = state.favoriteBooks.books.findIndex((b) => b.id === book.id);

  if (index !== -1) {
    state.favoriteBooks.books[index].is_favorite = false;
  }

  state.favoriteBooks.books = [...state.favoriteBooks.books];
};

const SET_BOOKS = (state, books) => {
  state.favoriteBooks.books = books;
};

const SET_REPOS = (state, repos) => {
  state.repoTracker.repos = repos;
};

const SET_CATEGORIES = (state, categories) => {
  state.repoTracker.categories = categories;
};

const START_LOADING = (state) => {
  state.loading = true;
};

const STOP_LOADING = (state) => {
  state.loading = false;
};

const TOGGLE_API_VISUALIZER = (state) => {
  if (state.apiVisualizer.show) {
    state.apiVisualizer.apiRequests = [];
  }
  state.apiVisualizer.show = !state.apiVisualizer.show;
};

const ADD_API_REQUEST = (state, request) => {
  state.apiVisualizer.apiRequests = [
    {
      id: uuidv4(),
      url: request.url,
      status: request.status,
      response: request.response,
    },
    ...state.apiVisualizer.apiRequests,
  ];
};

export default {
  INITIALIZE,
  SET_TOKEN,
  SET_BOOKS,
  SET_REPOS,
  SET_CATEGORIES,
  CREATE_FAVORITE_BOOK,
  DESTROY_FAVORITE_BOOK,
  START_LOADING,
  STOP_LOADING,
  TOGGLE_API_VISUALIZER,
  ADD_API_REQUEST,
};
