import router from "@/router";

describe("when router.beforeEach is called", () => {
  it("navigates to login page", async () => {
    await router.push({ name: "LoginPage" });

    expect(router.currentRoute._rawValue.fullPath).toEqual("/login");
  });
});

describe("when user navigates to unknown page", () => {
  it("displays a 404 page", async () => {
    await router.push("/asdf");

    expect(router.currentRoute._rawValue.fullPath).toEqual("/404");
  });
});
