import { FormGroup, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useQuery } from "react-query";

//
import createFilterComponents from "../services/filterComponents";
import fetchLocationInfo from "../services/fetchLocationInfo";
import findFilterIndexInArray from "../services/findFilterIndexInArray";
//

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: "0.5em",
  },
  formGroup: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  select: {
    minWidth: 120,
  },
  multiSelect: {
    minWidth: 200,
  },
  location: {
    minWidth: 200,
  },
}));

function FilterSection({
  filterDetails,
  filterState,
  setFilterState,
  ...args
}) {
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

  const handleMultiSelectFilterChange = (filterName) => (event, value) => {
    setFilterState((state) => {
      let newState = state;
      newState[findFilterIndexInArray(newState, filterName)].selected = value;
      return [...newState];
    });
  };

  const handleLocationFilterValueChange = (event, value) => {
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
      selectClass: classes.select,
      multiSelectClass: classes.multiSelect,
      locationClass: classes.location,
      isLocationOptionsLoading,
      locationOptions,
    })
  );
  //

  return (
    <>
      <Paper {...args}>
        <Typography variant="h5" className={classes.title}>
          Filters
        </Typography>
        <FormGroup row className={classes.formGroup}>
          <>{filterUI}</>
        </FormGroup>
      </Paper>
    </>
  );
}

export default FilterSection;
