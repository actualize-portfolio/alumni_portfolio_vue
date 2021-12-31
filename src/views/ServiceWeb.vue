<template>
  <ProjectInfo
    title="Service Web"
    :contributor="{ name: 'Jamie Gates', email: 'gatorjuice@gmail.com' }"
    description="Crowd-sourced resources for those in need."
  />
  <ServiceWebTable />
</template>
<script>
import ProjectInfo from "@/components/ProjectInfo";
import ServiceWebTable from "@/components/ServiceWebTable";

export default {
  name: "ServiceWeb",
  components: {
    ProjectInfo,
    ServiceWebTable,
  },
};
</script>
<style scoped></style>
