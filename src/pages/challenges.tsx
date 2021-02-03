import React from "react";
import classnames from "classnames";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner/Banner";
import SocialShare from "../components/SocialSahre/SocialShare";
import Card from "../components/Card/Card";
import { H1, H3, P, Grid } from "@actionishope/shelley";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import headerImage from "../images/environmental-solutions-how-to-guide-tree-planting-swansea-environmental-forumn-vocaleyes-4.jpg";

interface ChallengesProps {
  group: any;
}

// ({ group }: ChallengesProps) -> props for Challenges
const Challenges = ({ group }: ChallengesProps) => {
  // const [loadedChallenge] = useState<any>();


  // const loadChallenge = (topicKey: string) => {
  //   api
  //     .get(`/topics/${topicKey}`)
  //     .then(async (response) => {
  //       setLoadedChallenge(response.data.data[0]);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   // Get the default topic data.
  //   group && loadChallenge(group.links.topics[0].key);
  // }, [group]);

  return (
    <div className={spacing.mb8}>
      <Helmet>
        <title>Challenges - Solutions database</title>
        <meta name="description" content="We need to understand the challenges before we can fix anything; get familiar with our challenges and lets face them together."/>
        <meta property="og:title" content="Challenges"/>
        <meta property="og:description" content="We need to understand the challenges before we can fix anything; get familiar with our challenges and lets face them together."/>
        <meta property="og:image" content={headerImage}/>
        <meta property="og:type" content="website"/>
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
              backgroundImage: `url(${headerImage})`,
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

          {/* <div className={grid.mid}>
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
          </div> */}
        </Grid>
      </Banner>

      <Grid tag="main" variant={1}>
        <H3
          className={classnames(text.color2, grid.goal, spacing.mb2)}
          vol={6}
          uppercase
        >
          Challenges:
        </H3>
        {group && group.links && (
          <div className={grid.goal}>
            <Grid variant={4}>
              {group.links.topics ? (
                group.links.topics.map((item: any) => {
                  return (
                    <Card
                      title={item.name}
                      url={`/solutions/${item.key}`}
                      description={item.excerpt ? item.excerpt : item.description}
                      media={(item.images && item.images[0])}
                      key={item.key}
                    />
                  );
                })
              ) : (
                  <P>No results</P>
                )}
            </Grid>
            <SocialShare url={document.URL} title={'Challenges'} description="We need to understand the challenges before we can fix anything; get familiar with our challenges and lets face them together."></SocialShare>
          </div>
        )}

      </Grid>
    </div>
  );
};

export default Challenges;
