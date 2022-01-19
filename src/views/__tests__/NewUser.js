import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import NewUser from "@/views/NewUser.vue";
import store from "@/store";

let wrapper;
let storeSpy;

beforeEach(() => {
  jest.clearAllMocks();
  wrapper = undefined;
  storeSpy = undefined;
  wrapper = mount(NewUser, {
    global: { plugins: [store] },
  });
  storeSpy = jest.spyOn(store, "dispatch");
});

describe("NewUser Test", () => {
  it("sets the image to upload when there is an avatar", async () => {
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "file_url");
    const event = {
      target: {
        files: [new Blob(["testing"], { type: "image/png" })],
      },
    };
    wrapper.vm.handleImage(event);

    expect(wrapper.vm.form.avatar).toEqual(event.target.files[0]);
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(
      event.target.files[0]
    );
    expect(wrapper.vm.previewUrl).toEqual("file_url");

    await wrapper.find("#inputEmail").setValue("new_user@test.com");
    await wrapper.find("#inputPassword").setValue("p@ssw@rd");
    await wrapper.find("#inputPasswordConfirmation").setValue("p@ssw@rd");

    wrapper.find("#createUserButton").trigger("submit.prevent");

    await flushPromises();

    expect(storeSpy).toHaveBeenCalledWith("createUser", expect.any(FormData));
  });

  it("allows accout creation without an avatar", async () => {
    await wrapper.find("#inputEmail").setValue("new_user@test.com");
    await wrapper.find("#inputPassword").setValue("p@ssw@rd");
    await wrapper.find("#inputPasswordConfirmation").setValue("p@ssw@rd");

    wrapper.find("#createUserButton").trigger("submit.prevent");

    await flushPromises();

    expect(storeSpy).toHaveBeenCalledWith("createUser", expect.any(FormData));
  });
});

describe("methods", () => {
  describe("async login", () => {
    it("prevens login if the form is invalid", async () => {
      await wrapper.vm.createUser();
      await flushPromises();

      expect(storeSpy).not.toHaveBeenCalled();
    });
  });
});
