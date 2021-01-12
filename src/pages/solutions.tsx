import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner/Banner";
import SocialSahre from "../components/SocialSahre/SocialShare";
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
  InputSelect,
} from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { classes as spacing } from "../styles/puma/spacing.st.css";
import { useParams } from "react-router-dom";
import "../styles/puma/solutions.css";
import 'font-awesome/css/font-awesome.min.css';

interface ChallengesProps {
  group: any;
}

const Solutions = ({ group }: ChallengesProps) => {
  const [content, setContent] = useState<any>([]);
  const [metaData, setMetaData] = useState<any>();
  const [allSolutionsSelected, setallSolutionsSelected] = useState<any>(false);
  const params: any = useParams();
  const [filterData, setFilterData] = useState<any>({groups: [], topics: [], categories: [], q: ''});
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
          images: data.images
        });
          setMetaData(response.data.meta);
          setallSolutionsSelected(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const loadAllSolutions = () => {
    api.get(`/solutions/10479?per-page=15`)
    .then(async (response) => {
      const data =  response.data.data;      
      setContent({
        data: data,        
      });
      setMetaData(response.data.meta);
      setallSolutionsSelected(true);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  useEffect(() => {
    // Get the default topic data.    
    if (params.topicId == null) {
      loadAllSolutions();
    } else {
      params.topicId && loadTopic(params.topicId);
    }
    // group && loadTopic(group.links.topics[0].key);
  }, [group, params]);

  useEffect(() => {
    console.log('Filter Options', filterData);
    api.post(`/ideas/search`, filterData)
    .then(async(response) => {
      console.log("Response ", response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  },[filterData])

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
              <div
                      style={{
                        padding: "10px 18px",
                        borderTop: "1px solid rgba(255,255,255,.05)",
                        background: "rgb(27 27 27 / 70%)",
                      }}
                      key={`topics`}
                    >
                      <InputSelection
                        id={`chal`}
                        checked={
                          allSolutionsSelected
                            ? true
                            : false
                        }
                        // value={topic.key}
                        name="challegesRadios"
                        label='All Challenges'
                        type="radio"
                        variant={1}
                        vol={3}
                        inputPos="start"
                        error="Form item error message"
                        onChange={()=> {
                          loadAllSolutions();
                        }}                        
                      />
                    </div>
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
        {allSolutionsSelected ? <div className={grid.goal}></div>: <div className={grid.goal} ><H2 className={classnames(grid.goal, spacing.mb1)} vol={6}>
          {content && content.name}
        </H2>
        <P className={classnames(grid.goal, spacing.mb2)}>
          {content && content.description}
        </P></div>}
        <div className={`${grid.goal} filterSection`}>
        <div className="filterBar" id='stickyHeader'>
        <i className="fa fa-filter" aria-hidden="true" style={{fontSize: "40px", paddingTop: '12px'}}></i>
        <InputSelect className = "inputFilter"
            label={`Challenges`}
            placeholder="Please select"
            vol={2}
            variant={2}
            id={`sol1`}
            onChange = { (e) => {setFilterData({...filterData, groups: [e.target.value]})}}
          >
            <option value="">--Please Select--</option>
            {group && group.links.topics.map((topic: any) => {
              return (<option value={topic.key}>{topic.name}</option>);
            })}
          </InputSelect> 
          <InputSelect className = "inputFilter"
            label={`Organisation Type`}
            placeholder="Please select"
            vol={2}
            variant={2}
            id={`sol2`}
            onChange = { (e) => {setFilterData({...filterData, topics: [e.target.value]})}}
          >
            <option value="">--Please Select--</option>
            <option value={`1`}>Org Type 1</option>
            <option value={`2`}>Org Type 2</option>
          </InputSelect>
          <InputSelect className = "inputFilter"
            label={'Category'}
            placeholder="Please select"
            vol={2}
            variant={2}            
            id={`sol3`}
            onChange = { (e) => {setFilterData({...filterData, categories: [e.target.value]})}}
          >
            <option value="">--Please Select--</option>
            <option value={`1`}>Cat entry 1</option>
            <option value={`2`}>Cat entry 2</option>
          </InputSelect>
         
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
      <SocialSahre title={(content && content.name) ? content.name : 'Solutions'} url={document.URL}></SocialSahre>
    </div>
  );
};

export default Solutions;
