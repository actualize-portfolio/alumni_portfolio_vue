import { mount } from "@vue/test-utils";
import store from "@/store";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

describe("LoadingSpinner.vue", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = undefined;

    wrapper = mount(LoadingSpinner, {
      global: { plugins: [store] },
    });
  });

  it("displays nothing when loading is false", () => {
    expect(wrapper.html()).toEqual("<!--v-if-->");
  });

  it("displays spinner and screen reader text when loading is true", async () => {
    await store.commit("startLoading");

    expect(wrapper.html()).toContain('<div class="spinner-grow mt-3"');
    expect(wrapper.html()).toContain('<span class="sr-only">Loading...');
  });
});
