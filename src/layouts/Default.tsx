import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { classes as style } from "./default.st.css";

import { Project as Default } from "@actionishope/shelley/styles/default";
import { Project as Shelley, Light } from "../styles/puma"; //Dark

import { classes as selection } from "../styles/puma/inputSelection.st.css";

import { InputSelection, Icon } from "@actionishope/shelley";
import { Helmet } from "react-helmet-async";

export const Header = ({ altTheme, changeTheme }: any) => (
  <div className={style.navbar}>
    <div className={style.inner}>
      <h1 className={style.title}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          Solutions Database
        </Link>
      </h1>
      <div className={style.controls}>
        <InputSelection
          id="themeSelector"
          variant={false}
          hint="Toggle light mode"
          label={
            <Icon alt="Toggle light mode">
              <path d="M16 8l-2.2-1.6 1.1-2.4-2.7-0.2-0.2-2.7-2.4 1.1-1.6-2.2-1.6 2.2-2.4-1.1-0.2 2.7-2.7 0.2 1.1 2.4-2.2 1.6 2.2 1.6-1.1 2.4 2.7 0.2 0.2 2.7 2.4-1.1 1.6 2.2 1.6-2.2 2.4 1.1 0.2-2.7 2.7-0.2-1.1-2.4 2.2-1.6zM8 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"></path>
            </Icon>
          }
          className={classnames(selection.darkLightToggle, {
            [selection.on]: altTheme,
          })}
          checked={altTheme}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              changeTheme();
            }
          }}
          onChange={() => {
            changeTheme();
          }}
          type="checkbox"
        />
      </div>
    </div>
  </div>
);

const DefaultLayout = ({ children }: any) => {
  // Define the class names for out theme.
  // const ShelleyDark = classnames(Default, Shelley, Dark);
  const ShelleyLight = classnames(Default, Shelley, Light);
  // Toggle 'alternative' theme state.
  const [altTheme, setAltTheme] = useState<boolean>(false);
  // The alternative here is the light theme.
  // const currentTheme = altTheme ? ShelleyLight : ShelleyDark;
  const currentTheme = ShelleyLight;

  // const changeTheme = () => {
  //   // Set local storage named key: value.
  //   localStorage.currentTheme = !altTheme ? "light" : "dark";
  //   // Toggle between alt theme on and off.
  //   setAltTheme(!altTheme);
  // };

  useEffect(
    // Set the theme based on what is in local storage.
    () => setAltTheme(window.localStorage.getItem("currentTheme") === "light"),
    [altTheme]
  );

  // FYI: https://css-tricks.com/run-useeffect-only-once/
  React.useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // We listen to the resize event
    window.addEventListener("resize", () => {
      // We execute the same script as before.
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "en",
          class: currentTheme,
        }}
      />

      {/* <Header {...{ altTheme, changeTheme }} /> */}

      {children}
    </>
  );
};

export default DefaultLayout;
