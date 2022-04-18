import router from "@/router";

describe("when router.beforeEach is called", () => {
  it("then someService is called", async () => {
    await router.push({ name: "LoginPage" });

    expect(router.currentRoute._rawValue.fullPath).toEqual("/login");
  });
});
