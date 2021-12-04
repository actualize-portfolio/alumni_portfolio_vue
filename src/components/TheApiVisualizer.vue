<template>
  <div class="accordion" id="apiRequests">
    <div
      :key="request.id"
      v-for="request in $store.state.apiVisualizer.apiRequests"
      class="accordion-item"
    >
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#collapseOne${request.id}`"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          {{ request.path }} ... responded with {{ request.status }}
        </button>
      </h2>
      <div
        :id="`collapseOne${request.id}`"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#apiRequests"
      >
        <div class="accordion-body">
          <pre v-if="objectPresent(request.payload)"
            >{{ prettyJson(request.payload) }}
          </pre>
          <pre v-if="objectPresent(request.response)"
            >{{ prettyJson(request.response) }}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheApiVisualizer",
  methods: {
    objectPresent(object) {
      return object && Object.keys(object).length > 0;
    },
    prettyJson(object) {
      return JSON.stringify(object, undefined, 2);
    },
  },
};
</script>
<style scoped>
#apiRequests {
  margin-top: 1.5rem;
}
</style>
