import { getSpy, postSpy, deleteSpy } from "axios";
import HttpService from "@/services/HttpService";
import store from "@/store";
import { routerPushSpy } from "@/router";

jest.mock("@/router");

let storeSpy;

beforeEach(() => {
  jest.clearAllMocks();
  storeSpy = jest.spyOn(store, "dispatch");
});

describe("handleSuccess", () => {
  const response = {
    data: { data: { foo: "bar" } },
    request: { responseURL: "https://google.com" },
    status: 200,
  };

  it("returns what it was passed", () => {
    expect(HttpService.handleSuccess(response)).toEqual({
      data: { foo: "bar" },
    });
  });

  it("dispatches the addApiRequest action", () => {
    HttpService.handleSuccess(response);

    expect(storeSpy).toHaveBeenCalledWith("addApiRequest", {
      data: { data: { foo: "bar" } },
      path: "https://google.com",
      status: 200,
    });
  });

  it("dispatches the stopLoading action", () => {
    HttpService.handleSuccess(response);

    expect(storeSpy).toHaveBeenCalledWith("stopLoading");
  });
});

describe("handleError", () => {
  describe("when 401", () => {
    const errorObj = { response: { status: 401 } };

    it("returns a rejected promise", () => {
      expect(
        HttpService.handleError(errorObj).catch((error) => {
          expect(error).toEqual(errorObj.response);
        })
      );
    });

    it("redirects to LoginPage", () => {
      HttpService.handleError(errorObj).catch(() => {
        expect(routerPushSpy).toHaveBeenCalledWith({ name: "LoginPage" });
      });
    });
  });

  describe("when 404", () => {
    const errorObj = { response: { status: 404 } };

    it("returns a rejected promise", () => {
      expect(
        HttpService.handleError(errorObj).catch((error) => {
          expect(error).toEqual(errorObj.response);
        })
      );
    });

    it("redirects to root", () => {
      HttpService.handleError(errorObj).catch(() => {
        expect(routerPushSpy).toHaveBeenCalledWith({ name: "LandingPage" });
      });
    });
  });
});

describe("get", () => {
  let response;

  beforeEach(async () => {
    response = await HttpService.get("google.com");
  });

  it("makes HTTP GET requests with provided arguments", () => {
    expect(getSpy).toHaveBeenCalledWith("google.com");
  });

  it("returns the result of the request", () => {
    expect(response).toEqual({ data: { foo: "bar" }, status: 200 });
  });
});

describe("post", () => {
  let response;

  beforeEach(async () => {
    response = await HttpService.post("google.com", { foo: "bar" });
  });

  it("makes HTTP POST requests with provided arguments", () => {
    expect(postSpy).toHaveBeenCalledWith("google.com", { foo: "bar" });
  });

  it("returns the result of the request", async () => {
    expect(response).toEqual({ data: { foo: "bar" }, status: 200 });
  });

  it("catches rejected promise and returns the error", async () => {
    postSpy.mockImplementation(() => Promise.reject({ error: "foo" }));
    const catchSpy = jest.fn(() => {});

    await HttpService.post("google.com", {}).catch(catchSpy);

    expect(catchSpy).toHaveBeenCalledWith({ error: "foo" });
  });
});

describe("delete", () => {
  let response;

  beforeEach(async () => {
    response = await HttpService.delete("google.com");
  });

  it("makes HTTP GET requests with provided arguments", () => {
    expect(deleteSpy).toHaveBeenCalledWith("google.com");
  });

  it("returns the result of the request", async () => {
    expect(response).toEqual({ data: { foo: "bar" }, status: 200 });
  });
});
