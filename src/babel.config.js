// babel.config.js
module.exports = {
  presets: [
    "@babel/preset-env", // For modern JavaScript
    "@babel/preset-react", // For JSX
    "@babel/preset-typescript", // Optional: If using TypeScript
  ],
  plugins: [
    "@babel/plugin-syntax-jsx", // Allows parsing of JSX without transforming
  ],
};
