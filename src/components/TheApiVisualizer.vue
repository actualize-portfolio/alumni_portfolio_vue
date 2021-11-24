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
          {{ request.url }} ... responded with {{ request.status }}
        </button>
      </h2>
      <div
        :id="`collapseOne${request.id}`"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#apiRequests"
      >
        <div class="accordion-body">
          <pre v-if="request.payload">
            {{ JSON.stringify(request.payload, undefined, 2) }}
          </pre>
          <pre>
            {{ JSON.stringify(request.response, undefined, 2) }}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheApiVisualizer",
};
</script>
<style scoped>
#apiRequests {
  margin-top: 1.5rem;
}
</style>
