<template>
  <ProjectInfo
    title="Favorite Books"
    :contributor="{ name: 'Jamie Gates', email: 'gatorjuice@gmail.com' }"
    description="Uses Vuex and a few backend calls to toggle some fake favorite books"
  />
  <!-- Can't show favorites count until pagination is finished -->
  <!-- <h4>Favorites Count: {{ favoritesCount() }}</h4> -->
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <router-link
          v-if="currentPage > 1"
          :to="`/books?page=${currentPage - 1}`"
          class="page-link"
          >Previous</router-link
        >
        <p v-else class="page-link disabled">Previous</p>
      </li>
      <li class="page-item">
        <router-link :to="`/books?page=${currentPage - 1}`" class="page-link">{{
          currentPage - 1
        }}</router-link>
      </li>
      <li class="page-item">
        <router-link :to="`/books?page=${currentPage}`" class="page-link">{{
          currentPage
        }}</router-link>
      </li>
      <li class="page-item">
        <router-link :to="`/books?page=${currentPage + 1}`" class="page-link">{{
          currentPage + 1
        }}</router-link>
      </li>
      <li class="page-item">
        <router-link :to="`/books?page=${currentPage + 1}`" class="page-link"
          >Next</router-link
        >
      </li>
    </ul>
  </nav>
  <FavoriteBooksTable :books="books" />
</template>

<script>
import ProjectInfo from "@/components/ProjectInfo.vue";
import FavoriteBooksTable from "@/components/FavoriteBooksTable.vue";

export default {
  name: "FavoriteBooks",
  components: {
    ProjectInfo,
    FavoriteBooksTable,
  },
  watch: {
    "$route.query.page"() {
      this.setCurrentPage(this.$route.query.page);
    },
  },
  data() {
    return {
      currentPage: 0,
    };
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
    setCurrentPage(page = 1) {
      this.currentPage = Number.parseInt(page);
      this.$store.dispatch("loadBooks", { page });
    },
  },
  created() {
    this.setCurrentPage(this.$route.query.page);
  },
};
</script>
<style scoped>
.disabled {
  color: grey;
}
</style>
