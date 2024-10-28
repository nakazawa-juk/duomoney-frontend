module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',

  // テストのカバレッジが欲しければ以下のコメントアウトを外す
  // collectCoverage: true,
  // collectCoverageFrom: ['<rootDir>/src/**/*.{js,vue,ts}'],
  // coverageReporters: ['html', 'text-summary'],
  // coveragePathIgnorePatterns: [
  //   'src/main.ts', // ここでmain.tsを除外
  // ],
};
