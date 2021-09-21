import React from "react";
import { Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

//
import UserIcon from "./UserIcon";
//

const useStyles = makeStyles({
  userHeader: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "30% 70%",
    "& > * + *": {
      marginLeft: "1em",
    },
  },
  userNameBox: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "100%",
    alignContent: "center",
  },
  flexBox: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      padding: "0.5em",
    },
  },
  twoBox: {
    display: "flex",
    alignItems: "center",
    "& > *:first-child": {
      flexShrink: 0,
    },
    "& > *:nth-child(2)": {
      flexGrow: 1,
    },
    "& > * + *": {
      marginLeft: "0.5em",
    },
  },
});

function UserDetails(props) {
  const { userDetails, ...args } = props;
  const classes = useStyles();
  return (
    <div {...args}>
      <div className={classes.userHeader}>
        <UserIcon userIconURL={userDetails?.icon_url ?? false}></UserIcon>
        <div className={classes.userNameBox}>
          <Typography className={classes.userFullName}>
            {userDetails?.name ?? "Unknown User"}
          </Typography>
          {userDetails?.login ? (
            <Typography>
              <Link
                href={`https://inaturalist.org/people/${userDetails.login}`}
                target="_blank"
                color="secondary"
                className={classes.userName}
              >{`@${userDetails?.login}`}</Link>
            </Typography>
          ) : null}
        </div>
      </div>
      <div className={classes.flexBox}>
        <div className={classes.twoBox}>
          <VisibilityIcon color="primary"></VisibilityIcon>
          <Typography variant="subtitle1">
            {userDetails?.observations_count} Observations
          </Typography>
        </div>
        <div className={classes.twoBox}>
          <SearchIcon color="secondary"></SearchIcon>
          <Typography variant="subtitle1">
            {userDetails?.identifications_count} Identifications
          </Typography>
        </div>
        <div className={classes.twoBox}>
          <TrendingUpIcon color="primary"></TrendingUpIcon>
          <Typography variant="subtitle1">
            {userDetails?.universal_search_rank} Universal Search Rank
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;