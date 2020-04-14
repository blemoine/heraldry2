module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '~(.*)': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['node_modules'],
  setupFiles: ['./src/utils/tests/jest-polyfill.js'],
};
