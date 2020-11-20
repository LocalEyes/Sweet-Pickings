import React, { useState, useEffect } from "react";
import classnames from "classnames";

/* = Local components */
// import DefaultLayout from "../layouts";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
/* = Shelley components */
import {
  H1,
  H2,
  // P,
  InputSelect,
  // InputText,
  Grid,
  Button,
  VisuallyHidden,
} from "@actionishope/shelley";
/* = Explicitly used style imports */
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
// import { classes as button } from "../styles/puma/button.st.css";
import { classes as spacing } from "../styles/puma/spacing.st.css";

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

const Solutions = () => {
  const [content, setContent] = useState<any>([]);

  useEffect(() => {
    // Send a GET request to api for solutions.
    api
      .get("/solutions/10479?per-page=24")
      .then(async (response) => {
        // Set solutions state with data.
        console.log(response.data);
        setContent(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Solutions database</title>
      </Helmet>
      <Banner
        className={grid.edge}
        style={{
          marginBottom: "3vw",
        }}
        media={
          <div
            style={{
              opacity: 0.36,
              backgroundImage:
                "url(https://ik.imagekit.io/tcvka0ufln/solutions1_Rpskm-eQ_.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "0 50%",
            }}
          />
        }
      >
        <Grid variant={2}>
          <div>
            <H1 vol={8} uppercase>
              <span className={text.textBg}>Nature &amp;</span>
              <br />
              <span className={text.textBg}>Climate</span>
              <br />
              <span className={classnames(text.textBannerInline, text.textBg2)}>
                Solutions
              </span>
            </H1>
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
            <InputSelect
              value="Who are you?"
              label={`Who are you?`}
              vol={3}
              variant={1}
              id={`chall3`}
            >
              <option value={`ind`}>Individual</option>
              <option value={`school`}>School</option>
            </InputSelect>
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
            {content.data &&
              content.data.map((solution: any, index: number) => {
                // Quick hack to limit number rendered.
                if (index > 29) return false;

                // Derive a slug from name.
                const slug = slugify(solution.name, slugConfig);
                return (
                  <Card
                    title={solution.name}
                    url={`/solutions/${solution.key}/${slug}`}
                    description={solution.description}
                    media={solution.links.images[0]}
                    key={solution.key}
                  />
                );
              })}
          </Grid>
        </div>

        <Grid
          variant={2}
          formatted
          className={classnames(spacing.mt2, spacing.mb4)}
        >
          {content.meta && (
            <>
              <Button
                variant={3}
                tone={5}
                vol={6}
                role="link"
                fullWidth
                disabled={!content.meta.pagination.links.prev}
                onClick={() => {
                  // Change to smooth scroll and refs.
                  window.scrollTo(0, 0);
                  api
                    .get(content.meta.pagination.links.prev)
                    .then(async (response) => {
                      setContent(response.data);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                Previous
              </Button>

              <Button
                variant={3}
                tone={5}
                vol={6}
                role="link"
                fullWidth
                disabled={!content.meta.pagination.links.next}
                onClick={() => {
                  // Change to smooth scroll and refs.
                  window.scrollTo(0, 0);
                  api
                    .get(content.meta.pagination.links.next)
                    .then(async (response) => {
                      setContent(response.data);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                Next
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Solutions;