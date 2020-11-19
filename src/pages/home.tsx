import React, { useEffect } from "react";
import classnames from "classnames";

/* = Local components */
// import DefaultLayout from "../layouts";
import Banner from "../components/Banner/Banner";

/* = Shelley components */
import { H1, H2, P, Grid } from "@actionishope/shelley";
/* = Explicitly used style imports */
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
// import { classes as button } from "../styles/puma/button.st.css";
// import { classes as spacing } from "../styles/puma/spacing.st.css";

import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";

// Import dependencies
// import { api } from "../api";
import ChevRight from "../components/icons/ChevRight";

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
        {/* <H2 className={classnames(text.color2, grid.goal)} vol={7} uppercase>
          Solutions
        </H2> */}
        {/* text-align: left;
    background: #111111;
    padding: 60px;
    color: #fff;
    grid-column: edge;
    padding-left: 11%; */}
        {/* <div className={grid.goal}>
          <Grid variant={4}>
            {solutions.map((solution: any, index: number) => {
              // Quick hack to limit number rendered.
              if (index > 5) return;

              // Derive a slug from name.
              const slug = slugify(solution.name, slugConfig);
              return (
                <Card
                  title={solution.name}
                  url={`/solutions/${solution.id}/${slug}`}
                  description={solution.description}
                  media={solution.image}
                  key={solution.id}
                />
              );
            })}
          </Grid>
        </div> */}
        {/* 
        <Grid
          variant={2}
          formatted
          className={classnames(spacing.mt2, spacing.mb4)}
        >
          <Link className={button.linkButton} to="/solutions/">
            <Button variant={3} tone={5} vol={6} role="link" fullWidth>
              Find more Solutions
            </Button>
          </Link>

          <Link className={button.linkButton} to="/suggest-solution/">
            <Button variant={3} tone={5} vol={6} role="link" fullWidth>
              Suggest a solution
            </Button>
          </Link>
        </Grid> */}

        {/* <H2
          className={classnames(text.sectionHeader, text.color1, grid.goal)}
          vol={7}
          uppercase
        >
          Case Studies
        </H2>

        <div className={grid.goal}>
          <Grid variant={4}>
            {caseStudies.map((item) => {
              const slug = slugify(item.name, slugConfig);
              return (
                <Card
                  title={item.name}
                  url={`solutions/${item.key}/${slug}`}
                  description={item.description}
                  media={item.image}
                  key={item.key}
                />
              );
            })}
          </Grid>
        </div> */}
      </Grid>
    </div>
  );
};

export default Home;
