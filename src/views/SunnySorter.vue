<template>
  <ProjectInfo title="Sunny Sorter" :contributor="{ name: 'Jamie Gates', email: 'gatorjuice@gmail.com' }"
    description="Tabulates the best episodes of Sunny" />
  <h4 class="question">Which episode do you like more?</h4>
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
    getFavoriteSeason(seasons) {
      if (Object.keys(seasons).length < 1) {
        return 'No Rankings'
      } else {
        return Object.keys(seasons).reduce((a, b) => seasons[a] > seasons[b] ? a : b);
      }
    }
  },
  computed: {
    favoriteSeasonPublic() {
      return this.getFavoriteSeason(this.$store.state.sunnySorter.rankedSeasons)
    },
    favoriteSeason() {
      return this.getFavoriteSeason(this.$store.state.sunnySorter.userRankedSeasons)
    },
  },
  created() {
    this.getSunnyEpisodes();
    this.getTopHundredEpisodes();
  },
};
</script>
<style scoped>
  .question {
    text-align: center;
  }
</style>
