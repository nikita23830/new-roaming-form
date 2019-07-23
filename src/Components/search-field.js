import React from "react";
import { IconButton, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Clear } from "@material-ui/icons";

const SearchField = props => {
  const { classes, searchValue, handleClear, updateData } = props;

  return (
    <div className={classes.root}>
      <TextField
        value={searchValue}
        onChange={updateData}
        label="Поиск по спецоператорам"
        name="searchValue"
        fullWidth
      />
      <IconButton
        color="primary"
        onClick={handleClear}
        className={classes.iconButton}
        size="small"
      >
        <Clear />
      </IconButton>
    </div>
  );
};
const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: "17px",
    position: "relative"
  },
  iconButton: {
    position: "absolute",
    right: "1px",
    top: "1px"
  }
};

export default withStyles(styles)(SearchField);
