<template>
  <div class="alert alert-danger" role="alert">
    <strong>{{ error.$validator }}</strong>
    <small> on property </small>
    <strong>{{ error.$property }}: {{ error.$message }}</strong>
  </div>
</template>
<script>
export default {
  name: "VuelidateError",
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped></style>
