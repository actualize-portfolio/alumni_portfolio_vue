import { mount } from "@vue/test-utils";
import store from "@/store";
import FavoriteBooksRow from "@/components/FavoriteBooksRow.vue";

jest.mock("@/services/HttpService.js", () => ({
  post: (path, payload, callback) =>
    callback(200, {
      data: {
        id: 31,
        user_id: 3,
        book_id: 1,
        created_at: "2021-11-21T12:43:45.718-06:00",
        updated_at: "2021-11-21T12:43:45.718-06:00",
      },
      errors: [],
    }),
  delete: (path, callback) =>
    callback(200, {
      data: {
        id: 28,
        user_id: 3,
        book_id: 1,
        created_at: "2021-11-21T09:48:22.081-06:00",
        updated_at: "2021-11-21T09:48:22.081-06:00",
      },
      errors: [],
    }),
}));

describe("FavoriteBooksRow", () => {
  let wrapper;
  let columns;

  const props = {
    book: {
      id: 1,
      title: "the testing",
      author: "Crass Bean",
      is_favorite: false,
    },
  };

  beforeEach(() => {
    wrapper = undefined;
    wrapper = mount(FavoriteBooksRow, {
      props,
      global: { plugins: [store] },
    });
    columns = wrapper.findAll("td");
  });

  it("renders the isFavorite column", () => {
    expect(columns[0].find("i").classes()).toEqual([
      "fas",
      "fa-star",
      "unchecked",
    ]);
  });

  it("renders the title column", () => {
    expect(columns[1].text()).toEqual("the testing");
  });

  it("renders the author column", () => {
    expect(columns[2].text()).toEqual("Crass Bean");
  });
});
