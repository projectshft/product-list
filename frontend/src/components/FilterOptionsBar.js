import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { filterProducts } from "../actions/index";
import { withRouter } from "react-router";
import queryString from "query-string";

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
      queries: {},
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }

  handleCategoryChange(event) {
    event.preventDefault();
    this.setState(
      { queries: { category: event.target.value } },
      this.startSearch
    );
  }

  handleSortChange(event) {
    event.preventDefault();
    console.log("Sort val is", event.target.value);
    this.setState({ queries: { sort: event.target.value } }, this.startSearch);
  }

  handleSearchBarChange(event) {
    this.setState({ queries: { query: event.target.value } });

    // handle the edge case of someone deleting everything from bar
    if (!event.target.value) {
      this.setState(
        { queries: { query: event.target.value } },
        this.startSearch
      );
    }
  }

  onSearchKeyPress = (e) => {
    if (e.which === 13) {
      this.startSearch();
    }
  };

  startSearch() {
    // we need to update the url when we begin
    // console.log("parsedFromPathName is", parsedFromPathName);

    const parsedfromLocation = queryString.parse(this.props.location.search);
    const mergedObjects = { ...parsedfromLocation, ...this.state.queries };

    const stringifiedNewQuery = queryString.stringify(mergedObjects);

    console.log("props are ", this.props);

    this.props.history.push(`?${stringifiedNewQuery}`);

    this.props.filterProducts(this.props.location.search, this.state.queries);
  }

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
              value={this.state.queries.query}
              onChange={this.handleSearchBarChange}
              onKeyPress={this.onSearchKeyPress}
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
                value={this.state.queries.category}
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
                value={this.state.queries.sort}
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

function mapStateToProps(state) {
  return {
    page: state.page,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ filterProducts }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(FilterOptionsBar))
);
