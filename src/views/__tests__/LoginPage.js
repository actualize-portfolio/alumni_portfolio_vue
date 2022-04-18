import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import LoginPage from "@/views/LoginPage.vue";
import store from "@/store";
import router from "@/router";

let wrapper;

beforeEach(() => {
  jest.clearAllMocks();
  wrapper = undefined;
  wrapper = mount(LoginPage, {
    global: {
      plugins: [store, router],
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
  it("renders with demo username and password blank", () => {
    expect(wrapper.vm.form.username).toEqual("");
    expect(wrapper.vm.form.password).toEqual("");
  });

  it("logs in with the provided username and password", async () => {
    const storeSpy = jest.spyOn(store, "dispatch");
    await wrapper.find("#inputEmail").setValue("demo_user@test.com");
    await wrapper.find("#inputPassword").setValue("p@ssw@rd");
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
