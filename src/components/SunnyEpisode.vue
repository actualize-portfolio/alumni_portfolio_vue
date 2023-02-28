<template>
  <div class="card" @click="vote(episode.id)">
    <div class="card-body">
      <h6 class="card-title">{{ episode.title }}</h6>
      <p class="card-text">S{{ episode.season }}, E{{ episode.episode }}</p>
      <p>Aired: {{ episode.airdate }}</p>
      <p><a :href="episode.tvmaze_link" target="_blank">info</a></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "SunnyEpisode",
  props: {
    episode: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async vote(id) {
      const betterEpisodeId = id;
      const worseEpisode = this.$store.state.sunnySorter.episodes.filter(
        (episode) => episode.id != id
      );
      await this.$store.dispatch("vote", {
        better_id: betterEpisodeId,
        worse_id: worseEpisode[0].id,
      });
      this.$store.dispatch("getTopHundredEpisodes");
    },
  }
};
</script>
<style scoped>
  .card-title {
    line-height: 1em;
    height: 3em;
    float: left;
  }
  .card-text {
    clear: both;
  }
  .card {
    transition: border-width 0.2s;
  }
  .card:hover {
    border-color: #bd5d38;
    background-color: bisque;
  }
</style>
