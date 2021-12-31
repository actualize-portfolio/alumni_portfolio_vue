<template>
  <div v-if="loading" class="text-center">
    <div class="spinner-grow mt-3" role="status"></div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
<script>
export default {
  name: "LoadingSpinner",
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>
<style>
.spinner-grow {
  width: 3rem;
  height: 3rem;
  color: #bd5d38;
}
</style>
