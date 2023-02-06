<template>
  <ProjectInfo title="Sunny Sorter" :contributor="{ name: 'Jamie Gates', email: 'gatorjuice@gmail.com' }"
    description="Tabulates the best episodes of Sunny" />
  <div class="row">
    <div v-for="episode in $store.state.sunnySorter.episodes" :key="episode.id" class="col">
      <SunnyEpisode :episode="episode" />
    </div>
  </div>
  <div>
    <h3>Public Rankings</h3>
    <h6>Best Season: <span>{{ favoriteSeasonPublic }}</span></h6>
    <ol>
      <li v-for="episode in $store.state.sunnySorter.topHundred" :key="episode.id">
        {{ episode.title }}
      </li>
    </ol>
  </div>
  <div>
    <h3>Your Rankings</h3>
    <h6>Best Season: <span>{{ favoriteSeason }}</span></h6>
    <ol>
      <li v-for="episode in $store.state.sunnySorter.userTopHundred" :key="episode.id">
        {{ episode.title }}
      </li>
    </ol>
  </div>
</template>

<script>
import ProjectInfo from "@/components/ProjectInfo";
import SunnyEpisode from "../components/SunnyEpisode.vue";
export default {
  name: "SunnySorter",
  components: {
    ProjectInfo,
    SunnyEpisode
  },
  methods: {
    getSunnyEpisodes() {
      this.$store.dispatch("getSunnyEpisodes");
    },
    getTopHundredEpisodes() {
      this.$store.dispatch("getTopHundredEpisodes");
    },
  },
  computed: {
    favoriteSeason() {
      const seasons = this.$store.state.sunnySorter.rankedSeasons
      return Object.keys(seasons).reduce((a, b) => seasons[a] > seasons[b] ? a : b);
    },
    favoriteSeasonPublic() {
      const seasons = this.$store.state.sunnySorter.userRankedSeasons
      return Object.keys(seasons).reduce((a, b) => seasons[a] > seasons[b] ? a : b);
    },
  },
  created() {
    this.getSunnyEpisodes();
    this.getTopHundredEpisodes();
  },
};
</script>
<style scoped>

</style>
