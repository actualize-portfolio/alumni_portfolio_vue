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
    <h6>Best Season: <span>{{ favoriteSeasonPublic() }}</span></h6>
    <ol>
      <li v-for="episode in $store.state.sunnySorter.topHundred" :key="episode.id">
        {{ episode.title }}
      </li>
    </ol>
  </div>
  <div>
    <h3>Your Rankings</h3>
    <h6>Best Season: <span>{{ favoriteSeason() }}</span></h6>
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
import mathMixin from "@/mixins/mathMixin.js";
export default {
  name: "SunnySorter",
  components: {
    ProjectInfo,
    SunnyEpisode
  },
  mixins: [mathMixin],
  methods: {
    getSunnyEpisodes() {
      this.$store.dispatch("getSunnyEpisodes");
    },
    gettopHundredEpisodes() {
      this.$store.dispatch("gettopHundredEpisodes");
    },
    favoriteSeason() {
      const seasons = this.$store.state.sunnySorter.userTopHundred.map(episode => episode.season)
      return this.$_mathMixin_mode(seasons)
    },
    favoriteSeasonPublic() {
      const seasons = this.$store.state.sunnySorter.topHundred.map(episode => episode.season)
      return this.$_mathMixin_mode(seasons)
    },
  },
  created() {
    this.getSunnyEpisodes();
    this.gettopHundredEpisodes();
  },
};
</script>
<style scoped>

</style>
