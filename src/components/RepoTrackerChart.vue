<template>
  <canvas id="repoTrackerChart"></canvas>
</template>
<script>
import {
  Chart,
  LinearScale,
  BarElement,
  BarController,
  CategoryScale,
} from "chart.js";

export default {
  name: "RepoTrackerChart",
  props: {
    repos: {
      type: Array,
      required: false,
    },
  },
  watch: {
    repos() {
      this.resetChart();
    },
  },
  mounted() {
    this.resetChart();
  },
  methods: {
    resetChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart();
    },
    createChart() {
      Chart.register(LinearScale, BarElement, BarController, CategoryScale);

      this.chart = new Chart(
        document.getElementById("repoTrackerChart").getContext("2d"),
        {
          type: "bar",
          data: {
            labels: this.repos.map((repo) => repo.name),
            datasets: [
              {
                label: "Forks",
                backgroundColor: "rgba(255, 131, 96, 0.3)",
                borderColor: "rgba(255, 131, 96, 0.8)",
                data: this.repos.map((repo) => repo.forks_count),
              },
              {
                label: "Watchers",
                backgroundColor: "rgba(89, 201, 165, 0.3)",
                borderColor: "rgba(89, 201, 165, 0.8)",
                data: this.repos.map((repo) => repo.watchers_count),
              },
              {
                label: "Popularity",
                backgroundColor: "rgba(118, 153, 212, 0.3)",
                borderColor: "rgba(118, 153, 212, 0.8)",
                data: this.repos.map((repo) => repo.popularity_rating),
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: false,
              },
            },
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                display: true,
                text: "Repository Tracker",
              },
            },
          },
        }
      );
    },
  },
};
</script>
<style>
canvas {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>
