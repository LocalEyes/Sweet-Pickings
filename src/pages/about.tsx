import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Banner from "../components/Banner/Banner";
/* = Shelley components */
import {
  H1,
  // H2,
  P,
  Grid,
} from "@actionishope/shelley";
/* = Explicitly used style imports */
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { classes as button } from "../styles/puma/button.st.css";
import { classes as spacing } from "../styles/puma/spacing.st.css";

import { Helmet } from "react-helmet-async";

// Import dependencies
import { api } from "../api";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About - Solutions database</title>
      </Helmet>
      <Banner
        className={grid.edge}
        style={{
          marginBottom: "3vw",
        }}
        media={
          <div
            style={{
              opacity: 0.2,
              // backgroundImage:
              //   "url(https://ik.imagekit.io/tcvka0ufln/solutions1_Rpskm-eQ_.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "0 50%",
            }}
          />
        }
      >
        <H1 vol={8} uppercase>
          <span className={classnames(text.textBannerInline, text.textBg4)}>
            About
          </span>
        </H1>
      </Banner>
      <Grid tag="main" variant={1} formatted>
        <P>Body Copy</P>
      </Grid>
    </div>
  );
};

export default About;
