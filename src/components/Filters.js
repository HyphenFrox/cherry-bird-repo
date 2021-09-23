import {
  FormGroup,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Slider,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useQuery } from "react-query";

//
import createFilterComponents from "../services/filterComponents";
import fetchLocationInfo from "../services/fetchLocationInfo";
import findFilterIndexInArray from "../services/findFilterIndexInArray";
//

const useStyles = makeStyles((theme) => ({
  formGroup: {
    padding: "1em",
    gap: "1em",
  },
}));

function Filters({ filterDetails, filterState, setFilterState, ...args }) {
  const classes = useStyles();

  //filter input states
  let defaultFilterInputState = {};
  for (const filter of filterState) {
    if (filter.elementType === "multiSelect" || "locationSelect") {
      defaultFilterInputState[filter.filterName] = "";
    }
  }

  const [filterInputState, setFilterInputStates] = useState(
    defaultFilterInputState
  );

  const handleMultiSelectInputChange =
    (filterName) =>
    (...args) => {
      const [, value] = args;
      setFilterInputStates((state) => {
        let newState = state;
        newState[filterName] = value;
        return { ...newState };
      });
    };

  function handleLocationFilterInputChange(...args) {
    const [, value] = args;
    setFilterInputStates((state) => {
      let newState = state;
      newState.location = value;
      return { ...newState };
    });
  }
  //

  //nearby
  const handleIsNearbyOnChange = (event) => {
    if (event.target.checked === false) {
      setFilterState((state) => {
        let newState = state;
        newState[findFilterIndexInArray(newState, "lat")].selected = "";
        newState[findFilterIndexInArray(newState, "lng")].selected = "";
        newState[
          findFilterIndexInArray(newState, "isNearbyOn")
        ].selected = false;
        return [...newState];
      });
    }

    if (event.target.checked === true && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((geo) => {
        setFilterState((state) => {
          let newState = state;
          newState[findFilterIndexInArray(newState, "lat")].selected =
            geo.coords.latitude;
          newState[findFilterIndexInArray(newState, "lng")].selected =
            geo.coords.longitude;
          newState[findFilterIndexInArray(newState, "location")].selected =
            null;
          newState[
            findFilterIndexInArray(newState, "isNearbyOn")
          ].selected = true;
          return [...newState];
        });
      });
    }
  };

  const handleNearbyRadiusChange = (...args) => {
    const [, value] = args;
    setFilterState((state) => {
      let newState = state;
      newState[findFilterIndexInArray(newState, "radius")].selected = value;
      return [...newState];
    });
  };
  const getNearbySliderValueLabel = (value) => `${value} KM`;
  const nearbyRadiusSliderMarks = [
    {
      value: 0,
      label: "0 KM",
    },
    {
      value: 100,
      label: "100 KM",
    },
  ];
  //

  //location search results
  const {
    isLoading: isLocationOptionsLoading,
    isError: isLocationOptionsError,
    data: locationOptions,
    error: locationOptionsError,
  } = useQuery(
    ["locationResults", filterInputState.location],
    fetchLocationInfo
  );

  if (isLocationOptionsError) {
    console.log(locationOptionsError);
  }
  //

  //filter value change handle functions
  const handleSelectFilterChange = (event) => {
    setFilterState((state) => {
      let newState = state;
      newState[findFilterIndexInArray(newState, event.target.name)].selected =
        event.target.value;
      return [...newState];
    });
  };

  const handleMultiSelectFilterChange =
    (filterName) =>
    (...args) => {
      const [, value] = args;
      setFilterState((state) => {
        let newState = state;
        newState[findFilterIndexInArray(newState, filterName)].selected = value;
        return [...newState];
      });
    };

  const handleLocationFilterValueChange = (...args) => {
    const [, value] = args;
    setFilterState((state) => {
      let newState = state;
      newState[findFilterIndexInArray(newState, "location")].selected = value;
      return [...newState];
    });
  };
  //

  //create filter UI components
  const filterUI = filterDetails.map((filter, index) =>
    createFilterComponents({
      index,
      filter,
      filterState,
      filterInputState,
      handleMultiSelectInputChange,
      handleLocationFilterInputChange,
      handleSelectFilterChange,
      handleMultiSelectFilterChange,
      handleLocationFilterValueChange,
      isLocationOptionsLoading,
      locationOptions,
    })
  );
  //

  return (
    <>
      <Paper {...args}>
        <Typography
          variant="h6"
          style={{
            marginLeft: "0.5em",
            textTransform: "uppercase",
          }}
        >
          Filters
        </Typography>
        <FormGroup row className={classes.formGroup}>
          <>
            {filterUI}
            {"geolocation" in navigator ? (
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={
                      filterState[
                        findFilterIndexInArray(filterState, "isNearbyOn")
                      ].selected
                    }
                    onChange={handleIsNearbyOnChange}
                    name="isNearbyOn"
                  />
                }
                label="Observations Near You"
              />
            ) : null}
            {filterState[findFilterIndexInArray(filterState, "isNearbyOn")]
              .selected ? (
              <Slider
                name="nearbyRadiusSlider"
                value={
                  filterState[findFilterIndexInArray(filterState, "radius")]
                    .selected
                }
                getAriaValueText={getNearbySliderValueLabel}
                onChange={handleNearbyRadiusChange}
                valueLabelDisplay="auto"
                min={1}
                max={100}
                marks={nearbyRadiusSliderMarks}
                style={{
                  maxWidth: 200,
                  margin: "2em",
                }}
              ></Slider>
            ) : null}
          </>
        </FormGroup>
      </Paper>
    </>
  );
}

export default Filters;
