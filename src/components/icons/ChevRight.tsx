import React from "react";

import { Icon, IconProps } from "@actionishope/shelley";

const ChevRight = ({ className, alt }: IconProps) => {
  return (
    <Icon alt={alt} className={className} style={{margin: "-4px"}}>
      <path d="M2 13h2l5-5-5-5h-2l5 5z"></path>
      <path d="M7 13h2l5-5-5-5h-2l5 5z"></path>
    </Icon>
  );
};
export default ChevRight;
