<template>
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

</style>
