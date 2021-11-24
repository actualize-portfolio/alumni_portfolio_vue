module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  // collectCoverageFrom: [
  //   "src/**/*.{js,vue}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**",
  // ],
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //     statements: -10,
  //   },
  // },
};
