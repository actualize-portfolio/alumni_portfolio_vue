<template>
  <ProjectInfo
    title="Pinnys Project"
    :contributor="{ name: 'Pinny Geliebter', email: 'pgibreeze@gmail.com' }"
    description="does junk"
  />
  <h1>Hello World!!</h1>
</template>
<script>
import ProjectInfo from "../components/ProjectInfo.vue"
export default {
  name: 'PinnysProject',
  components: {
    ProjectInfo
  }
}
</script>