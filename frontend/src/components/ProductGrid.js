import React from "react";
import { connect } from "react-redux";
import { searchProducts } from "../actions/index";
import { bindActionCreators } from "redux";

// components used
import SingleProductBox from "./SingleProductBox";
import Footer from "./Footer";

// design
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = (theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  productMetaWrapper: {
    display: "block",
  },
  categoryMeta: {
    float: "left",
  },
  priceMeta: {
    float: "right",
    fontSize: 18,
  },
});

class ProductGrid extends React.Component {
  constructor(props) {
    super(props);

    this.renderProducts = this.renderProducts.bind(this);
  }

  componentDidMount() {
    // need to make the initial API call
    this.props.searchProducts();
  }

  renderProducts() {
    const { classes } = this.props;

    return this.props.products.map((product) => {
      const generatePriceSubHeader = () => {
        return `Price: ${product.price}`;
      };

      const generateCategoryHeader = () => {
        return `Category: ${product.category}`;
      };

      return (
        <Grid item key={product._id} xs={12} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography>
                <div className={classes.productMetaWrapper}>
                  <div className={classes.categoryMeta}>
                    <strong>Category: </strong>
                    {product.category}
                  </div>
                  <div className={classes.priceMeta}>${product.price}</div>
                </div>
              </Typography>
            </CardContent>
            <CardMedia className={classes.cardMedia} image={product.image} />
            <CardContent className={classes.cardContent}>
              <Typography variant="h6">{product.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {this.renderProducts()}
          </Grid>
        </Container>

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state is", state);

  return {
    products: state.products.slice(1, 10),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductGrid));
