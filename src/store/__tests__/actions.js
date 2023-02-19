import actions from "@/store/actions";

jest.mock("@/services/HttpService");

beforeEach(() => jest.clearAllMocks());

describe("actions", () => {
  let commit;

  beforeEach(() => (commit = jest.fn()));

  describe("initialize", () => {
    test("initialize calls commit with initialize", () => {
      actions.initialize({ commit });

      expect(commit).toHaveBeenCalledWith("initialize");
    });
  });

  describe("toggleTheApiVisualizer", () => {
    test("toggleTheApiVisualizer calls commit with toggleApiVisualizer", () => {
      actions.toggleTheApiVisualizer({ commit });

      expect(commit).toHaveBeenCalledWith("toggleApiVisualizer");
    });
  });
});
