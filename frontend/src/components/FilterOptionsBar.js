import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { filterProducts } from "../actions/index";

// material UI imports
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  filterBar: {
    textAlign: "center",
    fontSize: 25,
  },
});

class FilterOptionsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryChange(category) {
    this.props.sendCategory(category);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl className={classes.formControl} variant="outlined">
          <TextField id="outlined-basic" label="Search" variant="outlined" />
        </FormControl>

        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={this.state.category}
            onChange={this.props.handleCategoryChange}
            label="Category">
            <MenuItem value={"Shoes"}>Shoes</MenuItem>
            <MenuItem value={"Music"}>Music</MenuItem>
            <MenuItem value={"Books"}>Books</MenuItem>
            <MenuItem value={"Computers"}>Computers</MenuItem>
            <MenuItem value={"Electronics"}>Electronics</MenuItem>
            <MenuItem value={"Movies"}>Movies</MenuItem>
            <MenuItem value={"Toys"}>Toys</MenuItem>
            <MenuItem value={"Kids"}>Kids</MenuItem>
            <MenuItem value={"Health"}>Health</MenuItem>
            <MenuItem value={"Beauty"}>Beauty</MenuItem>
            <MenuItem value={"Sports"}>Sports</MenuItem>
            <MenuItem value={"Clothing"}>Clothing</MenuItem>
            <MenuItem value={"Home"}>Home</MenuItem>
            <MenuItem value={"Tools"}>Tools</MenuItem>
            <MenuItem value={"Automotive"}>Automotive</MenuItem>
            <MenuItem value={"Garden"}>Garden</MenuItem>
            <MenuItem value={"Industrial"}>Industrial</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="sort-label">sort by:</InputLabel>
          <Select
            labelId="sort-label"
            id="price-sort"
            value={this.state.sortStatus}
            onChange={this.props.handleSortChange}
            label="Sort by">
            <MenuItem value={"highest"}>Price: Highest to Lowest</MenuItem>
            <MenuItem value={"lowest"}>Price: Lowest to Highest</MenuItem>
            <MenuItem value={"none"}>No sorting</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

FilterOptionsBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ filterProducts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterOptionsBar));
