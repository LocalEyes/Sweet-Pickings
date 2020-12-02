import React from "react";
import { Helmet } from "react-helmet-async";
import classnames from "classnames";
import { H1, P, Grid } from "@actionishope/shelley";
import Banner from "../components/Banner/Banner";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";

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
      >
        <H1 vol={8} uppercase>
          <span className={classnames(text.textBannerInline, text.textBg4)}>
            About
          </span>
        </H1>
      </Banner>
      <Grid tag="main" variant={1} formatted>
        <P>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </P>

        <P>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </P>
      </Grid>
    </div>
  );
};

export default About;
