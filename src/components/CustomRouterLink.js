import React from "react";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const CustomRouterLink = React.forwardRef((props, ref) => (
  <Link ref={ref} component={RouterLink} {...props}></Link>
));

export default CustomRouterLink;
