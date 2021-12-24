import { getSpy, postSpy, deleteSpy } from "axios";
import HttpService from "@/services/HttpService";
import store from "@/store";

const storeSpy = jest.spyOn(store, "dispatch");

beforeEach(() => jest.clearAllMocks());

describe("redirectTo", () => {
  it("sets the Authorization header when jwt exists", () => {});
});

describe("handleSuccess", () => {
  it("returns what it was passed", () => {
    expect(HttpService.handleSuccess({ foo: "bar" })).toEqual({ foo: "bar" });
  });
});

describe("handleError", () => {
  const redirectToSpy = jest.spyOn(HttpService, "redirectTo");
  redirectToSpy.mockImplementation(() => {});

  describe("when 401", () => {
    const errorObj = { response: { status: 401 } };

    it("returns a rejected promise", () => {
      expect(
        HttpService.handleError(errorObj).catch((error) => {
          expect(error).toEqual(errorObj);
        })
      );
    });

    it("redirects to login page", () => {
      HttpService.handleError(errorObj).catch(() => {});

      expect(redirectToSpy).toHaveBeenCalledWith("/login");
    });
  });

  describe("when 404", () => {
    const errorObj = { response: { status: 404 } };

    it("returns a rejected promise", () => {
      expect(
        HttpService.handleError(errorObj).catch((error) => {
          expect(error).toEqual(errorObj);
        })
      );
    });

    it("redirects to root", () => {
      HttpService.handleError(errorObj).catch(() => {});
      expect(redirectToSpy).toHaveBeenCalledWith("/");
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

  it("dispatches the addApiRequest action", () => {
    expect(storeSpy).toHaveBeenCalledWith("addApiRequest", {
      path: "google.com",
      response: { data: { foo: "bar" }, status: 200 },
    });
  });

  it("returns the result of the request", () => {
    expect(response).toEqual({ foo: "bar" });
  });
});

describe("post", () => {
  it("makes HTTP POST requests with provided arguments", () => {
    HttpService.post("google.com", { foo: "bar" });

    expect(postSpy).toHaveBeenCalledWith("google.com", { foo: "bar" });
  });

  it("dispatches the addApiRequest action", async () => {
    await HttpService.post("google.com", {});

    expect(storeSpy).toHaveBeenCalledWith("addApiRequest", {
      path: "google.com",
      payload: {},
      response: { data: { foo: "bar" }, status: 200 },
    });
  });

  it("returns the result of the request", async () => {
    const result = await HttpService.post("google.com", {});

    expect(result).toEqual({ foo: "bar" });
  });

  it("catches rejected promise and returns the error", async () => {
    postSpy.mockImplementation(() => Promise.reject({ error: "foo" }));
    const catchSpy = jest.fn(() => {});

    await HttpService.post("google.com", {}).catch(catchSpy);

    expect(catchSpy).toHaveBeenCalledWith({ error: "foo" });
  });
});

describe("delete", () => {
  it("makes HTTP GET requests with provided arguments", () => {
    HttpService.delete("google.com");

    expect(deleteSpy).toHaveBeenCalledWith("google.com");
  });

  it("dispatches the addApiRequest action", async () => {
    await HttpService.delete("google.com");

    expect(storeSpy).toHaveBeenCalledWith("addApiRequest", {
      path: "google.com",
      response: { data: { foo: "bar" }, status: 200 },
    });
  });

  it("returns the result of the request", async () => {
    const result = await HttpService.delete("google.com");

    expect(result).toEqual({ foo: "bar" });
  });
});
