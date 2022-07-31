const conversionMixin = {
  data() {
    return {
      unitCategories: {
        length: {
          meters: 1,
          decimeters: 10,
          centimeters: 100,
          milimeters: 1000,
          kilometers: 0.001,
          decometers: 0.01,
          feet: 3.28084,
          inches: 39.37008,
        },
        weight: {
          kilograms: 1,
          grams: 1000,
          pounds: 2.2,
        },
      },
    };
  },
};

export default conversionMixin;
