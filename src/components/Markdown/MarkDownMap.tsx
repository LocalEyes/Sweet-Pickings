import React from "react";
import { Text, TextProps } from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as spacing } from "../../styles/puma/spacing.st.css";

import {
  getHTML,
  shouldTransform,
} from "../../components/Markdown/transformers/youtube";

export const paragraph = ({ children, as = "p", vol = 3 }: TextProps) => (
  <Text {...{ vol, as }}>{children}</Text>
);

export const listItem = ({ children, as = "li", vol = 3 }: TextProps) => (
  <Text {...{ vol, as }} className={spacing.mb05}>
    {children}
  </Text>
);

export const link = (props: any) => {
  // Struggling to get remark working so this is a hack to render youtubes from links.
  // console.log(props, props.node.position.start.column === 1);
  const html =
    shouldTransform(props.href) && props.node.position.start.column === 1 ? (
      getHTML(props.href)
    ) : (
      <a href={`${props.href}`}>{props.children}</a>
    );
  return html;
};

export const heading = ({ node, children }: any) => {
  const as = node.depth === 2 ? "h2" : "h3";
  const vol = node.depth === 2 ? 6 : 5;
  return <Text {...{ as, vol }}>{children}</Text>;
};

export const table = ({ children }: any) => {
  return <table className={grid.pen}>{children}</table>;
};

export const renderers = {
  heading,
  paragraph,
  link,
  listItem,
  table,
};

// <Text {...{ vol, tag, ...rest }}>{children}</Text>

// https://www.npmjs.com/package/react-markdown
// root — Whole document
// text — Text (foo)
// break — Hard break (<br>)
// paragraph — Paragraph (<p>)
// emphasis — Emphasis (<em>)
// strong — Strong (<strong>)
// thematicBreak — Horizontal rule (<hr>)
// blockquote — Block quote (<blockquote>)
// link — Link (<a>)
// image — Image (<img>)
// linkReference — Link through a reference (<a>)
// imageReference — Image through a reference (<img>)
// list — List (<ul> or <ol>)
// listItem — List item (<li>)
// definition — Definition for a reference (not rendered)
// heading — Heading (<h1> through <h6>)
// inlineCode — Inline code (<code>)
// code — Block of code (<pre><code>)
// html — HTML node (Best-effort rendering)
// virtualHtml — If allowDangerousHtml is not on and skipHtml is off, a naive HTML parser is used to support basic HTML
// parsedHtml — If allowDangerousHtml is on, skipHtml is off, and html-parser is used, more advanced HTML is supported
// With remark-gfm, the following are also available:

// delete — Delete text (<del>)
// table — Table (<table>)
// tableHead — Table head (<thead>)
// tableBody — Table body (<tbody>)
// tableRow — Table row (<tr>)
// tableCell — Table cell (<td> or <th>)
