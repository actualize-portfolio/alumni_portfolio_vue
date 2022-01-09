<template>
  <form @submit.prevent="createUser">
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
        We'll never share your email with anyone else.
      </div>
    </div>
    <div class="mb-3">
      <label for="inputPassword" class="form-label">Password</label>
      <input
        v-model="v$.form.password.$model"
        type="password"
        class="form-control"
        id="inputPassword"
      />
    </div>
    <div class="mb-3">
      <label for="inputPasswordConfirmation" class="form-label"
        >Confirm Password</label
      >
      <input
        v-model="v$.form.passwordConfirmation.$model"
        type="password"
        class="form-control"
        id="inputPasswordConfirmation"
      />
    </div>
    <div class="mb-3">
      <label for="inputAge" class="form-label">Age</label>
      <input
        v-model="v$.form.age.$model"
        type="number"
        class="form-control"
        id="inputAge"
      />
    </div>
    <VuelidateError
      :error="error"
      v-for="error of v$.$errors"
      :key="error.$uid"
    />
    <SubmitButton
      id="createUserButton"
      :disabled="v$.form.$invalid"
      fixed-text="Create Account"
      loading-text="Please wait..."
      :bootstrap-classes="['btn', 'btn-primary']"
    />
  </form>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import SubmitButton from "@/components/SubmitButton.vue";
import VuelidateError from "@/components/VuelidateError.vue";

export default {
  name: "NewUser",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        passwordConfirmation: "",
        age: "",
      },
    };
  },
  components: {
    SubmitButton,
    VuelidateError,
  },
  methods: {
    async createUser() {
      const isFormCorrect = await this.v$.$validate();

      if (isFormCorrect) {
        this.$store.dispatch("createUser", this.form);
      }
    },
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
        passwordConfirmation: {
          required,
          sameAsPassword: sameAs(this.form.password),
        },
        age: {
          required,
        },
      },
    };
  },
};
</script>
<style scoped></style>
