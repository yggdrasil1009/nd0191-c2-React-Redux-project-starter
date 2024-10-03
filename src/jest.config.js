// jest.config.js
module.exports = {
  preset: "ts-jest", // Optional: If using TypeScript
  testEnvironment: "jsdom", // For testing React components
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transform .js and .jsx files
    "^.+\\.tsx?$": "ts-jest", // Optional: Transform .ts and .tsx files
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  // Other configurations as needed
};
