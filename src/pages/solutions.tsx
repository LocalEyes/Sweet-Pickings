import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import { api, slug } from "../api";
import {
  H1,
  H2,  
  Grid,
  Button,
  VisuallyHidden,
  InputSelection,
  P,
  H3,
} from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { classes as spacing } from "../styles/puma/spacing.st.css";
import { useParams } from "react-router-dom";

interface ChallengesProps {
  group: any;
}

const Solutions = ({ group }: ChallengesProps) => {  
  const [content, setContent] = useState<any>([]);
  const [metaData, setMetaData] = useState<any>();
  const params: any = useParams();
  const loadTopic = (topicKey: string) => {
    api
      .get(`/topics/${topicKey}?per-page=15`)
      .then(async (response) => {
        setContent(response.data.data[0]);
        setMetaData(response.data.meta);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    // Get the default topic data.    
    if(params.topicId == null){      
      group && loadTopic(group.links.topics[0].key);
    } else {      
      params.topicId && loadTopic(params.topicId);
    }
    // group && loadTopic(group.links.topics[0].key);
  }, [group]);

  return (
    <div className={spacing.mb8}>
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
            <P vol={2} style={{ marginBottom: "10px" }}>
              <b>Select a topic from the scroll list:</b>
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
                  // console.log("selected topic", content);
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
                          content
                            ? content.key === topic.key
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
                          loadTopic(e.target.value)
                        }
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </Grid>
      </Banner>
      <Grid tag="main" variant={1} formatted>
        <VisuallyHidden>
          <H2 className={classnames(text.sectionHeader, grid.goal)} vol={7}>
            Results
          </H2>
        </VisuallyHidden>

        <H2 className={classnames(text.sectionHeader, grid.goal)} vol={6}>
          {content && content.name}
        </H2>
        <P className={classnames(grid.goal, spacing.mb4)}>
          {content && content.description}
        </P>
        <H3
          className={classnames(text.color2, grid.goal, spacing.mb2)}
          vol={6}
          uppercase
        >
          Solutions:
        </H3>
        {content && content.links && (
          <div className={grid.goal}>
            <Grid variant={4}>
              {content.links.ideas ? (
                content.links.ideas.map((item: any) => {
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
          {metaData && (
            <>
              <Button
                variant={3}
                tone={5}
                vol={6}
                role="link"
                fullWidth
                disabled={!metaData.pagination.links.prev}
                onClick={() => {
                  // Change to smooth scroll and refs.
                  window.scrollTo(0, 0);
                  api
                    .get(metaData.pagination.links.prev)
                    .then(async (response) => {
                      setContent(response.data.data[0]);
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
                disabled={!metaData.pagination.links.next}
                onClick={() => {
                  // Change to smooth scroll and refs.
                  window.scrollTo(0, 0);
                  api
                    .get(metaData.pagination.links.next)
                    .then(async (response) => {
                      setContent(response.data.data[0]);
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
