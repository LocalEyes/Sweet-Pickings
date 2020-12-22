import React, { useState,useEffect } from "react";
import { Helmet } from "react-helmet-async";
import classnames from "classnames";
import {
  H1,
  Grid,
  InputText,
  InputSelect,
  Button,
} from "@actionishope/shelley";
import Banner from "../components/Banner/Banner";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "../styles/puma/suggestion.css"

type Inputs = {
  title: string,
  main_content: string,
  suggestion_type: string,
};

const Suggestion = () => {
  const params: any = useParams();
  const [defaultSelection, setDefaultSelection] = useState<string>('');
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(JSON.stringify(data));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    switch (params.type){
      case 'solution':
        setDefaultSelection('plastic');
        break;
      case 'case-study':
        setDefaultSelection('carbon');
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
      </Helmet>
      <Banner
        className={grid.edge}
        style={{
          marginBottom: "3vw",
        }}
      >
        <H1 vol={8} uppercase>
          <span className={classnames(text.textBannerInline, text.textBg2)}>
            Make a suggestion
          </span>
        </H1>
      </Banner>
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
            <option value={`carbon`}>Case Study</option>
            <option value={`plastic`}>Solution</option>
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
    </div>
  );
};

export default Suggestion;
