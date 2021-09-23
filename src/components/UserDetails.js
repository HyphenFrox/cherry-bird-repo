import React from "react";
import { Link, Typography, makeStyles } from "@material-ui/core";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
//

//
import UserIcon from "./UserIcon";
import getFlexbox from "../services/getFlexbox";
//

const useStyles = makeStyles({
  userDetails: {
    alignSelf: "flex-start",
    borderTop: "3px solid lightGrey",
    borderBottom: "3px solid lightGrey",
    paddingTop: "1em",
    paddingBottom: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
});

function UserDetails(props) {
  const { userDetails, ...args } = props;
  const classes = useStyles();
  const flexbox = getFlexbox();

  return (
    // user details box
    <div className={classes.userDetails} {...args}>
      {/* user header box */}
      <div
        className={flexbox.flexboxRow}
        style={{ justifyContent: "flex-start" }}
      >
        {/* user photo */}
        <UserIcon userIconURL={userDetails?.icon_url ?? false}></UserIcon>
        {/*  */}

        {/* uname box */}
        <div
          className={flexbox.flexboxColumn}
          style={{ alignItems: "initial", gap: "0.3em" }}
        >
          <Typography>{userDetails?.name ?? "Unknown User"}</Typography>
          {userDetails?.login ? (
            <Typography>
              <Link
                href={`https://inaturalist.org/people/${userDetails.login}`}
                target="_blank"
                color="secondary"
              >{`@${userDetails?.login}`}</Link>
            </Typography>
          ) : null}
        </div>
        {/*  */}
      </div>
      {/*  */}

      {/* user achievemnets section */}
      <div
        className={flexbox.flexboxColumn}
        style={{ justifyContent: "initial", alignItems: "flex-start" }}
      >
        <div className={flexbox.flexboxRow} style={{ gap: "0.5em" }}>
          <VisibilityIcon color="primary"></VisibilityIcon>
          <Typography variant="subtitle1">
            {userDetails?.observations_count} Observations
          </Typography>
        </div>
        <div className={flexbox.flexboxRow} style={{ gap: "0.5em" }}>
          <SearchIcon color="secondary"></SearchIcon>
          <Typography variant="subtitle1">
            {userDetails?.identifications_count} Identifications
          </Typography>
        </div>
        <div className={flexbox.flexboxRow} style={{ gap: "0.5em" }}>
          <TrendingUpIcon color="primary"></TrendingUpIcon>
          <Typography variant="subtitle1">
            {userDetails?.universal_search_rank} Universal Search Rank
          </Typography>
        </div>
      </div>
      {/*  */}
    </div>
    //
  );
}

export default UserDetails;
