//creates filters that use the select component

import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

//
import findFilterIndexInArray from "./findFilterIndexInArray";
//

const blankCheckBoxIcon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkCheckBoxIcon = <CheckBoxIcon fontSize="small" />;

export default function createFilterComponents({
  index,
  filter,
  filterState,
  filterInputState,
  handleMultiSelectInputChange,
  handleLocationFilterInputChange,
  handleSelectFilterChange,
  handleMultiSelectFilterChange,
  handleLocationFilterValueChange,
  selectClass,
  multiSelectClass,
  locationClass,
  isLocationOptionsLoading,
  locationOptions,
}) {
  const { filterName, filterFriendlyName, elementType } = filter;
  const filterSelectedValue =
    filterState[findFilterIndexInArray(filterState, filterName)].selected;

  if (elementType === "select") {
    const inputLabelID = `${filterName}Label`;
    return (
      <FormControl className={selectClass} key={index}>
        <InputLabel id={inputLabelID}>{filterFriendlyName}</InputLabel>
        <Select
          labelId={inputLabelID}
          inputProps={{ name: filterName }}
          value={filterSelectedValue}
          onChange={handleSelectFilterChange}
          variant="standard"
        >
          {filter.options.map((option, index) => {
            return (
              <MenuItem
                value={option !== "Default" ? option.toLowerCase() : ""}
                key={index}
              >
                {option !== "Default" ? option : "Default"}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }

  if (elementType === "multiSelect") {
    const filterInputValue = filterInputState[filterName];

    return (
      <Autocomplete
        key={index}
        multiple
        openOnFocus
        disableCloseOnSelect
        limitTags={2}
        options={filter.options}
        getOptionLabel={(option) => option}
        inputValue={filterInputValue}
        onInputChange={handleMultiSelectInputChange(filterName)}
        value={filterSelectedValue}
        onChange={handleMultiSelectFilterChange(filterName)}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={blankCheckBoxIcon}
              checkedIcon={checkCheckBoxIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField {...params} label={filterFriendlyName} />
        )}
        className={multiSelectClass}
      />
    );
  }

  if (elementType === "locationSelect") {
    const filterInputValue = filterInputState[filterName];

    return (
      <Autocomplete
        className={locationClass}
        disabled={
          filterState[findFilterIndexInArray(filterState, "isNearbyOn")]
            .selected
        }
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        loading={isLocationOptionsLoading}
        inputValue={filterInputValue}
        onInputChange={handleLocationFilterInputChange}
        value={filterSelectedValue}
        onChange={handleLocationFilterValueChange}
        options={isLocationOptionsLoading ? [] : locationOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label={filterFriendlyName}
            name={filterName}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLocationOptionsLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        key={index}
      />
    );
  }

  return null;
}
