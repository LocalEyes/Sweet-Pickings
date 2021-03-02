import React, {useState, useEffect} from "react";
import classnames from "classnames";
import { st, classes } from "./header.st.css";
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
    <Grid
      tag="header"
      className={st(classnames(classes.root, classNameProp, burgerManager && classes.header_burger_border))}
      {...rest}
    >
      
      {children}
      <nav className={grid.goal}>
        <div className={classes.flex_spaceBetween}>
        {isTabletOrMobile ? <div className={classes.burger_style} onClick={() => {setBurgerManager(!burgerManager)}}>
        <div></div>
            <div></div>
            <div></div>
          </div> : <ul className={classes.navList}>
          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/">
              Story
            </Link>
          </Text>

          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/pickers">
              Pickers
            </Link>
          </Text>

          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/growers">
              Growers
            </Link>
          </Text>

          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/recipients">
              Recipients
            </Link>
          </Text>

          <Text uppercase vol={4} as="li">
            <Link className={classes.navItem} to="/gallery">
              Gallery
            </Link>
          </Text>
        </ul> }                 
        <div className={classes.search_div}>
        <input type="text" id="search_query" 
          name="search_query" 
          placeholder="Type Here.."
          value={searchQuery}
          className={classes.search_field}
          onChange={(e) => setSearchQuery(e.target.value)}/>
          <Button tone={4} variant={3} vol={3} className={classes.search_button} as="li" onClick={()=>{
            if( searchQuery ){
              history.push('/search_results/'+searchQuery)
            }
          }} >
          Search
        </Button>
        </div>
        </div>
      </nav>
      <br/>      
      <div className={classnames(grid.goal, classes.burger_options)} hidden={!burgerManager}>
      <div>
        <a href='/'>Story</a>          
      </div>
      <div>
        <a href='/pickers'>Pickers</a>
      </div>
      <div>
        <a href='/growers'>Growers</a>
      </div>
      <div>
        <a href='/recipients'>Recipients</a>
      </div>
      <div>
        <a href='/gallery'>Gallery</a>
      </div>
      </div>     
    </Grid>
  );
};

export default Header;