<template>
  <div>
    <ProjectInfo
      title="Unit Converter"
      :contributor="{ name: 'Jamie Gates', email: 'gatorjuice@gmail.com' }"
      description="Converts units of measurement"
    />
  </div>
</template>
<script>
import ProjectInfo from "@/components/ProjectInfo";
export default {
  name: "UnitConverter",
  components: {
    ProjectInfo,
  },
};
</script>
<style scoped></style>
