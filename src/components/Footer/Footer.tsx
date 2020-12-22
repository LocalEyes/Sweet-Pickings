import React from "react";
import classnames from "classnames";
import { st, classes } from "./footer.st.css";

import { Grid, GridProps, Text } from "@actionishope/shelley";
import { Link } from "react-router-dom";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";

const Footer = ({ className: classNameProp, children, ...rest }: GridProps) => {
  return (
    <Grid
      tag="footer"
      className={st(classnames(classes.root, classNameProp))}
      {...rest}
    >
      <nav className={grid.goal}>
        <ul className={classes.navList}>
          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/about">
              About
            </Link>
          </Text>
          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/suggestion">
              SUGGEST CONTENT
            </Link>
          </Text>
        </ul>
      </nav>

      {children}
    </Grid>
  );
};

export default Footer;
