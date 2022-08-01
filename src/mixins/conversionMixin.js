import length from "./conversions/length";
import weight from "./conversions/weight";
import area from "./conversions/area";

const conversionMixin = {
  data() {
    return {
      unitCategories: {
        length,
        weight,
        area,
      },
    };
  },
};

export default conversionMixin;
