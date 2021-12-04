<template>
  <ProjectInfo
    title="Favorite Books"
    :contributor="{ name: 'Jamie Gates', email: 'gatorjuice@gmail.com' }"
    description="Uses Vuex and a few backend calls to toggle some fake favorite books"
  />
  <h4>Favorites Count: {{ favoritesCount() }}</h4>
  <FavoriteBooksTable :books="books" />
</template>

<script>
import ProjectInfo from "@/components/ProjectInfo.vue";
import FavoriteBooksTable from "@/components/FavoriteBooksTable.vue";

export default {
  name: "Books",
  components: {
    ProjectInfo,
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
