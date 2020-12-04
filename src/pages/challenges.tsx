import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Helmet } from "react-helmet-async";
import { api, slug } from "../api";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import { H1, H2, H3, InputSelection, P, Grid } from "@actionishope/shelley";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { classes as buttons } from "../styles/puma/button.st.css";
import { Link } from "react-router-dom";

interface ChallengesProps {
  group: any;
}

const Challenges = ({ group }: ChallengesProps) => {
  const [loadedChallenge, setLoadedChallenge] = useState<any>();

  const loadChallenge = (topicKey: string) => {
    api
      .get(`/topics/${topicKey}`)
      .then(async (response) => {
        setLoadedChallenge(response.data.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Get the default topic data.
    group && loadChallenge(group.links.topics[0].key);
  }, [group]);

  return (
    <div className={spacing.mb8}>
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
                  console.log("topic", topic, index);
                  // console.log("selected topic", loadedChallenge);
                  return (
                    <div
                      style={{
                        padding: "10px 18px",
                        borderTop: "1px solid rgba(255,255,255,.05)",
                        background: "rgb(27 27 27 / 70%)",
                      }}
                      key={`topics${topic.key}`}
                    >
                      <InputSelection
                        id={`chal${topic.key}`}
                        checked={
                          loadedChallenge
                            ? loadedChallenge.key === topic.key
                            : false
                        }
                        value={topic.key}
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
                    </div>
                  );
                })}
            </div>
          </div>
        </Grid>
      </Banner>

      <Grid tag="main" variant={1}>
        <H2 className={classnames(text.sectionHeader, grid.goal)} vol={6}>
          {loadedChallenge && loadedChallenge.name}
        </H2>
        <P className={classnames(grid.goal, spacing.mb4)}>
          {loadedChallenge && loadedChallenge.description}
        </P>
        <H3
          className={classnames(text.color2, grid.goal, spacing.mb2)}
          vol={6}
          uppercase
        >
          Solutions:
        </H3>
        {loadedChallenge && loadedChallenge.links && (
          <div className={grid.goal}>
            <Grid variant={4}>
              {loadedChallenge.links.ideas ? (
                loadedChallenge.links.ideas.map((item: any) => {
                  return (
                    <Card
                      title={item.title}
                      url={`/solutions/${item.key}/${slug(item.title)}`}
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

        <Grid
          variant={2}
          formatted
          className={classnames(spacing.mt2, spacing.mb4)}
        >
          <Link to="/solutions" className={buttons.link}>
            Find more solutions
          </Link>

          <Link to="/suggestion" className={buttons.link}>
            Suggest a solution
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Challenges;
