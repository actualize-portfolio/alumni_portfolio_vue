<template>
  <table class="table table-striped table-sm">
    <thead>
      <tr>
        <th scope="col" @click="$emit('toggleOrder')">Project</th>
        <th
          scope="col"
          @click="$emit('changeSortedBy', 'forks_count')"
          class="text-end"
        >
          Forks
        </th>
        <th
          scope="col"
          @click="$emit('changeSortedBy', 'watchers_count')"
          class="text-end"
        >
          Watchers
        </th>
        <th
          scope="col"
          @click="$emit('changeSortedBy', 'popularity_rating')"
          class="text-end"
        >
          Popularity
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="repo in repos" :key="repo.id" :data-test="`repo${repo.id}`">
        <td>{{ repo.name }}</td>
        <td class="text-end">
          {{ $_textMixin_formatNumber(repo.forks_count) }}
        </td>
        <td class="text-end">
          {{ $_textMixin_formatNumber(repo.watchers_count) }}
        </td>
        <td class="text-end">
          {{ $_textMixin_formatNumber(repo.popularity_rating) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import textMixin from "@/mixins/textMixin.js";

export default {
  name: "RepoTrackerTable",
  mixins: [textMixin],
  props: {
    repos: {
      type: Array,
    },
  },
};
</script>
<style scoped></style>
