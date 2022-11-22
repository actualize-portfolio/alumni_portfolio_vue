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
      //Access the store for the JWT and return true if jtw exists
      return this.$store.state.jwt;
    },
    destroySession() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
<style scoped></style>
