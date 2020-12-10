import React, { useState, useEffect } from "react";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { renderers } from "../components/Markdown/MarkDownMap";
import { Link, useParams } from "react-router-dom";
import { api, slug } from "../api";
import DefaultLayout from "../layouts/Default";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import { H1, H2, P, Grid } from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as buttons } from "../styles/puma/button.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { st, classes } from "./solution.st.css";

const Solution = ({ match, location }: any) => {
  const params: any = useParams();
  // console.log(match, location, params);
  // Set the initial content with what have from the link via link state.
  const [content, setContent] = useState<any>({
    name: location.state && location.state.title,
    description: location.state && location.state.description,
    image: location.state && location.state.media,
  });

  const [caseStudies, setCaseStudies] = useState<any>([]);

  useEffect(() => {
    // GET solution via id from the url params.
    api
      .get(`/ideas/${params.solutionId}`)
      .then(async (response) => {
        const page = response.data.data[0];
        // Update content with what comes back from the API
        setContent({
          name: page.name,
          description: page.description,
          image: page.images[0],
          mainCategores: page.categories.main_categories.items || false,
          orgTypes: page.categories.organisation_types.items || false,
          links: page.links,
        });

        // Get and set case studies
        page.links.news &&
          api
            .get(page.links.news)
            .then(async (response) => {
              console.log(response.data.data);
              return setCaseStudies(response.data.data);
            })
            .catch((error) => {
              console.error(error);
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
    <div className={st(classnames(classes.root, spacing.mb8))}>
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
                  backgroundImage: `url(${(content.mainCategores && content.mainCategores[0].cat_image)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "0 50%",
                }}
              />
            )
          }
        >
          <H2 className={grid.goal} vol={8} uppercase>
            <span
              className={classnames(
                text.textBannerInline,
                classes.category,
                text.color2
              )}
            >
              {content.mainCategores && content.mainCategores[0].cat_name}
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
            <small className={classnames(classes.solutionSub, text.color2)}>
              Solution:
            </small>
            <br />
            {content.name}
          </H1>
          <P vol={2}>
            <strong>Relevant for: </strong>
            {content.orgTypes &&
              content.orgTypes.map((item: any, index: number) => {
                const tail = index !== content.orgTypes.length - 1 && ", ";
                return (
                  <span key={`cattypes${index}`}>
                    {item.cat_name}
                    {tail}
                  </span>
                );
              })}
          </P>
          {content.image == null ? <div></div> : <img src={content.image} width='100%' alt=""></img>}
          <ReactMarkdown
            source={content.description}
            renderers={renderers}
            plugins={[gfm]}
          />

          <Grid
            variant={2}
            formatted
            className={classnames(
              spacing.mt2,
              spacing.mt4,
              spacing.mb8,
              grid.pen
            )}
          >
            <Link to="/solutions" className={buttons.link}>
              Find more solutions
            </Link>

            <Link to="/suggestion" className={buttons.link}>
              Suggest a solution
            </Link>
          </Grid>

          <H2 className={classnames(grid.goal, spacing.mb2)} vol={7} uppercase>
            Related Case studies
          </H2>
          {caseStudies.length > 0 && (
            <div className={grid.goal}>
              <Grid variant={4}>
                {caseStudies.map((item: any) => {
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
            </div>
          )}
        </Grid>
      </DefaultLayout>
    </div>
  );
};

export default Solution;
