// globals.d.ts
declare module "*.st.css" {
  const stylesheet: import("@stylable/runtime").RuntimeStylesheet;
  export = stylesheet;
}

declare module "remark-oembed";

declare module "remark-iframes";

declare module "@raae/gatsby-remark-oembed";
