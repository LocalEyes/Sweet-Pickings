import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { H1, H2, P, Grid } from "@actionishope/shelley";
import Banner from "../components/Banner/Banner";
import SocialShare from "../components/SocialSahre/SocialShare";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { classes as spacing } from "../styles/puma/spacing.st.css";
import { classes as buttons } from "../styles/puma/button.st.css";
import { api, slug } from "../api";
import Card from "../components/Card/Card";

interface challengesProps {
  group: any;
}

const Home = ({ group }: challengesProps) => {  
  const [solutions, setSolutions] = useState<any>();
  const [caseStudies, setCaseStudies] = useState<any>();
  useEffect(() => {
    window.scrollTo(0, 0);    
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
        <meta name="description" content="Practical ideas for climate action and nature recovery"/>
        <meta property="og:title" content="Local Eyes"/>
        <meta property="og:description" content="Practical ideas for climate action and nature recovery"/>
        <meta property="og:image" content="url(https://ik.imagekit.io/tcvka0ufln/home_TUhFZjeTJ.jpg)"/>
        <meta property="og:type" content="website"/>
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
          <span className={text.textBg}>NATURE &</span>
          <br />
          <span className={text.textBg}>CLIMATE</span>
          <br />
          <span className={text.textBg}>SOLUTIONS</span>
        </H1>
        <br />
        <H2 className={grid.goal} vol={5} uppercase>
          <span className={text.textBg}>PRACTICAL IDEAS FOR CLIMATE ACTION AND NATURE RECOVERY</span>
        </H2>
      </Banner>
      <Grid tag="main" variant={1} formatted>
      <div className={classnames(text.sectionLinkBanner, grid.edge)}>
          <H2 className={classnames(text.color2,text.center)} vol={7} uppercase>
            <Link to="/solutions"><i className="fa fa-ellipsis-h" aria-hidden="true" style={{fontSize: "40px"}}></i>Solutions<i className="fa fa-ellipsis-h" aria-hidden="true" style={{fontSize: "40px"}}></i></Link>
          </H2>
          <P className={classnames(spacing.mb2,text.center)} vol={3}>
            DISCOVER STEP-BY-STEP GUIDES TO TAKING ENVIRONMENTAL ACTION
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
                      description={item.excerpt ? item.excerpt : item.description}
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

        <Link to="/suggestion/solution" className={buttons.link}>
          Suggest a solution
        </Link>
        </Grid>
        </div>
        <div className={classnames(text.sectionLinkBanner, grid.edge)}>
          <H2 className={classnames(text.color1,text.center)} vol={7} uppercase>
            <Link to="/case-studies"><i className="fa fa-ellipsis-h" aria-hidden="true" style={{fontSize: "40px"}}></i>Case Studies<i className="fa fa-ellipsis-h" aria-hidden="true" style={{fontSize: "40px"}}></i></Link>
          </H2>
          <P  className={classnames(spacing.mb2,text.center)} vol={3}>
            GET INSPRIED BY THE TRAILBLAZERS WHO HAVE CREATED POSITIVE CHANGE
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
                    description={item.excerpt ? item.excerpt : item.description}
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
           <Link to="/case-studies" className={buttons.link}>
              Find more case studies
            </Link>

            <Link to="/suggestion/case-study" className={buttons.link}>
              Suggest a case study
            </Link>
            </Grid>
        </div>
        <div className={classnames(text.sectionLinkBanner,grid.edge)}>
            <H2 className={classnames(text.color3,text.center)} vol={7} uppercase>
              <Link to="/challenges"><i className="fa fa-ellipsis-h" aria-hidden="true" style={{fontSize: "40px"}}></i>Challenges<i className="fa fa-ellipsis-h" aria-hidden="true" style={{fontSize: "40px"}}></i></Link>
            </H2>
            <P className={classnames(spacing.mb2,text.center)} vol={3}>
              EXPLORE & OVERCOME THE MOST URGENT ENVIRONMENTAL ISSUES
            </P>
          {group && (
          <div className={classnames(grid.edge)}>
            <Grid variant={4}>
              {group.links.topics ? (
                group.links.topics.map((item: any, index: number) => {
                  if(index < 3){
                  return (
                    <Card
                      title={item.name}
                      url={`/solutions/${item.key}`}
                      description={item.excerpt ? item.excerpt : item.description}
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
         <Link to="/challenges" className={buttons.link}>
              Find more challenges
            </Link>
            <Link to="/suggestion/challenge" className={buttons.link}>
              Suggest a challenge
            </Link>
            </Grid>
        </div>
      </Grid>
      <SocialShare title={'Home page'} url={document.URL} description="Practical ideas for climate action and nature recovery"></SocialShare>
    </div>
  );
};

export default Home;
