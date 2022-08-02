import textMixin from "@/mixins/textMixin";

describe("methods", () => {
  describe("$_textMixin_capitalizeWord", () => {
    it("capitalizes the word", () => {
      expect(textMixin.methods.$_textMixin_capitalizeWord("foo")).toEqual("Foo");
    });
  });

  describe("$_textMixin_formatNumber", () => {
    it("formats the integer with commas", () => {
      const formatNumber = textMixin.methods.$_textMixin_formatNumber;

      expect(formatNumber(1)).toEqual("1");
      expect(formatNumber(10)).toEqual("10");
      expect(formatNumber(100)).toEqual("100");
      expect(formatNumber(1000)).toEqual("1,000");
      expect(formatNumber(10000000000000)).toEqual("10,000,000,000,000");
      expect(formatNumber(1000.5)).toEqual("1,000.5");
    });
  });

  describe("$_textMixin_maybeSingularize", () => {
    const singularize = textMixin.methods.$_textMixin_maybeSingularize;

    describe("when count is less than 1", () => {
      it("returns the original word", () => {
        expect(singularize(0.025, "feet")).toEqual("feet");
      });
    });

    describe("when count is 1", () => {
      it("singularizes the word", () => {
        expect(singularize(1, "inches")).toEqual("inch");
        expect(singularize(1.0, "inches")).toEqual("inch");
      });
    });

    describe("when count greater than 1", () => {
      it("returns the original word", () => {
        expect(singularize(2, "inches")).toEqual("inches");
        expect(singularize(1.1, "inches")).toEqual("inches");
      });
    });
  });
});
