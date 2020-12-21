import React from "react";
import classnames from "classnames";
import { st, classes } from "./header.st.css";

import { Grid, GridProps, Text } from "@actionishope/shelley";
import { Link } from "react-router-dom";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";

const Header = ({ className: classNameProp, children, ...rest }: GridProps) => {
  return (
    <Grid
      tag="header"
      className={st(classnames(classes.root, classNameProp))}
      {...rest}
    >
      {/* {children} */}
      <nav className={grid.goal}>
        <ul className={classes.navList}>
          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/">
              Home
            </Link>
          </Text>

          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/challenges">
              Challenges
            </Link>
          </Text>

          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/solutions">
              Solutions
            </Link>
          </Text>

          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/case-studies">
              Case Studies
            </Link>
          </Text>
        </ul>
      </nav>
    </Grid>
  );
};

export default Header;
