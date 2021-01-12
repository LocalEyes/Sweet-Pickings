import React, {useState, useEffect} from "react";
import classnames from "classnames";
import { st, classes } from "./header.st.css";
import { Grid, GridProps, Text, Button } from "@actionishope/shelley";
import { Link } from "react-router-dom";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";

// @ts-ignore
import { useMediaQuery } from 'react-responsive';

const Header = ({ className: classNameProp, children, ...rest }: GridProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [burgerManager, setBurgerManager] = useState<boolean>(false);

  useEffect(() => {
    !isTabletOrMobile && setBurgerManager(false);
  },[isTabletOrMobile]);
  
  return (
    <Grid
      tag="header"
      className={st(classnames(classes.root, classNameProp, burgerManager && classes.header_burger_border))}
      {...rest}
    >
      {/* {children} */}
      <nav className={grid.goal}>
        <div className={classes.flex_spaceBetween}>
        {isTabletOrMobile ? <div className={classes.burger_style} onClick={() => {setBurgerManager(!burgerManager)}}>
            <div></div>
            <div></div>
            <div></div>
          </div> : <ul className={classes.navList}>
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
        </ul> }                 
        <div className={classes.search_div}>
        <input type="text" id="fname" name="firstname" placeholder="Search..." className={classes.search_field}/>
          <Button tone={4} variant={3} vol={3} className={classes.search_button} as="li">
          Search
        </Button>
        </div>
        </div>
      </nav>
      <br/>      
      <div className={classnames(grid.goal, classes.burger_options)} hidden={!burgerManager}>
      <div>
        <a href='/'>Home</a>          
      </div>
      <div>
        <a href='/challenges'>Challenges</a>
      </div>
      <div>
        <a href='/solutions'>Solutions</a>
      </div>
      <div className={classes.last_div}>
        <a href='/case-studies'>Case Studies</a>
      </div>
      </div>     
    </Grid>
  );
};

export default Header;
