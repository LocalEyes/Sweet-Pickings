import { setup } from "axios-cache-adapter";
import slugify from "slugify";

// Create `axios` instance with pre-configured `axios-cache-adapter` attached to it.
export const api = setup({
  // `axios` options
  baseURL: "https://api.vocaleyes.org/v2",
  // `axios-cache-adapter` options
  cache: {
    maxAge: 15 * 60 * 1000,
  },
});
api.defaults.headers = { 'Content-Type' : 'multipart/form-data' };

export const slugConfig = {
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: true, // strip special characters except replacement, defaults to `false`
};

export const slug = (string: string) => slugify(string, slugConfig);
