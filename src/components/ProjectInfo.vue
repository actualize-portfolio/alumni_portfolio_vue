<template>
  <h1 class="mb-0">
    {{ title.split(" ")[0] }}
    <span class="text-primary">{{ title.split(" ")[1] }}</span>
  </h1>
  <p class="lead mb-2">{{ description }}</p>
  <div class="subheading mb-3">
    {{ contributor.name }}
    <a :href="`mailto:${contributor.email}`">email</a>
  </div>
</template>
<script>
export default {
  name: "ProjectInfo",
  props: {
    title: {
      type: String,
      required: true,
      validator(value) {
        return value.split(" ").length == 2;
      },
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
