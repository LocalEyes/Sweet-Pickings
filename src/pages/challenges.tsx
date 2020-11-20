import React, { useState, useEffect } from "react";
import classnames from "classnames";

/* = Local components */
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
/* = Shelley components */
import {
  H1,
  H2,
  H3,
  InputSelection,
  P,
  // InputSelect,
  // InputText,
  Grid,
  // Button,
  // VisuallyHidden,
} from "@actionishope/shelley";
/* = Explicitly used style imports */
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
// import { classes as button } from "../styles/puma/button.st.css";
// import { classes as spacing } from "../styles/puma/spacing.st.css";

import { Helmet } from "react-helmet-async";
import slugify from "slugify";

// Import dependencies
import { api } from "../api";
// import { caseStudies } from "../dummyData/data";
interface ChallengesProps {
  group: any;
}

const slugConfig = {
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: true, // strip special characters except replacement, defaults to `false`
};

const Challenges = ({ group }: ChallengesProps) => {
  const [loadedChallenge, setLoadedChallenge] = useState<any>();

  //
  const loadChallenge = (topicId: string) => {
    api
      .get(`/topics/${topicId}`)
      .then(async (response) => {
        console.log({ response });
        setLoadedChallenge(response.data.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Get the default topic data.
    group && loadChallenge(group.links.topics[0].id);
  }, [group]);

  return (
    <div>
      <Helmet>
        <title>Challenges - Solutions database</title>
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
              backgroundImage: loadedChallenge
                ? `url(${loadedChallenge.images[0]})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "0 50%",
            }}
          />
        }
      >
        <Grid variant={2} style={{ alignItems: "center" }}>
          <div>
            <H1 vol={8} uppercase>
              <span className={text.textBg}>Explore our</span>
              <br />
              <span className={classnames(text.textBannerInline, text.textBg3)}>
                Challenges
              </span>
            </H1>
          </div>
          {/* rgb(0 0 0 / 34%) */}
          <div className={grid.mid}>
            <P vol={2} style={{ marginBottom: "10px" }}>
              <b>Select a challenge from the scroll list:</b>
            </P>
            <div
              style={{
                overflowX: "hidden",
                overflowY: "scroll",
                height: "30vh",
                maxHeight: "300px",
              }}
            >
              {group &&
                group.links.topics.map((topic: any, index: number) => {
                  // console.log("topic", topic, index);
                  // console.log("selected topic", loadedChallenge);
                  return (
                    <div
                      style={{
                        padding: "10px 18px",
                        borderTop: "1px solid rgba(255,255,255,.05)",
                        background: "rgb(27 27 27 / 70%)",
                      }}
                    >
                      {/* {topic.name} */}
                      <InputSelection
                        id={`chal${topic.id}`}
                        checked={
                          loadedChallenge
                            ? loadedChallenge.key === topic.id
                            : false
                        }
                        value={topic.id}
                        name="challegesRadios"
                        label={topic.name}
                        type="radio"
                        variant={1}
                        vol={3}
                        inputPos="start"
                        error="Form item error message"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          loadChallenge(e.target.value)
                        }
                      />
                      {/* {topic.description}
                    {topic.image}
                    {topic.id}
                    {topic.self} */}
                    </div>
                  );
                })}
            </div>
          </div>
        </Grid>
      </Banner>

      <Grid tag="main" variant={1}>
        <H2
          className={classnames(text.sectionHeader, grid.goal)}
          vol={6}
          // uppercase
        >
          {loadedChallenge && loadedChallenge.name}
        </H2>
        <H3
          className={classnames(text.color2, grid.goal)}
          vol={4}
          uppercase
          style={{ marginBottom: "10px" }}
        >
          Solutions:
        </H3>
        {loadedChallenge && loadedChallenge.links && (
          <div className={grid.goal}>
            <Grid variant={4}>
              {loadedChallenge.links.ideas ? (
                loadedChallenge.links.ideas.map((item: any) => {
                  // Derive a slug from name.
                  const slug = slugify(item.title, slugConfig);
                  return (
                    <Card
                      title={item.title}
                      url={`/solutions/${item.key}/${slug}`}
                      description={item.description}
                      media={item.images[0]}
                      key={item.key}
                    />
                  );
                })
              ) : (
                <P>No results</P>
              )}
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default Challenges;
