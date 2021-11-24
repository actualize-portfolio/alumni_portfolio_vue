<template>
  <h3>Favorite Books</h3>
  <p>
    This was one of the first elements of this project. A trial of simple
    toggling and conditonal templating. It was also the first use of Vuex for a
    central store, which is now used throughout the app.
  </p>
  <h4>Favorites Count: {{ favoritesCount() }}</h4>
  <FavoriteBooksTable :books="books" />
</template>

<script>
import FavoriteBooksTable from "@/components/FavoriteBooksTable.vue";

export default {
  name: "Books",
  components: {
    FavoriteBooksTable,
  },
  computed: {
    books() {
      return this.$store.state.favoriteBooks.books;
    },
  },
  methods: {
    favoritesCount() {
      return this.books.filter((book) => book.is_favorite).length;
    },
  },
  created() {
    this.$store.dispatch("loadBooks");
  },
};
</script>
<style scoped></style>
