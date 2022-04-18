<template>
  <button type="submit" :disabled="disabled" :class="bootstrapClasses">
    {{ text }}
  </button>
</template>
<script>
export default {
  name: "SubmitButton",
  props: {
    disabled: {
      type: Boolean,
      required: false,
    },
    bootstrapClasses: {
      type: Array,
      required: false,
    },
    fixedText: {
      type: String,
      required: true,
    },
    loadingText: {
      type: String,
      required: false,
    },
  },
  computed: {
    text() {
      const isLoading = this.$store.state.loading && this.loadingText;

      return isLoading ? this.loadingText : this.fixedText;
    },
  },
};
</script>
<style scoped>
button {
  margin: 5px;
}
</style>
