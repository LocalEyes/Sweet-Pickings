import React from "react";
import classnames from "classnames";
import { st, classes } from "./banner.st.css";

import { Grid, GridProps } from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";

interface BannerProps extends GridProps {
  media?: React.ReactNode;
  tone?: number;
}

const Banner = ({
  className: classNameProp,
  media,
  tone = 1,
  children,
  ...rest
}: BannerProps) => {
  return (
    <Grid
      tag="header"
      className={st(classnames(classes.root, classNameProp), { tone })}
      {...rest}
    >
      <div className={classnames(grid.goal, classes.text)}>{children}</div>
      <figure className={classnames(grid.edge, classes.media)}>{media}</figure>
    </Grid>
  );
};

export default Banner;
