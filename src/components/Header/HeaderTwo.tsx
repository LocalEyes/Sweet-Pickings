import React, {useState, useEffect} from "react";
import classnames from "classnames";
import { st, classes } from "./headerTwo.st.css";
import { Grid, GridProps, Text, Button } from "@actionishope/shelley";
import { Link } from "react-router-dom";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";

// @ts-ignore
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';

const Header = ({ className: classNameProp, children, ...rest }: GridProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [burgerManager, setBurgerManager] = useState<boolean>(false);
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    !isTabletOrMobile && setBurgerManager(false);
  },[isTabletOrMobile]);
  
  return (
    <div className="headerTwo">
    <Grid
      tag="header"
      className={st(classnames(classes.root, classNameProp, burgerManager && classes.header_burger_border))}
      {...rest}
    >
      {/* {children} */}
      <nav className={grid.goal} >
        <div className={classes.flex_spaceBetween} >
        {/* {isTabletOrMobile ? <div className={classes.burger_style} onClick={() => {setBurgerManager(!burgerManager)}}>
          </div> : <ul className={classes.navList}>
          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/">
              Home
            </Link>
          </Text> */}

          {/* <Text uppercase vol={4} as="li"> */}
            <Link className={classes.navItem} to="/challenges">
                Grow for us, pick with us
            </Link>
          {/* </Text> */}

          {/* <Text uppercase vol={4} as="li"> */}
            <Link className={classes.navItem} to="/solutions">
                United Kingdom, TXB273KE8
            </Link>
          {/* </Text> */}

          {/* <Text uppercase vol={4} as="li"> */}
            <Link className={classes.navItem} to="/case-studies">
                help@sweetpickings.com
            </Link>
          {/* </Text> */}
        {/* </ul> }                  */}
        <div className={classes.search_div}>
        </div>
        </div>
      </nav>
      <br/>      
      {/* <div className={classnames(grid.goal, classes.burger_options)} hidden={!burgerManager}>
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
      </div>      */}
    </Grid>
    </div>
  );
};

export default Header;
