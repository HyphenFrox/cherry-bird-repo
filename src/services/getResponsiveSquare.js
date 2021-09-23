import { makeStyles } from "@material-ui/core";

const getResponsiveSquare = makeStyles({
  square: {
    width: "100%",
    position: "relative",
    "&:after": {
      content: "''",
      display: "block",
      paddingBottom: "100%",
    },
  },
  content: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default getResponsiveSquare;
