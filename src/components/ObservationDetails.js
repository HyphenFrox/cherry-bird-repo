import React from "react";
import { Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CreateIcon from "@material-ui/icons/Create";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import LocationDisabledIcon from "@material-ui/icons/LocationDisabled";
import BlockIcon from "@material-ui/icons/Block";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PetsIcon from "@material-ui/icons/Pets";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LinkIcon from "@material-ui/icons/Link";
import GoogleMapReact from "google-map-react";
import { sanitize } from "dompurify";
import HTMLReactParser from "html-react-parser";
import classNames from "classnames";

//
import useResponsiveSquare from "../services/useResponsiveSquare";
//

const useStyles = makeStyles({
  obsvDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
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
  descriptionTitle: {
    fontSize: "2rem",
  },
  mapBox: {
    "&:after": {
      paddingBottom: "50%",
    },
  },
  map: {
    // position: "absolute",
    // width: "100%",
    // height: "100%",
  },
});

function ObservationDetails(props) {
  const { observation, ...args } = props;
  const observedAt = new Date(observation?.time_observed_at);
  const createdAt = new Date(observation?.created_at);
  const isGeo = observation.hasOwnProperty("geojson");

  const classes = useStyles();
  const responsiveSquare = useResponsiveSquare();
  return (
    <div className={classes.obsvDetails} {...args}>
      <div className={classes.flexBox}>
        <div className={classes.twoBox}>
          <VisibilityIcon color="primary"></VisibilityIcon>
          <Typography variant="subtitle1">
            Observed on: {observedAt.toLocaleString()}
          </Typography>
        </div>
        <div className={classes.twoBox}>
          <CreateIcon color="secondary"></CreateIcon>
          <Typography variant="subtitle1">
            Reported on: {createdAt.toLocaleString()}
          </Typography>
        </div>
        <div className={classes.twoBox}>
          <VerifiedUserIcon color="primary"></VerifiedUserIcon>
          <Typography variant="subtitle1">
            Observation Quality Grade: {observation?.quality_grade}
          </Typography>
        </div>
        <div className={classes.twoBox}>
          <PetsIcon color="secondary"></PetsIcon>
          <Typography>Rank: {observation?.taxon?.rank}</Typography>
        </div>
        {observation?.taxon?.threatened ? (
          <div className={classes.twoBox}>
            <BlockIcon style={{ color: "#ff1744" }}></BlockIcon>
            <Typography variant="subtitle1">
              Endemic to their location
            </Typography>
          </div>
        ) : null}
        {observation?.taxon?.extinct ? (
          <div className={classes.twoBox}>
            <BlockIcon style={{ color: "#ff1744" }}></BlockIcon>
            <Typography variant="subtitle1">They are extinct</Typography>
          </div>
        ) : null}
        {observation?.taxon?.endemic ? (
          <Typography variant="subtitle1">Endemic to their location</Typography>
        ) : null}
        {observation?.taxon?.native ? (
          <div className={classes.twoBox}>
            <FiberManualRecordIcon></FiberManualRecordIcon>
            <Typography variant="subtitle1">
              Native to their location
            </Typography>
          </div>
        ) : null}
        {observation?.taxon?.introduced ? (
          <div className={classes.twoBox}>
            <FiberManualRecordIcon></FiberManualRecordIcon>
            <Typography variant="subtitle1">
              Introduced to their location
            </Typography>
          </div>
        ) : null}
        <div className={classes.twoBox}>
          <LocationOnIcon color="secondary"></LocationOnIcon>
          <Typography variant="subtitle1">
            Place Guess: {observation?.place_guess}
          </Typography>
        </div>
        <div className={classes.twoBox}>
          <GpsFixedIcon color="primary"></GpsFixedIcon>
          <Typography variant="subtitle1">
            Location Coordinates: {observation?.location}
          </Typography>
        </div>
        {observation?.geoprivacy ? (
          <div className={classes.twoBox}>
            <LocationDisabledIcon
              style={{ color: "#ff1744" }}
            ></LocationDisabledIcon>
            <Typography variant="subtitle1">
              User Geoprivacy: {observation?.geoprivacy}
            </Typography>
          </div>
        ) : null}
        {observation?.taxon_geoprivacy ? (
          <div className={classes.twoBox}>
            <LocationDisabledIcon
              style={{ color: "#ff1744" }}
            ></LocationDisabledIcon>
            <Typography variant="subtitle1">
              Moderator's Geoprivacy: {observation?.taxon_geoprivacy}
            </Typography>
          </div>
        ) : null}
        <div className={classes.twoBox}>
          <VisibilityIcon color="primary"></VisibilityIcon>
          <Typography variant="subtitle1">
            Observations Count: {observation?.taxon?.observations_count}
          </Typography>
        </div>
        <div className={classes.twoBox}>
          <TrendingUpIcon color="secondary"></TrendingUpIcon>
          <Typography variant="subtitle1">
            Universal Search Rank: {observation?.taxon?.universal_search_rank}
          </Typography>
        </div>
        {observation?.taxon?.wikipedia_url ? (
          <div className={classes.twoBox}>
            <MenuBookIcon></MenuBookIcon>
            <Link
              href={observation?.taxon?.wikipedia_url}
              target="_blank"
              color="secondary"
            >
              Read Wikipedia
            </Link>
          </div>
        ) : null}
        <div className={classes.twoBox}>
          <LinkIcon color="primary"></LinkIcon>
          <Link href={observation?.uri} target="_blank" color="secondary">
            View on iNaturalist
          </Link>
        </div>
      </div>
      {isGeo ? (
        <>
          <Typography variant="h2" gutterBottom style={{ fontSize: "2rem" }}>
            Observation Location
          </Typography>
          <div className={classNames(responsiveSquare.square, classes.mapBox)}>
            <div className={classNames(responsiveSquare.content, classes.map)}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_googleMapsAPIKey,
                }}
                defaultCenter={{
                  lng: observation.geojson.coordinates[0],
                  lat: observation.geojson.coordinates[1],
                }}
                defaultZoom={11}
              >
                <LocationOnIcon
                  fontSize="large"
                  lng={observation.geojson.coordinates[0]}
                  lat={observation.geojson.coordinates[1]}
                ></LocationOnIcon>
              </GoogleMapReact>
            </div>
          </div>
        </>
      ) : (
        <Typography variant="h2" style={{ fontSize: "2rem" }}>
          Observation Location N/A
        </Typography>
      )}
      {observation?.taxon?.wikipedia_summary ? (
        <>
          <Typography variant="h2" gutterBottom style={{ fontSize: "2rem" }}>
            Description
          </Typography>
          <Typography>
            {HTMLReactParser(sanitize(observation?.taxon?.wikipedia_summary))}
          </Typography>
        </>
      ) : null}
    </div>
  );
}

export default ObservationDetails;
