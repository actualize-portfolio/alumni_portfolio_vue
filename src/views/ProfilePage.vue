<template>
  <div>
    <SubmitButton
      id="profileSumbitButton"
      fixed-text="Update"
      loading-text="Please wait..."
      :bootstrap-classes="['btn', 'btn-primary']"
    />
  </div>
</template>
<script>
// import useVuelidate from "@vuelidate/core";
import jwt_decode from "jwt-decode";
import { required, email, minLength } from "@vuelidate/validators";
import SubmitButton from "@/components/SubmitButton.vue";
// import VuelidateError from "@/components/VuelidateError.vue";

export default {
  name: "ProfilePage",
  components: {
    SubmitButton,
    // VuelidateError,
  },
  methods: {},
  mounted() {
    const userId = jwt_decode(this.$store.state.jwt).user_id;

    this.$store.dispatch("getUser", userId);
  },
  data() {
    return {
      user: {},
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
