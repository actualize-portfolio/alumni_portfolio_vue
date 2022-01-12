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
      <label for="inputAvatar" class="form-label">Avatar</label>
      <input
        @change="handleImage"
        type="file"
        class="form-control"
        id="inputAvatar"
        accept="image/gif, image/jpeg, image/png"
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
    <div>
      <img
        v-if="previewUrl"
        :src="previewUrl"
        class="rounded img-fluid img-max"
        alt="avater preview"
      />
    </div>
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
      previewUrl: "",
      form: {
        avatar: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        age: "0", // Age is hard coded because back end currently requires it.
      },
    };
  },
  components: {
    SubmitButton,
    VuelidateError,
  },
  methods: {
    handleImage(e) {
      const [file] = e.target.files;

      this.form.avatar = file;
      this.previewUrl = URL.createObjectURL(file);
    },
    async createUser() {
      const isFormCorrect = await this.v$.$validate();

      if (isFormCorrect) {
        const formData = new FormData();

        if (this.form.avatar) {
          formData.append("avatar", this.form.avatar, this.form.username);
        }
        formData.append("username", this.form.username);
        formData.append("password", this.form.password);
        formData.append("age", this.form.age);

        this.$store.dispatch("createUser", formData);
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
<style scoped>
.img-max {
  max-width: 200px;
  max-height: 200px;
  width: 100%;
  margin-top: 5px;
}
</style>
