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
          @click="$emit('changeSortedBy', 'stargazers_count')"
          class="text-end"
        >
          Stargazers
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
        <td class="text-end">{{ formatInteger(repo.forks_count) }}</td>
        <td class="text-end">{{ formatInteger(repo.stargazers_count) }}</td>
        <td class="text-end">{{ formatInteger(repo.watchers_count) }}</td>
        <td class="text-end">{{ formatInteger(repo.popularity_rating) }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "RepoTrackerTable",
  props: {
    repos: {
      type: Array,
    },
  },
  methods: {
    formatInteger(integer) {
      return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style scoped></style>
