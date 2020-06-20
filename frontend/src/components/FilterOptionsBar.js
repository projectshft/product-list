import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchProducts, filterCategory, sortProducts } from "../actions/index";

// material UI imports
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
  formControl: {
    marginLeft: theme.spacing(1),
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
});

class FilterOptionsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      searchTerm: "",
      sortStatus: "",
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
  }

  handleCategoryChange(category) {
    this.props.filterCategory(category);
  }

  handleSortChange(sortPreference) {
    this.props.sortProducts(sortPreference);
  }

  handleSearchBarChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.props.searchProducts(this.state.searchTerm);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.filterOptionsBar} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <TextField
              id="outlined-basic"
              style={{
                backgroundColor: "#FDFDFDFD",
              }}
              label="Search"
              variant="outlined"
              value={this.state.searchTerm}
              onChange={this.handleSearchBarChange}
              onKeyPress={this.onKeyPress}
            />
          </Box>

          <Box>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                style={{
                  backgroundColor: "#FDFDFDFD",
                }}
                value={this.state.category}
                onChange={this.handleCategoryChange}
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
          </Box>

          <Box>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel id="sort-label">sort by:</InputLabel>
              <Select
                labelId="sort-label"
                id="price-sort"
                value={this.state.sortStatus}
                style={{
                  backgroundColor: "#FDFDFDFD",
                }}
                onChange={this.handleSortChange}
                label="Sort by">
                <MenuItem value={"highest"}>Price: Highest to Lowest</MenuItem>
                <MenuItem value={"lowest"}>Price: Lowest to Highest</MenuItem>
                <MenuItem value={"none"}>No sorting</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
    );
  }
}

FilterOptionsBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { searchProducts, filterCategory, sortProducts },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(FilterOptionsBar));
