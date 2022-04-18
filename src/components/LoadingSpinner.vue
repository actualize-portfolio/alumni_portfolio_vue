<template>
  <div v-if="active" class="text-center">
    <div class="spinner-grow mt-3" role="status"></div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
<script>
export default {
  name: "LoadingSpinner",
  props: {
    active: {
      type: Boolean,
      required: true,
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
