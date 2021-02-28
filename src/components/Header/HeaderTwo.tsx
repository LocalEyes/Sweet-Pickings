import React, {useState, useEffect} from "react";
import classnames from "classnames";
import { st, classes } from "./headerTwo.st.css";
import { Grid, GridProps, Text, Button } from "@actionishope/shelley";
import { Link } from "react-router-dom";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinIcon }  from "react-share";

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
            <Link className={classes.navItem} to="/challenges">
                Grow for us, pick with us
            </Link>

            <Link className={classes.navItem} to="/solutions">
                United Kingdom, TXB273KE8
            </Link>

            <Link className={classes.navItem} to="/case-studies">
                help@sweetpickings.com
            </Link>

            <Link className={classes.navItem} to="/" ><FacebookIcon round size={40}></FacebookIcon></Link>
            <Link className={classes.navItem} to="/" ><TwitterIcon round size={40}></TwitterIcon></Link>
            <Link className={classes.navItem} to="/" ><LinkedinIcon round size={40}></LinkedinIcon></Link>
            
        </div>
      </nav>
      <br/>
    </Grid>
    </div>
  );
};

export default Header;
