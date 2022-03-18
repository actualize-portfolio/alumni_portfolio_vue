<template>
  <ProjectInfo
    title="Sunny Sorter"
    :contributor="{ name: 'Jamie Gates', email: 'gatorjuice@gmail.com' }"
    description="Tabulates the best episodes of Sunny"
  />
  <div class="row">
    <div
      v-for="episode in $store.state.sunnySorter.episodes"
      :key="episode.id"
      class="col"
    >
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ episode.title }}</h5>
          <p class="card-text">S{{ episode.season }}, E{{ episode.episode }}</p>
          <p>Aired: {{ episode.airdate }}</p>
          <p><a :href="episode.tvmaze_link" target="_blank">info</a></p>
          <button @click="vote(episode.id)" class="btn btn-primary">
            This One's Better
          </button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h3>Current Rankings</h3>
    <ol>
      <li v-for="episode in $store.state.sunnySorter.topTen" :key="episode.id">
        {{ episode.title }}
      </li>
    </ol>
  </div>
</template>

<script>
import ProjectInfo from "@/components/ProjectInfo";
export default {
  name: "SunnySorter",
  components: {
    ProjectInfo,
  },
  methods: {
    getSunnyEpisodes() {
      this.$store.dispatch("getSunnyEpisodes");
    },
    getTopTenEpisodes() {
      this.$store.dispatch("getTopTenEpisodes");
    },
    vote(id) {
      const betterEpisodeId = id;
      const worseEpisode = this.$store.state.sunnySorter.episodes.filter(
        (episode) => episode.id != id
      );
      this.$store.dispatch("vote", {
        better_id: betterEpisodeId,
        worse_id: worseEpisode[0].id,
      });
      this.getSunnyEpisodes();
    },
  },
  created() {
    this.getSunnyEpisodes();
    this.getTopTenEpisodes();
  },
};
</script>
<style scoped></style>
