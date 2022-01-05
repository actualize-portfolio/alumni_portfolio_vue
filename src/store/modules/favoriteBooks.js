import HttpService from "@/services/HttpService";

const favoriteBooks = {
  state() {
    return {
      books: [],
    };
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
    createFavoriteBook(state, book) {
      const index = state.books.findIndex((b) => b.id === book.id);

      if (index !== -1) {
        state.books[index].is_favorite = true;
      }

      state.books = [...state.books];
    },
    destroyFavoriteBook(state, book) {
      const index = state.books.findIndex((b) => b.id === book.id);

      if (index !== -1) {
        state.books[index].is_favorite = false;
      }

      state.books = [...state.books];
    },
  },
  actions: {
    loadBooks({ commit }, { page }) {
      commit("startLoading");
      HttpService.get("books", { page })
        .then((response) => {
          commit("setBooks", response.data);
        })
        .finally(() => {
          commit("stopLoading");
        });
    },
    removeFavoriteBook({ commit }, book) {
      commit("destroyFavoriteBook", book);
      HttpService.delete(`/user_books/${book.id}`).catch(() => {
        commit("createFavoriteBook", book);
      });
    },
    setFavoriteBook({ commit }, book) {
      commit("createFavoriteBook", book);
      HttpService.post("/user_books", { book_id: book.id }).catch(() => {
        commit("destroyFavoriteBook", book);
      });
    },
  },
};

export default favoriteBooks;
