import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import SocialShare from "../components/SocialSahre/SocialShare";
import Card from "../components/Card/Card";
import { H1,H2, H3, P, Grid } from "@actionishope/shelley";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { classes as buttons } from "../styles/puma/button.st.css";
import { api, slug } from "../api";
import ChevRight from "../components/icons/ChevRight";
interface challengesProps {
  group: any;
  search: any;
}

const SearchResults = ({ group, search }: challengesProps) => {
    const [solutions, setSolutions] = useState<any>();
  const [caseStudies, setCaseStudies] = useState<any>();
  const [challenges, setChallenges] = useState<any>();
  const params: any = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);    
      // API for solutions
      api.post(`/ideas/search`,JSON.stringify({"q":params.searchText,"groups": [10479]}))
    .then(async (response) => {     
      console.log(response, " solutions response");
      setSolutions(response.data.data.length?response.data.data:false);
    })
    .catch((error) => {
      console.log(error);
    });
    // API for case-studies
    api
      .get("/news?per-page=15&q="+params.searchText+"&grpId=10479")
      .then(async (response) => {        
        setCaseStudies(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
      api
      .post("/topics/search",JSON.stringify({"q":params.searchText,"groups": [10479]}))
      .then(async (response) => {
        console.log(response, " topics response");
        setChallenges(response.data.data.length?response.data.data:false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.searchText]);

  return (
    <div className={spacing.mb8}>
      <Helmet>
        <title>Search Results - Solutions database</title>
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
       <br></br>
       <Grid tag="main" variant={1}>
          <H3 className={classnames(text.color2, grid.goal, spacing.mb2)}
          vol={7}
          uppercase>
              Search Results For:{params.searchText}
          </H3>
       </Grid>
       <SocialShare url={document.URL} title={'Search Results for: '+params.searchText}></SocialShare>
      <Grid tag="main" variant={1}>
        <H2 className={classnames(text.color2, grid.goal, spacing.mb2)} vol={7} uppercase>
          <Link to="/challenges">Challenges</Link> <ChevRight />
        </H2>
        <div className={grid.goal}>
        {challenges ? (
            <Grid variant={4}>
              {challenges ? (
                challenges.map((item: any) => {
                  return (
                    <Card
                      title={item.name}
                      url={`/solutions/${item.key}`}
                      description={item.description}
                      media={(item.images && item.images[0])}
                      key={item.key}
                    />
                  );
                })
              ) : (
                <P>No search results found!</P>
                )}
            </Grid>
        ) : <P>No search results found!</P>}
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
      {/* Solutions grid start */}
      <Grid tag="main" variant={1}>
        <H2 className={classnames(text.color2, grid.goal, spacing.mb2)} vol={7} uppercase>
          <Link to="/solutions">Solutions</Link> <ChevRight />
        </H2>
        <div className={grid.goal}>
        {solutions ? (
            <Grid variant={4}>
              {solutions ? (
                solutions.map((item: any) => {
                  return (
                    <Card
                      title={item.name}
                      url={`/solutions/${item.key}/${item.name}`}
                      description={item.description}
                      media={item.images[0]}
                      key={item.key}
                    />
                  );
                })
              ) : (
                <P>No search results found!</P>
                )}
            </Grid>
        ) : <P>No search results found!</P>}
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
      </Grid>
      {/* Solutions grid end */}
      {/* CaseStudies grid start */}
      <Grid tag="main" variant={1}>
        <H2 className={classnames(text.color2, grid.goal, spacing.mb2)} vol={7} uppercase>
          <Link to="/case-studies">Case Studies</Link> <ChevRight />
        </H2>
        <div className={grid.goal}>
        {caseStudies ? (
            <Grid variant={4}>
              {caseStudies ? (
                caseStudies.map((item: any) => {
                  return (
                    <Card
                      title={item.title}
                      url={`/case-studies/${item.key}/${slug(item.title)}`}
                      description={item.description}
                      media={item.images[0]}
                      key={item.key}
                    />
                  );
                })
              ) : (
                <P>No search results found!</P>
                )}
            </Grid>
        ) : <P>No search results found!</P>}
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
      </Grid>
      {/* CaseStudies grid end */}
    </div>
  );
};

export default SearchResults;
