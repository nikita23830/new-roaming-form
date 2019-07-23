import React, { Component } from "react";
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Grid,
  Select,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ROAMING_OPERATORS, ROAMING_STATUS } from "../Constants/index";
import { Progress } from "../Components/linear-progress";
import SearchField from "./search-field";

class State extends Component {
  state = {
    searchValue: "",
    selectedFilter: "all"
  };

  updateData = event => this.setState({ searchValue: event.target.value });
  handleClear = value => this.setState({ searchValue: "" });
  handleChange = event => this.setState({ selectedFilter: event.target.value });

  render() {
    const { classes } = this.props;
    const { selectedFilter, searchValue } = this.state;
    return (
      <div className={classes.state}>
        <Paper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <SearchField
                searchValue={searchValue}
                updateData={this.updateData}
                handleClear={this.handleClear}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Select
                value={selectedFilter}
                onChange={this.handleChange}
                name="selectedFilter"
                inputProps={{
                  name: "selectedFilter",
                  id: "selectedFilter-simple"
                }}
                className={classes.selectedFilter}
                fullWidth
              >
                <MenuItem value={"all"}>
                  <em>Все статусы</em>
                </MenuItem>
                {ROAMING_STATUS.map(item => (
                  <MenuItem value={item.status}>{item.name}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={20} sm={12}>
            <Table className={classes.table}>
              <TableBody>
                {filterFunction(searchValue, selectedFilter).map(
                  (item, index) => {
                    console.log(item);
                    return (
                      <StateCell item={item} key={index} classes={classes} />
                    );
                  }
                )}
              </TableBody>
            </Table>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const filterFunction = (searchValue, selectedFilter) => {
  let result = ROAMING_OPERATORS;
  if (selectedFilter !== "all")
    result = result.filter(item => item.status === selectedFilter);
  if (searchValue !== "")
    result = result.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  return result;
};

const StateCell = ({ item, index, classes }) => {
  console.log("11111", item, index, classes);
  return (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {sayStatus(item).name}
      </TableCell>
      <Tooltip title={sayStatus(item).progress + "%"} placement="right">
        <TableCell component="th" scope="row" className={classes.progress}>
          <Progress
            status={item.status}
            variant="determinate"
            value={sayStatus(item).progress}
          />
        </TableCell>
      </Tooltip>
    </TableRow>
  );
};

const sayStatus = item => {
  return ROAMING_STATUS.find(st => st.status === item.status);
};

const styles = {
  state: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  },
  progress: {
    width: "150px"
  },
  selectedFilter: {
    height: "35px"
  },
  table: {
    minWidth: "900px"
  }
};

export default withStyles(styles)(State);
