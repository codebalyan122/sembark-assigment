import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
  },

  // Add this to help with TypeScript ES modules
  setupNodeEvents(on, config) {
    // You can add event listeners here if needed
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
