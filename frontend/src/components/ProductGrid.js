import React from "react";
import { connect } from "react-redux";
import { searchProducts, storePage } from "../actions/index";
import { bindActionCreators } from "redux";
import queryString from "query-string";

// design
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const styles = (theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
    this.renderProducts = this.renderProducts.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.pullNewPage = this.pullNewPage.bind(this);

    this.state = {
      page: "1",
    };
  }

  componentDidMount() {
    // need to make the initial API call
    this.props.searchProducts();
  }

  renderProducts() {
    const { classes } = this.props;

    return this.props.products.map((product) => {
      return (
        <Grid item key={product._id} xs={12} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <div className={classes.productMetaWrapper}>
                <div className={classes.categoryMeta}>
                  <Typography>
                    <strong>Category: </strong>
                    {product.category}{" "}
                  </Typography>
                </div>
                <div className={classes.priceMeta}>
                  <Typography>${product.price}</Typography>
                </div>
              </div>
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

  handlePageClick(event) {
    event.preventDefault();
    console.log(event);

    this.setState({ page: event.target.textContent }, this.pullNewPage);
  }

  pullNewPage() {
    const parsed = queryString.parse(this.props.location.search);

    const page = this.state.page;
    const searchParam = parsed.query || "none";
    const categoryParam = parsed.category || "none";
    const sortParam = parsed.sort || "none";

    let queryToPush = `?query=${searchParam}&category=${categoryParam}&sort=${sortParam}&page=${page}`;

    this.props.history.push(queryToPush);

    this.props.storePage(this.state.page);
    this.props.searchProducts(this.state.page);
  }

  renderPagination() {
    const productCount = this.props.countObject.count;
    const productsPerPage = 9;

    // figure out how many pages we'll need
    const numPages = Math.ceil(productCount / productsPerPage);

    // push those pages into an array to get mapped
    const pageLinks = [];
    for (let i = 1; i <= numPages; i++) {
      pageLinks.push(i);
    }

    return pageLinks.map((page) => {
      // want to return a different button for the current
      console.log(page);
      if (page == this.state.page) {
        return (
          <Button
            onClick={this.handlePageClick}
            value={String(page)}
            variant="contained"
            key={`pageButton${page}`}>
            {page}
          </Button>
        );
      }

      return (
        <Button
          onClick={this.handlePageClick}
          value={String(page)}
          key={`pageButton${page}`}>
          {page}
        </Button>
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
        <Grid container alignItems="center" justify="center">
          <ButtonGroup
            className={classes.paginationButtons}
            color="primary"
            aria-label="text primary button group">
            {this.renderPagination()}
          </ButtonGroup>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state is", state);

  return {
    countObject: state.products[0] || 0,
    products: state.products.slice(1, 10),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts, storePage }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductGrid));
