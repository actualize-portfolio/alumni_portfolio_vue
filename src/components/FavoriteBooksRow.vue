<template>
  <tr @click="toggleFavorite(book)">
    <!-- Font Awesome turns <i class /> elements into svg tags in the rendered DOM. -->
    <!-- Dynamic class names can't be used here on class="fas fa-star checked/unchecked" -->
    <td v-if="book.is_favorite"><i class="fas fa-star checked"></i></td>
    <td v-else><i class="fas fa-star unchecked"></i></td>
    <td>{{ book.title }}</td>
    <td>{{ book.author }}</td>
  </tr>
</template>
<script>
export default {
  name: "FavoriteBooksRow",
  props: {
    book: {
      required: true,
      type: Object,
    },
  },
  methods: {
    toggleFavorite(book) {
      if (book.is_favorite) {
        this.$store.dispatch("removeFavoriteBook", book);
      } else {
        this.$store.dispatch("setFavoriteBook", book);
      }
    },
  },
};
</script>
<style scoped>
.checked {
  color: orange;
}
.unchecked {
  color: black;
}
</style>
