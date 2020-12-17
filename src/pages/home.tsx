import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { H1, H2, P, Grid } from "@actionishope/shelley";
import Banner from "../components/Banner/Banner";
import ChevRight from "../components/icons/ChevRight";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { classes as spacing } from "../styles/puma/spacing.st.css";
import { api, slug } from "../api";
import Card from "../components/Card/Card";

const Home = () => {
  const [challenges, setChallenges] = useState<any>();
  const [solutions, setSolutions] = useState<any>();
  const [caseStudies, setCaseStudies] = useState<any>();
  useEffect(() => {
    window.scrollTo(0, 0);
    // API for challenges
    api
      .get(`/groups/10479`)
      .then(async (response) => {        
        setChallenges(response.data.data[0].links.topics);
      })
      .catch((error) => {
        console.error(error);
      });
      // API for solutions
      api.get(`/solutions/10479?per-page=15`)
    .then(async (response) => {     
      setSolutions(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
    // API for case-studies
    api
      .get("/news?per-page=15")
      .then(async (response) => {        
        setCaseStudies(response.data.data);
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
          <P className={classnames(spacing.mb2)} vol={3}>
            We need to understand the challenges before we can fix anything; get
            familiar with our challenges and lets face them together.
          </P>
          {challenges && (
          <div className={classnames(grid.edge)}>
            <Grid variant={4}>
              {challenges ? (
                challenges.map((item: any, index: number) => {
                  if(index < 3){
                  return (
                    <Card
                      title={item.name}
                      url={`/solutions/${item.key}`}
                      description={item.description}
                      media={(item.images && item.images[0])}
                      key={item.key}
                    />
                  );}
                  else {
                    return null;
                  }
                })
              ) : (
                  <P>No results</P>
                )}
            </Grid>
          </div>
        )}
        </div>
        <div className={classnames(text.sectionLinkBanner, grid.edge)}>
          <H2 className={classnames(text.color2)} vol={7} uppercase>
            <Link to="/solutions">Solutions</Link> <ChevRight />
          </H2>
          <P className={classnames(spacing.mb2)} vol={3}>
            Find solutions that are suited to you and framed around a specific
            challenge, the solutions are updated as they evolve.
          </P>
          {solutions && (
          <div className={grid.edge}>
            <Grid variant={4}>
              {solutions ? (
               solutions.map((item: any, index: number) => {
                if(index < 3){
                  return (
                    <Card
                      title={item.name}
                      url={`/solutions/${item.key}/${item.name}`}
                      description={item.description}
                      media={item.images[0]}
                      key={item.key}
                    />
                  );} else {
                    return null;
                  }
                })
              ) : (
                  <P>No results</P>
                )}
            </Grid>
          </div>
        )}
        </div>
        <div className={classnames(text.sectionLinkBanner, grid.edge)}>
          <H2 className={classnames(text.color1)} vol={7} uppercase>
            <Link to="/case-studies">Case Studies</Link> <ChevRight />
          </H2>
          <P  className={classnames(spacing.mb2)} vol={3}>
            Get inspired by the trailblazers that have completed projects and
            are sharing their experiences and become one yourself!
          </P>
          {caseStudies &&
          <div className={grid.edge}>
            <Grid variant={4}>
          {caseStudies ? (
              caseStudies.map((item: any, index: number) => {
                if(index < 3){
                return (
                  <Card
                    title={item.title}
                    url={`/case-studies/${item.key}/${slug(item.title)}`}
                    description={item.description}
                    media={item.images[0]}
                    key={item.key}
                  />
                );} else {
                  return null;
                }
              })) :(
                <P>No results</P>
              )} 
              </Grid>   
            </div>  
          }      
        </div>
      </Grid>
    </div>
  );
};

export default Home;
