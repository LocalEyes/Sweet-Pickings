import React, { useState, useEffect } from "react";
import classnames from "classnames";

/* = Local components */
// import DefaultLayout from "../layouts";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
/* = Shelley components */
import { H1, H2, Grid, VisuallyHidden } from "@actionishope/shelley";
/* = Explicitly used style imports */
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
// import { classes as button } from "../styles/puma/button.st.css";
// import { classes as spacing } from "../styles/puma/spacing.st.css";

import { Helmet } from "react-helmet-async";

import slugify from "slugify";

// import { Link } from "react-router-dom";

// Import dependencies
import { api } from "../api";
// import { caseStudies } from "../dummyData/data";

const slugConfig = {
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: true, // strip special characters except replacement, defaults to `false`
};

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<any>([]);
  useEffect(() => {
    // Send a GET request to api for CaseStudies.
    api
      .get("/news")
      .then(async (response) => {
        // Set solutions state with data.
        console.log(response.data.data);
        setCaseStudies(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title>Case Studies - Solutions database</title>
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
        <Grid variant={2}>
          <div>
            <H1 vol={8} uppercase>
              {/* <span className={text.textBg}>Nature &</span>
              <br />
              <span className={text.textBg}>Climate</span>
              <br /> */}
              <span className={classnames(text.textBannerInline, text.textBg1)}>
                Case Studies
              </span>

              {/* Nature & <br />
              Climate <br />
              CaseStudies */}
            </H1>
            {/* <H1 vol={8} uppercase>
              <span className={text.textBg}>
                Nature <small>&amp;</small>
              </span>
              <br />
              <span className={text.textBg}>climate</span>
              <br />
              <span className={text.textBg}>solutions</span>
            </H1> */}
            {/* <P vol={4}>
              Unfortunately there are plenty of caseStudies.
              <br />
              but it is important not to become overwhelmed.
              <br />
            </P> */}
            {/* <P vol={4}>
              Use the filters to 'drill' down into green solutions,
              <br />
              get inspired; be the change you want to see!
              <br />
            </P> */}
            {/* <P vol={4}>
              Select a challenge to see more about the challenge
              <br />
              itself as well as filtering the solutions below.
              <br />
            </P> */}
          </div>
          {/* rgb(0 0 0 / 34%) */}
          <div className={grid.mid}>
            {/* <InputSelect
              value="How can we reduce our carbon footprint?"
              label={`Select a challenge`}
              vol={3}
              variant={1}
              id={`chall1`}
            >
              <option value={`carbon`}>
                How can we reduce our carbon footprint?
              </option>
              <option value={`plastic`}>
                How can we reduce our single use plastic?
              </option>
            </InputSelect>
            <br /> */}
            {/* <InputText
              value="Start typing..."
              label={`Any particular category?`}
              vol={3}
              variant={1}
              id={`chall2`}
            /> */}
            {/* <InputSelect
              value="Who are you?"
              label={`Who are you?`}
              vol={3}
              variant={1}
              id={`chall3`}
            >
              <option value={`ind`}>Individual</option>
              <option value={`school`}>School</option>
            </InputSelect> */}
          </div>
        </Grid>
      </Banner>
      <Grid tag="main" variant={1} formatted>
        <VisuallyHidden>
          <H2 className={classnames(text.sectionHeader, grid.goal)} vol={7}>
            Results
          </H2>
        </VisuallyHidden>

        <div className={grid.goal}>
          <Grid variant={4}>
            {caseStudies.map((item: any, index: number) => {
              // Quick hack to limit number rendered.
              if (index > 29) return false;

              // Derive a slug from name.
              const slug = slugify(item.title, slugConfig);
              return (
                <Card
                  title={item.title}
                  url={`/case-studies/${item.key}/${slug}`}
                  description={item.description}
                  media={item.images[0]}
                  key={item.key}
                />
              );
            })}
          </Grid>
        </div>

        {/* <Grid
          variant={2}
          formatted
          className={classnames(spacing.mt2, spacing.mb4)}
        >

          <Link className={button.linkButton} to="/suggest-solution/">
            <Button variant={3} tone={5} vol={6} role="link" fullWidth>
              Suggest a solution
            </Button>
          </Link>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default CaseStudies;
