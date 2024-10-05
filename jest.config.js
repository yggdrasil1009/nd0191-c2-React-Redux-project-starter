/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use babel-jest to handle JS, JSX, TS, and TSX
  },
  testEnvironment: "jsdom", // Necessary for testing components that interact with the DOM
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Recognize these file extensions
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
