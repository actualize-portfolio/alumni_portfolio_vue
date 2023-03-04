module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    '^.+\\js$': 'babel-jest',
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
      functions: 80,
      lines: 80,
      statements: -30,
    },
  },
};
