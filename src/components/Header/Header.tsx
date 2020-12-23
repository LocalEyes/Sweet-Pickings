import React from "react";
import classnames from "classnames";
import { st, classes } from "./header.st.css";
import { Grid, GridProps, Text, Button } from "@actionishope/shelley";
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
          {/* <div style={{margin: 'auto'}}> */}
          <div style={{ display: 'flex',
    justifyContent: 'flex-end',
    width: '47.5%',
    alignItems: 'center'}}>
          {/* <InputText
            label =""           
            placeholder="Type here..."   
            variant={1} 
            vol={3}   
            error="Form item error message"
            id = ""            
          /> */}
          <input type="text" id="fname" name="firstname" placeholder="Type Here.." style={{height: '40%',width: '50%'}}/>
          <Button tone={4} variant={3} vol={3} style={{height: '40%',marginLeft: '10px'}} as="li">
          Search
        </Button>
        </div>
        {/* </div> */}
        </ul>        
      </nav>
    </Grid>
  );
};

export default Header;
