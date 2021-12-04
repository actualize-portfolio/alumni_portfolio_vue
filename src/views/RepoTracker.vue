<template>
  <ProjectInfo
    title="Github Tracker"
    description="Displays popularity data for a set of Github Repositories"
    :contributor="{ name: 'Jamie Gates', email: 'gatorjuice@gmail.com' }"
  />
  <div class="row">
    <div class="col-sm-6">
      <select
        v-model="category"
        class="form-select"
        aria-label="Category Select"
      >
        <option value="all" selected>Select Category...</option>
        <option
          v-for="category in $store.state.repoTracker.categories"
          :key="category"
          :value="category"
        >
          {{ formattedCategory(category) }}
        </option>
      </select>
    </div>
    <div class="col-sm-6">
      <select v-model="sortedBy" class="form-select" aria-label="Sort By">
        <option value="popularity_rating" selected>Popularity</option>
        <option value="forks_count">Forks</option>
        <option value="watchers_count">Watchers</option>
        <option value="stargazers_count">Stargazers</option>
      </select>
    </div>
  </div>
  <RepoTrackerChart
    v-if="filteredAndOrderedRepos.length"
    :repos="filteredAndOrderedRepos"
  />
  <RepoTrackerTable
    @change-sorted-by="handleChangeSortedBy"
    @toggle-order="handleToggleOrder"
    v-if="filteredAndOrderedRepos.length"
    :repos="filteredAndOrderedRepos"
  />
</template>
<script>
import ProjectInfo from "@/components/ProjectInfo.vue";
import RepoTrackerChart from "@/components/RepoTrackerChart.vue";
import RepoTrackerTable from "@/components/RepoTrackerTable.vue";
import textMixin from "@/mixins/textMixin.js";

export default {
  name: "RepoTracker",
  mixins: [textMixin],
  data() {
    return {
      category: "all",
      sortedBy: "popularity_rating",
      order: "dec",
    };
  },
  methods: {
    handleChangeSortedBy(sortedBy) {
      this.sortedBy = sortedBy;
    },
    handleToggleOrder() {
      if (this.order === "dec") {
        this.order = "asc";
      } else if (this.order === "asc") {
        this.order = "dec";
      } else {
        this.order = "dec";
      }
    },
    formattedCategory(category) {
      return category
        .split("_")
        .map((word) => this.$_textMixin_capitalizeWord(word))
        .join(" ");
    },
    filteredRepos(repos) {
      return repos.filter((repo) => {
        if (this.category !== "all") {
          return repo.category == this.category;
        } else {
          return true;
        }
      });
    },
    sortedRepos(repos) {
      return repos.sort((a, b) => {
        if (this.order === "dec") {
          return b[this.sortedBy] - a[this.sortedBy];
        } else if (this.order === "asc") {
          return a[this.sortedBy] - b[this.sortedBy];
        }
      });
    },
  },
  computed: {
    filteredAndOrderedRepos() {
      return this.sortedRepos(
        this.filteredRepos(this.$store.state.repoTracker.repos)
      );
    },
  },
  components: {
    ProjectInfo,
    RepoTrackerChart,
    RepoTrackerTable,
  },
  created() {
    this.$store.dispatch("clearRepos");
    this.$store.dispatch("loadRepos");
  },
};
</script>
<style scoped>
.form-select {
  margin-top: 1.5rem;
}
</style>
