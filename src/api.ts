import { setup } from "axios-cache-adapter";

// Create `axios` instance with pre-configured `axios-cache-adapter` attached to it.
export const api = setup({
  // `axios` options
  baseURL: "https://api.vocaleyes.org/v2",
  // `axios-cache-adapter` options
  cache: {
    maxAge: 15 * 60 * 1000,
  },
});
