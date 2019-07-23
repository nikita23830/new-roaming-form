import React from "react";
import { LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green, orange, yellow, lightGreen } from "@material-ui/core/colors";

export const Progress = ({ status, variant, value }) => {
  switch (status) {
    case "preparation":
      return <Progress25 variant={variant} value={value} />;
    case "inProgress":
      return <Progress50 variant={variant} value={value} />;
    case "testing":
      return <Progress75 variant={variant} value={value} />;
    case "done":
      return <Progress100 variant={variant} value={value} />;
    default:
      throw new Error("Unknown progress");
  }
};

const Progress25 = withStyles({
  colorPrimary: {
    backgroundColor: orange[100]
  },
  barColorPrimary: {
    backgroundColor: orange[500]
  }
})(LinearProgress);

const Progress50 = withStyles({
  colorPrimary: {
    backgroundColor: yellow[100]
  },
  barColorPrimary: {
    backgroundColor: yellow[500]
  }
})(LinearProgress);

const Progress75 = withStyles({
  colorPrimary: {
    backgroundColor: lightGreen[100]
  },
  barColorPrimary: {
    backgroundColor: lightGreen[500]
  }
})(LinearProgress);

const Progress100 = withStyles({
  barColorPrimary: {
    backgroundColor: green[500]
  }
})(LinearProgress);
