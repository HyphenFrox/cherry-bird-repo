import React from "react";
import { Link, Typography } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { sanitize } from "dompurify";
import HTMLReactParser from "html-react-parser";
import classNames from "classnames";

// icons
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
//

//
import getResponsiveSquare from "../services/getResponsiveSquare";
import getFlexbox from "../services/getFlexbox";
//

const useStyles = makeStyles({
  descriptionTitle: {
    fontSize: "2rem",
  },
  mapBox: {
    "&:after": {
      paddingBottom: "50%",
    },
  },
});

function ObservationDetails(props) {
  const { observation, ...args } = props;
  const observedAt = new Date(observation?.time_observed_at);
  const createdAt = new Date(observation?.created_at);
  const isGeo = observation.hasOwnProperty("geojson");

  const classes = useStyles();
  const responsiveSquare = getResponsiveSquare();
  const flexbox = getFlexbox();

  return (
    <div
      className={flexbox.flexboxColumn}
      style={{ alignItems: "initial" }}
      {...args}
    >
      {/* short details with icons sections */}
      <div
        className={flexbox.flexboxRowWrap}
        style={{ justifyContent: "initial" }}
      >
        {/* observation date */}
        <div className={flexbox.flexboxRow}>
          <VisibilityIcon color="primary"></VisibilityIcon>
          <Typography variant="subtitle1">
            Observed on: {observedAt.toLocaleString()}
          </Typography>
        </div>
        {/*  */}
        {/* creation date */}
        <div className={flexbox.flexboxRow}>
          <CreateIcon color="secondary"></CreateIcon>
          <Typography variant="subtitle1">
            Reported on: {createdAt.toLocaleString()}
          </Typography>
        </div>
        {/*  */}
        {/* quality grade */}
        <div className={flexbox.flexboxRow}>
          <VerifiedUserIcon color="primary"></VerifiedUserIcon>
          <Typography variant="subtitle1">
            Observation Quality Grade: {observation?.quality_grade}
          </Typography>
        </div>
        {/*  */}
        {/* rank */}
        <div className={flexbox.flexboxRow}>
          <PetsIcon color="secondary"></PetsIcon>
          <Typography>Rank: {observation?.taxon?.rank}</Typography>
        </div>
        {/*  */}
        {/* thretened */}
        {observation?.taxon?.threatened ? (
          <div className={flexbox.flexboxRow}>
            <BlockIcon style={{ color: "#ff1744" }}></BlockIcon>
            <Typography variant="subtitle1">Threatened</Typography>
          </div>
        ) : null}
        {/*  */}
        {/* extinct */}
        {observation?.taxon?.extinct ? (
          <div className={flexbox.flexboxRow}>
            <BlockIcon style={{ color: "#ff1744" }}></BlockIcon>
            <Typography variant="subtitle1">They are extinct</Typography>
          </div>
        ) : null}
        {/*  */}
        {/* endemic */}
        {observation?.taxon?.endemic ? (
          <Typography variant="subtitle1">Endemic to their location</Typography>
        ) : null}
        {/*  */}
        {/* native */}
        {observation?.taxon?.native ? (
          <div className={flexbox.flexboxRow}>
            <FiberManualRecordIcon></FiberManualRecordIcon>
            <Typography variant="subtitle1">
              Native to their location
            </Typography>
          </div>
        ) : null}
        {/*  */}
        {/* introduced */}
        {observation?.taxon?.introduced ? (
          <div className={flexbox.flexboxRow}>
            <FiberManualRecordIcon></FiberManualRecordIcon>
            <Typography variant="subtitle1">
              Introduced to their location
            </Typography>
          </div>
        ) : null}
        {/*  */}
        {/* location */}
        <div className={flexbox.flexboxRow}>
          <LocationOnIcon color="secondary"></LocationOnIcon>
          <Typography variant="subtitle1">
            Place Guess: {observation?.place_guess}
          </Typography>
        </div>
        {/*  */}
        {/* geolocation */}
        <div className={flexbox.flexboxRow}>
          <GpsFixedIcon color="primary"></GpsFixedIcon>
          <Typography variant="subtitle1">
            Location Coordinates: {observation?.location}
          </Typography>
        </div>
        {/*  */}
        {/* geoprivacy */}
        {observation?.geoprivacy ? (
          <div className={flexbox.flexboxRow}>
            <LocationDisabledIcon
              style={{ color: "#ff1744" }}
            ></LocationDisabledIcon>
            <Typography variant="subtitle1">
              User Geoprivacy: {observation?.geoprivacy}
            </Typography>
          </div>
        ) : null}
        {/*  */}
        {/* taxon geoprivacy */}
        {observation?.taxon_geoprivacy ? (
          <div className={flexbox.flexboxRow}>
            <LocationDisabledIcon
              style={{ color: "#ff1744" }}
            ></LocationDisabledIcon>
            <Typography variant="subtitle1">
              Moderator's Geoprivacy: {observation?.taxon_geoprivacy}
            </Typography>
          </div>
        ) : null}
        {/*  */}
        {/* observation count */}
        <div className={flexbox.flexboxRow}>
          <VisibilityIcon color="primary"></VisibilityIcon>
          <Typography variant="subtitle1">
            Observations Count: {observation?.taxon?.observations_count}
          </Typography>
        </div>
        {/*  */}
        {/* search rank */}
        <div className={flexbox.flexboxRow}>
          <TrendingUpIcon color="secondary"></TrendingUpIcon>
          <Typography variant="subtitle1">
            Universal Search Rank: {observation?.taxon?.universal_search_rank}
          </Typography>
        </div>
        {/*  */}
        {/* wikipedia link */}
        {observation?.taxon?.wikipedia_url ? (
          <div className={flexbox.flexboxRow}>
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
        {/*  */}
        {/* inaturalist link */}
        <div className={flexbox.flexboxRow}>
          <LinkIcon color="primary"></LinkIcon>
          <Link href={observation?.uri} target="_blank" color="secondary">
            View on iNaturalist
          </Link>
        </div>
        {/*  */}
      </div>
      {/*  */}

      {isGeo ? (
        <>
          <Typography variant="h2" gutterBottom style={{ fontSize: "2rem" }}>
            Observation Location
          </Typography>
          <div className={classNames(responsiveSquare.square, classes.mapBox)}>
            <div className={responsiveSquare.content}>
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
