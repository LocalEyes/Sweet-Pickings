import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner/Banner";
import SocialShare from "../components/SocialSahre/SocialShare";
import Card from "../components/Card/Card";
import { api, slug } from "../api";
import {
  H1,
  H2,
  Grid,
  Button,
  VisuallyHidden,
  P,
  H3,
} from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { classes as spacing } from "../styles/puma/spacing.st.css";
import { useParams } from "react-router-dom";
import "../styles/puma/solutions.css";
import 'font-awesome/css/font-awesome.min.css';
import Select from 'react-select';

interface ChallengesProps {
  group: any;
}

interface postData{
  groups: Array<number>,
  topics: Array<number>,
  categories: Array<string>,
  q: string,
  categoryOperator: string
}

const Solutions = ({ group }: ChallengesProps) => {
  const [content, setContent] = useState<any>([]);
  const [metaData, setMetaData] = useState<any>();
  const [allSolutionsSelected, setallSolutionsDataFormatSelected] = useState<any>(false);  
  const params: any = useParams();
  const [mainCategories, setMainCategories] = useState<any>();
  const [organisationTypes, setOrganisationTypes] = useState<any>();
  const [stakeHolders, setStakeHolders] = useState<any>();
  let filterData: postData = {groups: [10479], topics: [], categories: [], q: '', categoryOperator: 'AND'};
  const [topicSelected, setTopic] = useState<any>();
  const [categorySelected, setCategory] = useState<any>();
  const [organisationTypeSelected, setOrganisationType] = useState<any>();
  const [stakeHolderSelected, setStakeHolder] = useState<any>();
  const isFirstRun = useRef(true);
  
  let solutionsData: any;

  const loadTopic = (topicKey: string) => {
    api
      .get(`/topics/${topicKey}?per-page=15`)
      .then(async (response) => {
        const data =  response.data.data[0];
        setContent({
          data: data.links.ideas,
          name: data.name,
          description: data.description,
          key: data.key,
          images: data.images,
          mainCategores:  data.categories && data.categories.main_categories ? data.categories.main_categories.items : false,
          orgTypes: data.categories && data.categories.organisation_types ? data.categories.organisation_types.items : false,
          stakeholders: data.categories && data.categories.stakeholders ? data.categories.stakeholders.items : false,
        });
          setMetaData(response.data.meta);
          setallSolutionsDataFormatSelected(false);         
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const loadAllSolutions = () => {
    api.get(`/solutions/10479?per-page=15`)
    .then(async (response) => {
      solutionsData =  response.data.data;
      setContent({
        data: solutionsData,        
      });
      setMetaData(response.data.meta);
      setallSolutionsDataFormatSelected(true);      
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {    

    params.topicId && group && group.links.topics.forEach((topic: any) => {
      if(params.topicId === topic.key.toString()){        
        setTopic({label: topic.name, value: topic.key})
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[group])

  useEffect(() => {
    // Get the default topic data.    
    if (params.topicId == null) {
      loadAllSolutions();    

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=> {
    // API for main categories
    api.get("/categories/main_categories")
    .then(async (response) => {      
      console.log('categories:',response.data);
      setMainCategories(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
    // API for organisation types
    api.get("/categories/organisation_types")
    .then(async (response) => {      
      console.log('organisation_types:',response.data);
      setOrganisationTypes(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
    // API for StakeHolders
    api.get("/categories/stakeholders")
    .then(async (response) => {      
      console.log('stakeholders:',response.data);
      setStakeHolders(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    filterData.topics = [];
    filterData.categories = [];
    topicSelected && filterData.topics.push(topicSelected.value);
    categorySelected && filterData.categories.push(categorySelected);
    organisationTypeSelected && filterData.categories.push(organisationTypeSelected);
    stakeHolderSelected && filterData.categories.push(stakeHolderSelected);
    console.log('Filter Options', filterData);
    if(filterData.categories.length !== 0){
      console.log(filterData); 
      api.post(`/ideas/search`, JSON.stringify(filterData))
      .then(async(response) => {
        const data =  response.data.data;
      setContent({
        data: data,        
      });
      setMetaData(response.data.meta);      
      setallSolutionsDataFormatSelected(true);    
      console.log("Response ", response.data);
      })
      .catch((error) => {
        console.error(error);
      });      
    } else if(filterData.topics.length !== 0 ) {
      loadTopic(filterData.topics[0].toString());
    } 
    else {
      loadAllSolutions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[topicSelected, categorySelected, organisationTypeSelected, stakeHolderSelected])

  useEffect(()=>{
    const stickyHeader: HTMLElement | null = document.getElementById("stickyHeader");
    const sticky = stickyHeader && stickyHeader.offsetTop;
    window.addEventListener("scroll", () => {
      if(sticky){
        if (window.pageYOffset > sticky) {
          stickyHeader && stickyHeader.classList.add("sticky");
        } else {
          stickyHeader && stickyHeader.classList.remove("sticky");
        }
      }
    });
  },[])

  return (
    <div className={spacing.mb8}>
      <Helmet>
        <title>Solutions database</title>
        <meta name="description" content="Find solutions that are suited to you and framed around a specific challenge, the solutions are updated as they evolve."/>
        <meta property="og:title" content="Solutions"/>
        <meta property="og:description" content="Find solutions that are suited to you and framed around a specific challenge, the solutions are updated as they evolve."/>
        <meta property="og:image" content="url(https://ik.imagekit.io/tcvka0ufln/solutions1_Rpskm-eQ_.jpg)"/>
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
        </Grid>
      </Banner>
      <Grid tag="main" variant={1} formatted>
        <VisuallyHidden>
          <H2 className={classnames(text.sectionHeader, grid.goal)} vol={7}>
            Results
          </H2>
        </VisuallyHidden>
        {allSolutionsSelected ? <div className={grid.goal}></div>: <div className={grid.goal} ><H2 className={classnames(grid.goal, spacing.mb1)} vol={6}>
          {content && content.name}
        </H2>        
        <P className={classnames(grid.goal, spacing.mb2)}>
          {content && content.description}
        </P>
        <P vol={2}>
        {content.mainCategores || content.orgTypes || content.stakeholders ? <strong>Relevant for: </strong> : null}
            {content.mainCategores &&
              content.mainCategores.map((item: any, index: number) => {
                const tail = index !== content.mainCategores.length - 1 ? ", " : content.orgTypes && content.orgTypes.length !== 0 && ", ";
                return (
                  <span key={`cattypes${index}`}>
                    {item.cat_name}
                    {tail}
                  </span>
                );
              })}
            {content.orgTypes &&
              content.orgTypes.map((item: any, index: number) => {
                const tail = index !== content.orgTypes.length - 1 ? ", " :  content.stakeholders && content.stakeholders.length !== 0 && ", ";
                return (
                  <span key={`cattypes${index}`}>
                    {item.cat_name}
                    {tail}
                  </span>
                );
              })}
              {content.stakeholders &&
              content.stakeholders.map((item: any, index: number) => {
                const tail = index !== content.stakeholders.length - 1 && ", ";
                return (
                  <span key={`cattypes${index}`}>
                    {item.cat_name}
                    {tail}
                  </span>
                );
              })}
              </P>
        </div>}
        <div className={`${grid.goal} filterSection`}>
        <div className="filterBar" id='stickyHeader'>

        <i className="fa fa-filter" aria-hidden="true" style={{fontSize: "40px"}}></i>
        <Select className = "inputFilter" isClearable
            placeholder = "Select Challenge..."
            value = {topicSelected}
            options={group && group.links.topics.map((topic: any) => {
              return ({label: topic.name, value: topic.key});
            })}
            onChange = {(e) => {
              setTopic(e && e)
            }}
          />
          <Select className = "inputFilter" isClearable
            placeholder="Select Organization..."
            options={organisationTypes && organisationTypes.data.map((organisation: any)=>{
              return ({label: organisation.name, value: organisation.code})
            })}
            onChange={(e) => {
              setOrganisationType(e && e.value)
            }}
          />          
          <Select className = "inputFilter" isClearable
            placeholder="Select Category..."
            options={mainCategories && mainCategories.data.map((categories: any)=>{
              return ({label: categories.name, value: categories.code})
            })}
            onChange={(e) => {
              setCategory(e && e.value)
            }}
          />
          <Select className = "inputFilter" isClearable
            placeholder="Who Are You..."
            options={stakeHolders && stakeHolders.data.map((stakeHolder: any)=>{
              return ({label: stakeHolder.name, value: stakeHolder.code})
            })}
            onChange={(e) => {
              setStakeHolder(e && e.value)
            }}
          />
        </div>
        <br/>
        </div>
        
        <H3
          className={classnames(text.color2, grid.goal, spacing.mb2)}
          vol={6}
          uppercase
        >
          Solutions:
        </H3>
        {content && content.data && (
          <div className={grid.goal}>
            <Grid variant={4}>
              {content.data ? (
                content.data.map((item: any) => {
                  return (
                    <Card
                      title={allSolutionsSelected ? item.name && item.name : item.title && item.title}
                      url={`/solutions/${item.key}/${allSolutionsSelected ? item.name && slug(item.name) : item.title && slug(item.title)}`}
                      description={item.excerpt ? item.excerpt : item.description}
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
                      if(allSolutionsSelected){
                        const data =  response.data.data;
                        setContent({
                          data: data,                          
                        });
                      } else {
                        const data =  response.data.data[0];
                        setContent({
                          data: data.links.ideas,
                          name: data.name,
                          description: data.description,
                          key: data.key,
                          images: data.images
                        });                          
                      }
                      setMetaData(response.data.meta);  
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
                      if(allSolutionsSelected){
                        const data =  response.data.data;
                        setContent({
                          data: data,                          
                        });
                      } else {
                        const data =  response.data.data[0];
                        setContent({
                          data: data.links.ideas,
                          name: data.name,
                          description: data.description,
                          key: data.key,
                          images: data.images
                        });                          
                      }
                      setMetaData(response.data.meta);   
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
      <SocialShare title={(content && content.name) ? content.name : 'Solutions'} url={document.URL} description="Find solutions that are suited to you and framed around a specific challenge, the solutions are updated as they evolve."></SocialShare>
    </div>
  );
};

export default Solutions;
