import React from "react";
import classnames from "classnames";
import { classes } from "./social.share.st.css";

import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon}  from "react-share";
import { Button } from "@actionishope/shelley";

const SocialShare = ({
  title='',
  url = '',
  description= ''
})=>{
  const [showResults, setShowResults] = React.useState(false)
  const onClick = () => setShowResults(showResults?false:true)
  return (
      <div className={classnames(classes.floating_menu)}>
        {
          (showResults) ? <div><FacebookShareButton url={url} hashtag={''} quote={title}>
          <FacebookIcon round={true} size={40}></FacebookIcon>
        </FacebookShareButton><br />
        <TwitterShareButton
          url={url}
          title={title}>
          <TwitterIcon size={40} round />
        </TwitterShareButton><br /> </div>: <div><br /><br /><br /><br /><br /></div>
        }        
        {/* <button className={classnames(classes.share_toggle)}>
          {}
        </button> */}
        <Button 
          className={classnames(classes.share_toggle)}
          tone={2} 
          variant={4} 
          vol={2} 
          icon={(showResults) ? <i className="fa fa-times" aria-hidden="true"></i> : <i className="fa fa-share" aria-hidden="true"></i>} 
          iconPos={'end'}
          onClick={onClick}  
        >
        
        </Button>
      </div>
  );
};
export default SocialShare;