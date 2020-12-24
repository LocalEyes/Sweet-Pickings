import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import classnames from "classnames";
import { H1, P, Grid } from "@actionishope/shelley";
import Banner from "../components/Banner/Banner";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={spacing.mb8}>
      <Helmet>
        <title>About - Solutions database</title>
      </Helmet>
      <Banner
        className={grid.edge}
        media={
          <div
            style={{
              opacity: 0.15,
              backgroundImage: `url(https://ik.imagekit.io/tcvka0ufln/home_TUhFZjeTJ.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "0 50%",
            }}
          />
        }
      >
       <H1 vol={8} uppercase>
          <span className={classnames(text.textBannerInline, text.textBg2)}>
            About
          </span>
        </H1>
      </Banner>
      <Grid tag="main" variant={1} formatted className={classnames(spacing.mt3)}>
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
