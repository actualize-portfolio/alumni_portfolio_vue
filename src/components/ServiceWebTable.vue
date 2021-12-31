<template>
  <table class="table table-striped table-sm">
    <thead>
      <tr>
        <th scope="col" @click="$emit('toggleOrder')">Type</th>
      </tr>
    </thead>
    <tbody>
      <tr></tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "ServiceWebTable",
  props: {},
};
</script>
<style></style>
