import { shallowMount } from "@vue/test-utils";
import ProjectInfo from "@/components/ProjectInfo.vue";

describe("ProjectInfo", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = undefined;
    wrapper = shallowMount(ProjectInfo, {
      props: {
        title: "Two-word Title",
        contributor: {
          name: "James Gates",
          email: "gatorjuice@gmail.com",
        },
        description: "A project description",
      },
    });
  });

  it("renders the element", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
