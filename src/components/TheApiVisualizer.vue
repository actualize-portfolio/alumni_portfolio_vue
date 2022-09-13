<template>
  <div class="accordion" id="apiRequests">
    <div
      :key="request.id"
      v-for="request in $store.state.apiVisualizer.apiRequests"
      class="accordion-item"
    >
      <h2 class="accordion-header" :id="`request_${request.id}`">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#collapse_${request.id}`"
          aria-expanded="false"
          :aria-controls="`collapse_${request.id}`"
        >
          {{ request.path }} ... responded with {{ request.status }}
        </button>
      </h2>
      <div
        :id="`collapse_${request.id}`"
        class="accordion-collapse collapse"
        :aria-labelledby="`request_${request.id}`"
        data-bs-parent="#apiRequests"
      >
        <div class="accordion-body">
          <pre v-if="isObjectPresent(request.payload)"
            >{{ prettyJson(request.payload) }}
          </pre>
          <pre v-if="isObjectPresent(request.response)"
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
    isObjectPresent(object) {
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
