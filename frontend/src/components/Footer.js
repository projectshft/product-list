/* import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();

  const renderPageArray = () => {
    for (let i = 0; i < this.props.count; i++) {
      console.log(i);
    }
  };

  const renderPageLink = () => {};

  return (
    <div>
      <Typography variant="h2">Footer</Typography>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    count: state.products[0].count || 1,
  };
}

export default connect(mapStateToProps)(Footer);
 */