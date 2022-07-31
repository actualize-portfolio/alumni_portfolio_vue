<template>
  <div>
    <ProjectInfo
      title="Unit Converter"
      :contributor="{ name: 'Jamie Gates', email: 'gatorjuice@gmail.com' }"
      description="Converts units of measurement"
    />
    <ConversionWidget />
  </div>
</template>
<script>
import ProjectInfo from "@/components/ProjectInfo";
import ConversionWidget from "@/components/ConversionWidget";
export default {
  name: "UnitConverter",
  components: {
    ProjectInfo,
    ConversionWidget,
  },
};
</script>
<style scoped></style>
