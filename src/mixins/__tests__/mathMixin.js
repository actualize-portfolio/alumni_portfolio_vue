import mathMixin from "@/mixins/mathMixin";

describe("methods", () => {
  describe("$_mathMixin_mode", () => {
    it("finds the mode of a set of numbers", () => {
      expect(mathMixin.methods.$_mathMixin_mode([1,1,2,2,3,3,3])).toEqual("3");
    });

    it("finds the mode of a set of strings", () => {
      expect(mathMixin.methods.$_mathMixin_mode(['orange', 'apple', 'apple', 'banana'])).toEqual("apple");
    });

    it("finds the mode of a set of random value types", () => {
      expect(mathMixin.methods.$_mathMixin_mode([1, 'apple', 3, 'banana', '3', undefined])).toEqual("3");
    });

    it("handles ties by returning the last tied element", () => {
      expect(mathMixin.methods.$_mathMixin_mode(['apple', 'apple', 'banana', 'banana'])).toEqual("banana");
    });

    it("handles an empty array", () => {
      expect(mathMixin.methods.$_mathMixin_mode([])).toEqual("");
    });
  });
});
