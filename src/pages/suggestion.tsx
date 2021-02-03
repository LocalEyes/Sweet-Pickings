import React, { useState,useEffect } from "react";
import { Helmet } from "react-helmet-async";
import classnames from "classnames";
import axios from "axios";
import {
  H1,
  Grid,
  InputText,
  InputSelect,
  Button,
} from "@actionishope/shelley";
import Banner from "../components/Banner/Banner";
import SocialSahre from "../components/SocialSahre/SocialShare";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/puma/suggestion.css";

type Inputs = {
  title: string,
  main_content: string,
  suggestion_type: string,
};

const Suggestion = () => {
  const params: any = useParams();
  const [defaultSelection, setDefaultSelection] = useState<string>('');
  const { register, handleSubmit, errors, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(JSON.stringify(data));    
    // API post
    axios.post("https://2zxjdrcbe6.execute-api.eu-west-2.amazonaws.com/v1/suggestions", JSON.stringify(data),  {
      headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'gma5wSaqQv8bZ6dVgF4JA1C64dO3pVvw5C8IsLbp'
      }
    })
    .then(async(response) => {
      console.log(response.data)
      toast("Your suggestion is submitted!!", {type: "success"})
      //reset the form
      reset();
      setDefaultSelection('');
    })
    .catch((error) => {
      toast("Some error occured while submitting your suggestion", {type: "error"})
      console.error(error);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    switch (params.type){
      case 'solution':
        setDefaultSelection('solution');
        break;
      case 'case-study':
        setDefaultSelection('case_study');
        break;
      case 'challenge':
        setDefaultSelection('challenge');
        break;
      default:
        setDefaultSelection('');
    }
  }, [params.type]);
  return (
    <div className={spacing.mb8}>
      <Helmet>
        <title>Make a suggestion - Solutions database</title>
        <meta name="description" content="Suggest something!"/>
        <meta property="og:title" content="Make a suggestion"/>
        <meta property="og:description" content="Suggest something!"/>
        <meta property="og:image" content="url(https://ik.imagekit.io/tcvka0ufln/home_TUhFZjeTJ.jpg)"/>
        <meta property="og:type" content="website"/>
      </Helmet>
      <Banner
        className={grid.edge}
        media={
          <div
            style={{
              opacity: 0.15,
              backgroundImage: `url(https://ik.imagekit.io/tcvka0ufln/home_TUhFZjeTJ.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "0 50%",
            }}
          />
        }
      >
        <H1 vol={8} uppercase>
          <span className={classnames(text.textBannerInline, text.textBg2)}>
            Make a suggestion
          </span>
        </H1>
      </Banner>
      <br />
      <Grid tag="main" variant={1} formatted>
        <div className={grid.mid}>
        <form className="suggestionForm" onSubmit={handleSubmit(onSubmit)}>
          <InputSelect
            label={`Suggestion type`}
            name="suggestion_type"
            ref={register({ required: true})}
            placeholder="Please select"
            vol={3}
            variant={3}
            id={`sol2`}
            value={defaultSelection}
            onChange = {(e) => {setDefaultSelection(e.target.value)}}
          >
            <option value=''>--Please Select--</option>
            <option value={`case_study`}>Case Study</option>
            <option value={`solution`}>Solution</option>
            <option value={`challenge`}>Challenge</option>
          </InputSelect>
          {errors.suggestion_type && <p>This field is required</p>}
          <br />
          <br />
          <InputText
            placeholder="Title..."
            name="title"
            ref={register({ required: true})}
            label={`Title`}
            vol={3}
            variant={3}
            id={`sol1`}
          />
          {errors.title && <p>This field is required</p>}
          <br />
          <br />
          <InputText
            label={`Main content`}
            name="main_content"
            ref={register({ required: true})}
            placeholder="Start typing..."
            vol={3}
            variant={3}
            rows={10}
            id={`sol3`}
          />
          {errors.main_content && <p>This field is required</p>}
          <Button
            variant={3}
            vol={5}
            tone={5}
            className={spacing.mt2}
            fullWidth
            type="submit"
          >
            Submit
          </Button>
          </form>
        </div>
      </Grid>
      <SocialSahre title={'Suggestion page'} url={document.URL}></SocialSahre>
      {/* toast for form status */}
      <ToastContainer
      position="bottom-center"
      autoClose={4000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      />
    </div>
  );
};

export default Suggestion;
