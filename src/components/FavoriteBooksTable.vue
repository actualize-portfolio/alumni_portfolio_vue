<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col"><i class="fas fa-star unchecked"></i></th>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
      </tr>
    </thead>
    <tbody>
      <FavoriteBooksRow
        v-for="book in books"
        :book="book"
        :key="book.id"
        :data-test="`book${book.id}`"
      />
    </tbody>
  </table>
</template>
<script>
import FavoriteBooksRow from "@/components/FavoriteBooksRow";

export default {
  name: "BooksTable",
  components: { FavoriteBooksRow },
  props: {
    books: {
      type: Array,
      required: false,
    },
  },
};
</script>
