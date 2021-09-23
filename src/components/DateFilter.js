import React from "react";
import { makeStyles, Tabs, Tab } from "@material-ui/core";

//
import { dateViewValueToLabel } from "../services/dateViewConversion";
import capitalizeFirstLetterOfString from "../services/capitalizeFirstLetterOfString";
//

const useStyles = makeStyles((theme) => ({
  selectedTab: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function DateFilter(props) {
  const { dateViewValue, handleDateViewValueChange, ...args } = props;
  const classes = useStyles();
  return (
    <Tabs
      variant="scrollable"
      value={dateViewValue}
      onChange={handleDateViewValueChange}
      {...args}
    >
      {dateViewValueToLabel.map((filterViewName, index) => (
        <Tab
          key={index}
          classes={{ selected: classes.selectedTab }}
          label={capitalizeFirstLetterOfString(filterViewName)}
        />
      ))}
    </Tabs>
  );
}

export default DateFilter;
