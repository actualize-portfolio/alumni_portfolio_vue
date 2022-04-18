<template>
  <h1 class="mb-0">{{ title }}</h1>
  <p class="lead mb-2">{{ description }}</p>
  <div class="subheading mb-3">
    <a :href="`mailto:${contributor.email}`">{{ contributor.name }}</a>
  </div>
</template>
<script>
export default {
  name: "ProjectInfo",
  props: {
    title: {
      type: String,
      required: true,
    },
    contributor: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
<style></style>
