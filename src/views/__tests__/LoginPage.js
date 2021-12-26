import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import LoginPage from "@/views/LoginPage.vue";
import store from "@/store";

let wrapper;

beforeEach(() => {
  jest.clearAllMocks();
  wrapper = undefined;
  wrapper = mount(LoginPage, {
    global: {
      plugins: [store],
      mocks: {
        $route: {
          query: {
            nextUrl: "/repo_tracker",
          },
        },
      },
    },
  });
});

describe("LoginPage Test", () => {
  it("renders with demo username and password filled in", () => {
    expect(wrapper.vm.form.username).toEqual("demo_user@test.com");
    expect(wrapper.vm.form.password).toEqual("p@ssw@rd");
  });

  it("logs in with the provided username and password", async () => {
    const storeSpy = jest.spyOn(store, "dispatch");

    wrapper.find("#loginButton").trigger("submit.prevent");

    await flushPromises();

    expect(storeSpy).toHaveBeenCalledWith("login", {
      username: "demo_user@test.com",
      password: "p@ssw@rd",
      redirectTo: "/repo_tracker",
    });
  });
});

describe("methods", () => {
  describe("async login", () => {
    it("prevens login if the form is invalid", async () => {
      const storeSpy = jest.spyOn(store, "dispatch");
      wrapper.vm.form.username = "";

      await wrapper.vm.login();
      await flushPromises();

      expect(storeSpy).not.toHaveBeenCalled();
    });
  });
});
