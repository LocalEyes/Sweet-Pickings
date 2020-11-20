import React, { useState, useEffect } from "react";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
// = API
import { api } from "../api";
/* = Local components */
import DefaultLayout from "../layouts/Default";
import Banner from "../components/Banner/Banner";
/* = Shelley components */
import { H1, H2, Grid } from "@actionishope/shelley";
/* = Explicitly used style imports */
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { st, classes } from "./solution.st.css";

import { renderers } from "../components/Markdown/MarkDownMap";

import { useParams } from "react-router-dom";

const Solution = ({ match, location }: any) => {
  const params: any = useParams();
  // console.log(match, location, params);

  // Set the initial content with what have from the link via link state.
  const [content, setContent] = useState<any>({
    name: location.state && location.state.title,
    description: location.state && location.state.description,
    image: location.state && location.state.media,
  });

  useEffect(() => {
    // GET solution via id from the url params.
    api
      .get(`/ideas/${params.solutionId}`)
      .then(async (response) => {
        const page = response.data.data[0];
        // console.log({ page });
        // Update content with what comes back from the API
        setContent({
          name: page.name,
          description: page.description,
          image: page.links.images && page.links.images[0],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.solutionId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={st(classnames(classes.root))}>
      <DefaultLayout>
        <Banner
          className={grid.edge}
          style={{
            marginBottom: "3vw",
          }}
          media={
            content.image && (
              <div
                style={{
                  opacity: 0.15,
                  backgroundImage: `url(${content.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "0 50%",
                }}
              />
            )
          }
        >
          <H2 className={grid.goal} vol={8} uppercase>
            <span
              className={classnames(text.textBannerInline, classes.category)}
            >
              {/* {category.title} */}[Main Category]
            </span>
            <br />
            <span
              className={classnames(
                text.textBannerInline,
                text.textBgSm,
                classes.subCategory
              )}
            >
              {content.links && content.links.topic.name}
            </span>
          </H2>
        </Banner>
        <Grid tag="main" variant={1} formatted>
          <H1 vol={7}>
            <small className={classes.solutionSub}>Solution:</small>
            <br />
            {content.name}
          </H1>
          <ReactMarkdown
            source={content.description}
            renderers={renderers}
            plugins={[gfm]}
          />
        </Grid>
      </DefaultLayout>
    </div>
  );
};

export default Solution;