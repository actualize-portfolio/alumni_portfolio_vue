<template>
  <form @submit.prevent="updateUser">
    <div class="mb-3">
      <h3>{{ user.username }}</h3>
    </div>
    <div class="mb-3">
      <label for="inputPassword" class="form-label">Password</label>
      <input
        v-model="v$.user.password.$model"
        type="password"
        class="form-control"
        id="inputPassword"
        placeholder="leave blank to prevent password update"
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
      id="updateUserButton"
      :disabled="!v$.user.$dirty || v$.user.$invalid"
      fixed-text="Update User"
      loading-text="Please wait..."
      :bootstrap-classes="['btn', 'btn-primary']"
    />
    <div>
      <img
        v-if="user.avatar_url"
        :src="user.avatar_url"
        class="rounded img-fluid img-max"
        alt="avater preview"
      />
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
import jwt_decode from "jwt-decode";
import { minLength, required } from "@vuelidate/validators";
import SubmitButton from "@/components/SubmitButton.vue";
import VuelidateError from "@/components/VuelidateError.vue";

export default {
  name: "ProfilePage",
  components: {
    SubmitButton,
    VuelidateError,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    handleImage(e) {
      const [file] = e.target.files;

      this.user["avatar"] = file;
      this.previewUrl = URL.createObjectURL(file);
    },
    async updateUser() {
      const isFormCorrect = await this.v$.$validate();

      if (isFormCorrect) {
        const formData = new FormData();

        if (this.user.avatar) {
          formData.append("avatar", this.user.avatar, this.user.username);
        }
        formData.append("username", this.user.username);
        formData.append("password", this.user.password);

        this.$store.dispatch("updateUser", formData);
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    const userId = jwt_decode(this.$store.state.jwt).user_id;

    this.$store.dispatch("getUser", userId);
  },
  validations() {
    return {
      user: {
        password: {
          required,
          min: minLength(6),
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
