import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { filterProducts } from "../actions/index";

// material UI imports
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  filterBar: {
    textAlign: "center",
    fontSize: 25,
  },
});

class FilterOptionsBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.filterBar}>FilterOptionsBar</Typography>
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
