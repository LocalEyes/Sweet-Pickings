import { RuntimeStylesheet } from "@stylable/runtime";
import classnames from "classnames";
import { classes as light } from "./themes/light.st.css";
import { classes as dark } from "./themes/dark.st.css";

// = Foundation Components
import Button from "./button.st.css";
import Blockquote from "./blockquote.st.css";
// import ErrorText from "./errorText.st.css";
import Grid from "./grid.st.css";
// import HintText from "./hintText.st.css";
import InputBase from "./inputBase.st.css";
// import InputSelect from "./inputSelect.st.css";
import InputSelection from "./inputSelection.st.css";
// import InputSelectionControl from "./inputSelectionControl.st.css";
// import InputText from "./inputText.st.css";
import Label from "./label.st.css";
import Text from "./text.st.css";

import Dialog from "./dialog.st.css";

// = Application Components
import Footer from "./footer.st.css";
import Banner from "./banner.st.css";
import Card from "./card.st.css";
import Header from "./header.st.css";

import Solution from "./solution.st.css";

// = Project
import ProjectFile from "./project.st.css";

// import Spacing from "./banner.st.css";
// = Helper to extract the class names.
const getStylableClassNames = (
  values: [],
  stylesheet: RuntimeStylesheet,
  rootcls: string
) => {
  const clsArray = values.map((cls: string) => stylesheet.classes[cls] || null);
  return classnames(stylesheet.classes[rootcls], clsArray);
};

export const dialog = (...values: []) =>
  getStylableClassNames(values, Dialog, "dialog");

// = Foundation component exports
export const button = (...values: []) =>
  getStylableClassNames(values, Button, "button");

export const blockquote = (...values: []) =>
  getStylableClassNames(values, Blockquote, "blockquote");

// export const errorText = (...values: []) =>
//   getStylableClassNames(values, ErrorText, "errorText");

export const grid = (...values: []) =>
  getStylableClassNames(values, Grid, "grid");

// export const hintText = (...values: []) =>
//   getStylableClassNames(values, HintText, "hintText");

export const inputBase = (...values: []) =>
  getStylableClassNames(values, InputBase, "inputBase");

// export const inputSelect = (...values: []) =>
//   getStylableClassNames(values, InputSelect, "inputSelect");

export const inputSelection = (...values: []) =>
  getStylableClassNames(values, InputSelection, "inputSelection");

// export const inputSelectionControl = (...values: []) =>
//   getStylableClassNames(values, InputSelectionControl, "inputSelectionControl");

// export const inputText = (...values: []) =>
//   getStylableClassNames(values, InputText, "inputText");

export const label = (...values: []) =>
  getStylableClassNames(values, Label, "label");

export const text = (...values: []) =>
  getStylableClassNames(values, Text, "text");

// Application component exports

export const footer = (...values: []) =>
  getStylableClassNames(values, Footer, "footer");

export const banner = (...values: []) =>
  getStylableClassNames(values, Banner, "banner");

export const card = (...values: []) =>
  getStylableClassNames(values, Card, "card");

export const header = (...values: []) =>
  getStylableClassNames(values, Header, "header");

export const solution = (...values: []) =>
  getStylableClassNames(values, Solution, "solution");

// = Main classname export
export const Project = ProjectFile.classes.root;

// = Theme exports
export const Light = light.root;
export const Dark = dark.root;
