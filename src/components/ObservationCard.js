import React from "react";
import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  observationCard: (props) => ({
    width: "100%",
    backgroundColor: "hsla(144, 100%, 50%, 0.3)",
    cursor: "pointer",
    boxShadow: theme.shadows[4],
    [theme.breakpoints.up(props.maxMobileWidth + 1)]: {
      "&:hover": {
        boxShadow: theme.shadows[10],
      },
    },
    "& > *": {
      marginTop: "0.5em",
    },
  }),
  observationCommonName: {
    marginTop: "1em",
  },
  observationSpeciesName: {
    fontSize: "0.9rem",
    fontStyle: "italic",
  },
  observationLocationInfoBox: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: "0.1em",
    },
  },
  observationLocation: {
    fontSize: "0.85rem",
  },
  userAndTimeInfoBox: {
    marginTop: "0.5em",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "0.25em",
    },
  },
  userInfoBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: "0.5em",
    },
  },
  userIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50% 50%",
  },
  userName: {
    fontSize: "1rem",
  },
  createdAtTimeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: "0.5em",
    },
  },
  createdAtTime: {
    fontSize: "1rem",
  },
  observedOnTimeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: "0.5em",
    },
  },
  observedOnTime: {
    fontSize: "1rem",
  },
  moreDetailsButton: {
    marginLeft: "auto",
    marginTop: "auto",
    [theme.breakpoints.up("sm")]: {
      marginTop: "initial",
      marginRight: "auto",
    },
  },
}));

function ObservationCard(props) {
  const { observationData, maxMobileWidth, ...args } = props;

  const created_at = new Date(observationData?.created_at);
  const time_observed_at = new Date(observationData?.time_observed_at);

  //for more details button
  const isMobile = useMediaQuery(`(max-width:${maxMobileWidth - 1}px)`);
  const history = useHistory();
  const handleCardClick = (observationID) => () =>
    history.push(`/observation/${observationID}`);
  //

  //observation photo styles
  const observationPhotoStyles = (url) => {
    const isPhotoAvailable = typeof url === "string";
    if (isPhotoAvailable) {
      url = url.replace("square", "original");
      const styles = {
        width: "100%",
        height: "0",
        paddingTop: "100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${url})`,
      };
      return styles;
    } else
      return {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
  };
  //

  //user icon styles
  const userIconStyles = (iconUrl) => {
    return {
      backgroundImage: `url(${iconUrl})`,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    };
  };
  //

  const classes = useStyles({ maxMobileWidth });

  return (
    <Card
      className={classes.observationCard}
      onClick={handleCardClick(observationData.id)}
      {...args}
    >
      <CardContent>
        <div
          style={observationPhotoStyles(
            observationData?.observation_photos[0]?.photo?.url
          )}
        >
          {observationData?.observation_photos[0]?.photo?.url ? null : (
            <Typography variant="subtitle2">No Photo Available</Typography>
          )}
        </div>
        <Typography
          className={classes.observationCommonName}
          variant="subtitle1"
        >
          {observationData?.taxon?.preferred_common_name ?? "Common Name N/A"}
        </Typography>
        <Typography
          className={classes.observationSpeciesName}
          variant="subtitle1"
        >
          {`${observationData?.species_guess ?? "Unkown Scientific Name"}, ${
            observationData?.taxon?.iconic_taxon_name ?? "Unknown Kind"
          }`}
        </Typography>
        <div className={classes.observationLocationInfoBox}>
          <LocationOnIcon></LocationOnIcon>
          <Typography
            className={classes.observationLocation}
            variant="subtitle1"
          >
            {observationData?.place_guess ?? "Location N/A"}
          </Typography>
        </div>
        <div className={classes.userAndTimeInfoBox}>
          <div className={classes.userInfoBox}>
            {observationData?.user?.icon_url ? (
              <div
                className={classes.userIcon}
                style={userIconStyles(observationData?.user?.icon_url)}
              ></div>
            ) : (
              <PersonIcon></PersonIcon>
            )}
            <Typography variant="subtitle1" className={classes.userName}>
              {observationData?.user?.name ?? "Unknown Observer"}
            </Typography>
          </div>
          <div className={classes.observedOnTimeBox}>
            <VisibilityIcon></VisibilityIcon>
            <Typography variant="subtitle1" className={classes.observedOnTime}>
              {observationData?.time_observed_at
                ? time_observed_at.toLocaleString()
                : "Observation Date Unknown"}
            </Typography>
          </div>
          <div className={classes.createdAtTimeBox}>
            <CreateIcon></CreateIcon>
            <Typography variant="subtitle1" className={classes.createdAtTime}>
              {observationData?.created_at
                ? created_at.toLocaleString()
                : "Creation Date Unknown"}
            </Typography>
          </div>
          {isMobile ? (
            <Button
              href={`/observations/${observationData.id}`}
              className={classes.moreDetailsButton}
            >
              More Details
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default ObservationCard;
