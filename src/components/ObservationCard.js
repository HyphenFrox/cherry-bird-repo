import React from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  observationCard: {
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    [theme.breakpoints.up(325)]: {
      maxWidth: 325,
    },
  },
  observationCommonName: {
    marginTop: "1em",
  },
  observationSpeciesName: {
    fontSize: "0.8rem",
    fontStyle: "italic",
  },
  observationLocationInfoBox: {
    marginTop: "0.5em",
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: "0.1em",
    },
  },
  observationLocation: {
    fontSize: "0.8rem",
  },
}));

function ObservationCard(props) {
  const { observationData, ...args } = props;
  const classes = useStyles();

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

  return (
    <Card className={classes.observationCard} {...args}>
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
      </CardContent>
    </Card>
  );
}

export default ObservationCard;
