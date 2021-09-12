import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  userIconDIV: {
    position: "relative",
    width: "100%",
    "&:after": {
      content: "''",
      display: "block",
      paddingBottom: "100%",
    },
  },
  userIconBG: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50% 50%",
  },
});

function UserIcon(props) {
  const { userIconURL } = props;
  const userIconStyles = (iconUrl) => {
    return {
      backgroundImage: `url(${iconUrl})`,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    };
  };

  const classes = useStyles();

  if (userIconURL) {
    return (
      <div className={classes.userIconDIV}>
        <div
          className={classes.userIconBG}
          style={userIconStyles(userIconURL)}
        ></div>
      </div>
    );
  }

  return <PersonIcon></PersonIcon>;
}

export default UserIcon;
