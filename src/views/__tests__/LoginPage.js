import { mount } from "@vue/test-utils";
import LoginPage from "@/views/LoginPage.vue";
import store from "@/store";

let wrapper;

beforeEach(() => {
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
    expect(wrapper.vm.username).toEqual("demo_user@test.com");
    expect(wrapper.vm.password).toEqual("p@ssw@rd");
  });

  it("logs in with the provided username and password", async () => {
    const storeSpy = jest.spyOn(store, "dispatch");

    await wrapper.find("#loginButton").trigger("submit.prevent");

    expect(storeSpy).toHaveBeenCalledWith("login", {
      username: "demo_user@test.com",
      password: "p@ssw@rd",
      redirectTo: "/repo_tracker",
    });
  });
});
