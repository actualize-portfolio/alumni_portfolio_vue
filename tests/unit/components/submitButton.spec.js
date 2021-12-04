import { mount } from "@vue/test-utils";
import store from "@/store";
import SubmitButton from "@/components/SubmitButton.vue";

describe("SubmitButton.vue", () => {
  let wrapper;
  let button;

  beforeEach(async () => {
    await store.commit("stopLoading");

    wrapper = undefined;
    button = undefined;

    wrapper = mount(SubmitButton, {
      props: {
        fixedText: "Send",
        loadingText: "Loading",
        bootstrapClasses: ["btn", "btn-primary"],
      },
      global: { plugins: [store] },
    });

    button = wrapper.find("button");
  });

  it("displays the text as button label when not loading", () => {
    expect(button.text()).toEqual("Send");
  });

  it("displays the loadingText as button label when loading", async () => {
    await store.commit("startLoading");

    expect(button.text()).toEqual("Loading");
  });

  it("has a type of 'submit'", () => {
    expect(button.attributes("type")).toEqual("submit");
  });

  it("has a class attribute", () => {
    expect(button.attributes("class")).toEqual("btn btn-primary");
  });
});
