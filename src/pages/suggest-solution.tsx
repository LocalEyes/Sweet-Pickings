import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import classnames from "classnames";
import {
  H1,
  P,
  Grid,
  InputText,
  InputSelect,
  Button,
} from "@actionishope/shelley";
import Banner from "../components/Banner/Banner";
import { classes as spacing } from "@actionishope/shelley/styles/default/spacing.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as text } from "../styles/puma/text.st.css";
import { groupEnd } from "console";

const SuggestSolution = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={spacing.mb8}>
      <Helmet>
        <title>Suggest a solution - Solutions database</title>
      </Helmet>
      <Banner
        className={grid.edge}
        style={{
          marginBottom: "3vw",
        }}
      >
        <H1 vol={8} uppercase>
          <span className={classnames(text.textBannerInline, text.textBg2)}>
            Suggest a Solution
          </span>
        </H1>
      </Banner>
      <Grid tag="main" variant={1} formatted>
        <div className={grid.mid}>
          <InputText
            placeholder="Solution title..."
            label={`Title of your solution`}
            vol={3}
            variant={3}
            id={`sol1`}
          />
          <br />
          <br />
          <InputSelect
            placeholder="How can we reduce our carbon footprint?"
            label={`Select the challenge which most relates`}
            vol={3}
            variant={3}
            id={`sol2`}
          >
            <option value={`carbon`}>
              How can we reduce our carbon footprint?
            </option>
            <option value={`plastic`}>
              How can we reduce our single use plastic?
            </option>
          </InputSelect>
          <br />
          <br />
          <InputText
            placeholder="Solution content..."
            label={`Main content`}
            vol={3}
            variant={3}
            rows={10}
            id={`sol3`}
          />
          <Button
            variant={3}
            vol={5}
            tone={5}
            className={spacing.mt2}
            fullWidth
          >
            Submit
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default SuggestSolution;
