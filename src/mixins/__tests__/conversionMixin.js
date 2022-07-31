import conversionMixin from "@/mixins/conversionMixin";

describe("data", () => {
  it("returns an object of objects called unitCategories", () => {
    const unitCategories = conversionMixin.data().unitCategories;

    expect(unitCategories).toHaveProperty("length");
    expect(unitCategories).toHaveProperty("weight");
  });
});
