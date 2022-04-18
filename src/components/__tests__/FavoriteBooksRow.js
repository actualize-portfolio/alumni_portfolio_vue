import { mount } from "@vue/test-utils";
import store from "@/store";
import FavoriteBooksRow from "@/components/FavoriteBooksRow.vue";

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

  describe("toggleFavorite", () => {
    let spy;

    beforeEach(() => {
      spy = undefined;
      spy = jest
        .spyOn(wrapper.vm.$store, "dispatch")
        .mockImplementation(() => Promise.resolve());
    });

    describe("when the book is not a favorite", () => {
      it("dispatches the setFavoriteBook action", () => {
        wrapper.vm.toggleFavorite(props.book);

        expect(spy).toHaveBeenCalledWith("setFavoriteBook", props.book);
      });
    });

    describe("when the book is a favorite", () => {
      it("dispatches the setFavoriteBook action", async () => {
        props.book.is_favorite = true;

        wrapper.vm.toggleFavorite(props.book);

        expect(spy).toHaveBeenCalledWith("removeFavoriteBook", props.book);
      });
    });
  });
});
