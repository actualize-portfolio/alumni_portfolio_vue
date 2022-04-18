import textMixin from "@/mixins/textMixin";

describe("methods", () => {
  describe("$_textMixin_capitalizeWord", () => {
    it("capitalizes the word", () => {
      expect(textMixin.methods.$_textMixin_capitalizeWord("foo")).toEqual(
        "Foo"
      );
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
});
