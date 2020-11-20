import React from "react";
import classnames from "classnames";
import { H3, P } from "@actionishope/shelley";
import { st, classes } from "./card.st.css";
import { Link } from "react-router-dom";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  media?: string;
  description?: string;
  url: string;
  /** HTML tag to render as the root for your grid. */
  tag?: string;
  /** Designed to toggle child formatting/alignment rules. */
  formatted?: boolean;
  /** Variant index. */
  variant?: number;
}

const Card = ({
  className: classNameProp,
  children,
  variant = 1,
  tag: tagName = "div",
  title,
  description,
  media,
  url,
  ...rest
}: CardProps) => {
  const rootClassNames = classnames(classes.root, classNameProp);

  return (
    <div className={st(rootClassNames)} {...rest}>
      <div className={classes.media}>
        <img
          src={
            media !== ""
              ? media
              : "https://ik.imagekit.io/tcvka0ufln/missing_6VOJII-WVC0k.png"
          }
          alt=""
        />
      </div>
      <div className={classes.text}>
        <H3 className={classes.title} vol={5}>
          {/* <Link className={classes.link} to={url}>
            {title}
          </Link> */}

          <Link
            className={classes.link}
            to={{
              pathname: `${url}`,
              // Allows us to parse some info to the destination so we
              // can pre-fill data we have rather than wait for the api response.
              state: {
                title,
                description,
                media,
              },
            }}
          >
            {title}
          </Link>
        </H3>
        <P>{description}</P>
        {children}
      </div>
    </div>
  );
};

export default Card;