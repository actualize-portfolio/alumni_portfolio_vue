import textMixin from "@/mixins/textMixin";

describe("methods", () => {
  describe("$_textMixin_capitalizeWord", () => {
    it("capitalizes the word", () => {
      expect(textMixin.methods.$_textMixin_capitalizeWord("foo")).toEqual(
        "Foo"
      );
    });
  });
});
