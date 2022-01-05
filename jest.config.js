module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  testMatch: ["**/__tests__/**/*.js"],
  // collectCoverageFrom: [
  //   "src/**/*.{js,vue}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**",
  // ],
  coverageThreshold: {
    global: {
      branches: 74.19,
      functions: 90,
      lines: 90,
      statements: -11,
    },
  },
};
