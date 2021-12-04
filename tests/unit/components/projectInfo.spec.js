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

  it("it validates the title", () => {
    const validator = ProjectInfo.props.title.validator;

    expect(validator("Title")).toBe(false);
    expect(validator("Two-word Title")).toBe(true);
    expect(validator("Three Word Title")).toBe(false);
  });
});
