import React from "react";
import { AppBar, Link, Toolbar } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";

//
import CustomRouterLink from "./CustomRouterLink";
//

function AppHeader() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <CustomRouterLink
          to={"/"}
          variant="h1"
          underline="none"
          style={{ fontSize: "2rem", color: "white" }}
        >
          Cherry Bird Repo
        </CustomRouterLink>
        <div style={{ flexGrow: 1 }}></div>
        <Link
          href="https://github.com/HyphenFrox/cherry-bird-repo"
          target="_blank"
        >
          <GitHub style={{ color: "white" }} fontSize="large"></GitHub>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
