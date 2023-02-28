<template>
  <div id="login" class="navlink">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a
          @click.prevent="destroySession()"
          v-if="userLoggedIn()"
          to="/logout"
          class="nav-link"
        >
          Log Out
        </a>
        <router-link v-else to="/login" class="nav-link">Log In</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "TheSessionLink",
  methods: {
    userLoggedIn() {
      return this.$store.state.sessions.jwt;
    },
    destroySession() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
<style scoped></style>
