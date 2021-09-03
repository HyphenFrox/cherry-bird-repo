import React from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  observationCard: {
    margin: "0.5em",
    width: 280,
    // backgroundColor: "#ccffd2",
    backgroundColor: theme.palette.secondary.main,
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
  },
  observationLocation: {
    fontSize: "0.8rem",
  },
}));

function ObservationResults({ obsvData, className, ...args }) {
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
    <div className={className} {...args}>
      {obsvData.results.map((observation) => (
        <Card className={classes.observationCard} key={observation?.uuid}>
          <CardContent>
            <div
              style={observationPhotoStyles(
                observation?.observation_photos[0]?.photo?.url
              )}
            >
              {observation?.observation_photos[0]?.photo?.url ? null : (
                <Typography variant="subtitle2">No Photo Available</Typography>
              )}
            </div>
            <Typography
              className={classes.observationCommonName}
              variant="subtitle1"
            >
              {observation?.taxon?.preferred_common_name ?? "Common Name N/A"}
            </Typography>
            <Typography
              className={classes.observationSpeciesName}
              variant="subtitle1"
            >
              {`${observation?.species_guess ?? "Unkown Scientific Name"}, ${
                observation?.taxon?.iconic_taxon_name ?? "Unknown Kind"
              }`}
            </Typography>
            <div className={classes.observationLocationInfoBox}>
              <LocationOnIcon></LocationOnIcon>
              <Typography
                className={classes.observationLocation}
                variant="subtitle1"
              >
                {observation?.place_guess ?? "Location N/A"}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ObservationResults;
