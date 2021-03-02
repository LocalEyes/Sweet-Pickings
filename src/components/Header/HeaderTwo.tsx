import React, {useState, useEffect} from "react";
import classnames from "classnames";
import { st, classes } from "./headerTwo.st.css";
import { Grid, GridProps, Text, Button } from "@actionishope/shelley";
import { Link } from "react-router-dom";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";

import { FaFacebook } from 'react-icons/fa';
import { AiFillTwitterCircle, AiFillYoutube, AiFillLinkedin } from 'react-icons/ai';
import { IoLocation } from 'react-icons/io5';
import { HiAtSymbol } from "react-icons/hi";

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
      <nav className={grid.goal} >
        <div className={classes.flex_spaceBetween} >
            <p className={classes.navItem} >
                Grow for us, pick with us
            </p>

            <p className={classes.navItem} >
              <IoLocation size="30px" /> United Kingdom, TXB273KE8
            </p>

            <p className={classes.navItem}>
                <HiAtSymbol size="30px" />help@sweetpickings.com
            </p>

            {/* Links to be added below */}
            <Link to="/"><FaFacebook size="40px" /></Link>
            <Link to="/"><AiFillTwitterCircle size="40px" /></Link>
            <Link to="/"><AiFillYoutube size="40px" /></Link>
            <Link to="/"><AiFillLinkedin size="40px" /></Link>

        </div>
      </nav>
      <br/>
    </Grid>
    </div>
  );
};

export default Header;
