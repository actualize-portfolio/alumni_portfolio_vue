<template>
  <form @submit.prevent="login">
    <div class="mb-3">
      <label for="inputEmail" class="form-label">Email address</label>
      <input
        v-model="v$.form.username.$model"
        type="email"
        class="form-control"
        id="inputEmail"
        aria-describedby="emailHelp"
      />
      <div id="emailHelp" class="form-text">
        Use the provided demo user for access.
      </div>
    </div>
    <div class="mb-3">
      <label for="inputPassword" class="form-label">Password</label>
      <input
        v-model="v$.form.password.$model"
        type="password"
        class="form-control"
        id="inputPassword"
        aria-describedby="passwordHelp"
      />
      <div id="passwordHelp" class="form-text">
        Passwords are stored encrypted.
      </div>
    </div>
    <VuelidateError
      :error="error"
      v-for="error of v$.$errors"
      :key="error.$uid"
    />
    <SubmitButton
      id="loginButton"
      :disabled="v$.form.$invalid"
      fixed-text="Sign in"
      loading-text="Please wait..."
      :bootstrap-classes="['btn', 'btn-primary']"
    />
    <router-link to="/users/new">Sign Up</router-link>
  </form>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import SubmitButton from "@/components/SubmitButton.vue";
import VuelidateError from "@/components/VuelidateError.vue";

export default {
  name: "LoginPage",
  components: {
    SubmitButton,
    VuelidateError,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    async login() {
      const isFormCorrect = await this.v$.$validate();

      if (isFormCorrect) {
        this.$store.dispatch("login", {
          username: this.form.username,
          password: this.form.password,
          redirectTo: this.$route.query.nextUrl,
        });
      }
    },
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      form: {
        username: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(6),
        },
      },
    };
  },
};
</script>
<style scoped></style>
