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

/* const fakeData = [
  {
    _id: "5eed193bc207ae3200ca5748",
    reviews: [],
    category: "Shoes",
    name: "Unbranded Frozen Bacon",
    price: 260,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 0,
  },
  {
    _id: "5eed193bc207ae3200ca5749",
    reviews: [],
    category: "Garden",
    name: "Gorgeous Frozen Fish",
    price: 742,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 0,
  },
  {
    _id: "5eed193bc207ae3200ca5746",
    reviews: [],
    category: "Baby",
    name: "Sleek Cotton Shoes",
    price: 40,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 2,
  },
  {
    _id: "5eed193bc207ae3200ca5747",
    reviews: [
      {
        _id: "5eed45e5768d3c38eddb6169",
        userName: "Karen",
        text: "Product not as advertised; I'd like to speak to a manager. ",
      },
      {
        _id: "5eed45fb768d3c38eddb616a",
        userName: "Lauren",
        text: "I have always loved music like this.",
      },
      {
        _id: "5eed4606768d3c38eddb616b",
        userName: "Pierre",
        text: "This product seems like it is in the wrong category.",
      },
      {
        _id: "5eed460e768d3c38eddb616c",
        userName: "Piper",
        text: "Someone said ball!?! ",
      },
      {
        _id: "5eed4619768d3c38eddb616d",
        userName: "Karen",
        text: "Who is your supervisor? ",
      },
    ],
    category: "Music",
    name: "Practical Soft Ball",
    price: 295,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 5,
  },
  {
    _id: "5eed193bc207ae3200ca574a",
    reviews: [],
    category: "Books",
    name: "Tasty Frozen Gloves",
    price: 186,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 0,
  },
  {
    _id: "5eed193bc207ae3200ca574e",
    reviews: [],
    category: "Computers",
    name: "Fantastic Plastic Shirt",
    price: 994,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 0,
  },
  {
    _id: "5eed193bc207ae3200ca574d",
    reviews: [],
    category: "Movies",
    name: "Sleek Soft Computer",
    price: 898,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 0,
  },
  {
    _id: "5eed193bc207ae3200ca574f",
    reviews: [],
    category: "Toys",
    name: "Unbranded Granite Bacon",
    price: 431,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 0,
  },
  {
    _id: "5eed193bc207ae3200ca574c",
    reviews: [],
    category: "Health",
    name: "Rustic Cotton Soap",
    price: 956,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 0,
  },
]; */

function mapStateToProps(state) {
  console.log("state is", state);

  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductGrid));
