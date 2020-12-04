import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import { H1, H2, Grid, Button, VisuallyHidden } from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { classes as spacing } from "../styles/puma/spacing.st.css";
import { Helmet } from "react-helmet-async";
import { api, slug } from "../api";

const CaseStudies = () => {
  const [content, setContent] = useState<any>([]);
  useEffect(() => {
    // Send a GET request to api for CaseStudies.
    api
      .get("/news?per-page=15")
      .then(async (response) => {
        // Set solutions state with data.
        // console.log(response.data);
        setContent(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={spacing.mb8}>
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
              <span className={classnames(text.textBannerInline, text.textBg1)}>
                Case Studies
              </span>
            </H1>
          </div>
          <div className={grid.mid}>{/* TBC */}</div>
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
              content.data.map((item: any, index: number) => {
                return (
                  <Card
                    title={item.title}
                    url={`/case-studies/${item.key}/${slug(item.title)}`}
                    description={item.description}
                    media={item.images[0]}
                    key={item.key}
                  />
                );
              })}
          </Grid>
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
        </div>
      </Grid>
    </div>
  );
};

export default CaseStudies;
