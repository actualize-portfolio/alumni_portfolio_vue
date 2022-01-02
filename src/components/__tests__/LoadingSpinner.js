import { mount } from "@vue/test-utils";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

describe("LoadingSpinner.vue", () => {
  it("displays nothing when active is false", () => {
    const wrapper = mount(LoadingSpinner, {
      props: { active: false },
    });
    expect(wrapper.html()).toEqual("<!--v-if-->");
  });

  it("displays spinner and screen reader text when loading is true", () => {
    const wrapper = mount(LoadingSpinner, {
      props: { active: true },
    });

    expect(wrapper.html()).toContain('<div class="spinner-grow mt-3"');
    expect(wrapper.html()).toContain('<span class="sr-only">Loading...');
  });
});
