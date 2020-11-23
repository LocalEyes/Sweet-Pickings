import React, { useEffect } from "react";
import classnames from "classnames";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { H1, H2, P, Grid } from "@actionishope/shelley";
import Banner from "../components/Banner/Banner";
import ChevRight from "../components/icons/ChevRight";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Solutions database</title>
      </Helmet>
      <Banner
        className={grid.edge}
        media={
          <div
            style={{
              opacity: 0.9,
              backgroundImage: `url(https://ik.imagekit.io/tcvka0ufln/home_TUhFZjeTJ.jpg`,
              backgroundSize: "cover",
              backgroundPosition: "0 50%",
            }}
          />
        }
      >
        <H1 className={grid.goal} vol={8} uppercase>
          <span className={text.textBg}>Create</span>
          <br />
          <span className={text.textBg}>community</span>
          <br />
          <span className={text.textBg}>well-being</span>
        </H1>
      </Banner>
      <Grid tag="main" variant={1} formatted>
        <div className={classnames(text.sectionLinkBanner, grid.edge)}>
          <H2 className={classnames(text.color3)} vol={7} uppercase>
            <Link to="/challenges">Challenges</Link> <ChevRight />
          </H2>
          <P vol={3}>
            We need to understand the challenges before we can fix anything; get
            familiar with our challenges and lets face them together.
          </P>
        </div>
        <div className={classnames(text.sectionLinkBanner, grid.edge)}>
          <H2 className={classnames(text.color2)} vol={7} uppercase>
            <Link to="/solutions">Solutions</Link> <ChevRight />
          </H2>
          <P vol={3}>
            Find solutions that are suited to you and framed around a specific
            challenge, the solutions are updated as they evolve.
          </P>
        </div>
        <div className={classnames(text.sectionLinkBanner, grid.edge)}>
          <H2 className={classnames(text.color1)} vol={7} uppercase>
            <Link to="/case-studies">Case Studies</Link> <ChevRight />
          </H2>
          <P vol={3}>
            Get inspired by the trailblazers that have completed projects and
            are sharing their experiences and become one yourself!
          </P>
        </div>
      </Grid>
    </div>
  );
};

export default Home;
