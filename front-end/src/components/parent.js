import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../actions";
import Products from "./products"

const Parent = () => {
  const dispatch = useDispatch();

  // local state for the input variables
  const [values, setValues] = useState({
    name: "",
    category: "",
    price: "",
    page: 1,
    submitted: false,
  });

  // handle change of name from search bar
  const handleNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      name: e.target.value,
    }));
  };

  // get categories from data, handle change of category from select
  const product = useSelector((state) => state.products);

  const categories = product.map((c) => c.category);
  const uniqueCategories = [...new Set(categories)];

  function UniqueOptions() {
    return uniqueCategories.map((o) => <option id="{o}">{o}</option>);
  }

  const handleCategoryChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      category: e.target.value,
    }));
  };

  // handle change of price sort from select
  const handlePriceChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      price: e.target.value,
    }));
  };

  let urlAdditions = "";

  if (values.name.length > 0) {
    urlAdditions += "?query=" + values.name;
  }

  if (values.category.length > 0) {
    if (urlAdditions.includes("?")) {
      urlAdditions += "&category=" + values.category;
    } else {
      urlAdditions += "?category=" + values.category;
    }
  }

  if (values.price !== "") {
    if (urlAdditions.includes("?")) {
      urlAdditions += "&price=" + values.price;
    } else {
      urlAdditions += "?price=" + values.price;
    }
  }

  if (values.page > 1) {
    if (urlAdditions.includes("?")) {
      urlAdditions += "&page=" + values.page;
    } else {
      urlAdditions += "?page=" + values.page;
    }
  }

  // get collectionLength from db
  const collectionLength = 90;
  
  // do something like https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-react
  const pageNumberUI = (cl) => {
    return ( 1
      // <span value=
    )
  }

  

  useEffect(() => {
    console.log("In Products - here / urlAdditions: " + urlAdditions);
    dispatch(fetchProduct(urlAdditions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProduct]);

  // handle button pressing
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch event here
    dispatch( 
      fetchProduct({
        urlAdditions,
      })
    );
  };

  return (
    <div className="bg-light">
      <form class="register-form" onSubmit={handleSubmit}>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {/* Search bar with newName as value */}
              <div className="form-group p-0">
                <input
                  className="form-control"
                  type="text"
                  id="input-name"
                  placeholder="Search for a product by name"
                  name="name"
                  value={values.name}
                  onChange={handleNameChange}
                ></input>
              </div>
            </div>

            {/* <Category /> */}
            <div className="col-sm">
              <div className="container">
                <div className="row align-items-end">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="category"
                    value={values.category}
                    onChange={handleCategoryChange}
                  >
                    <option selected>Select a Category</option>
                    <UniqueOptions />
                  </select>
                  <br />
                </div>
              </div>
            </div>

            {/* <Price /> */}
            <div className="col-sm">
              <div className="container">
                <div className="row align-items-end">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="price"
                    value={values.price}
                    onChange={handlePriceChange}
                  >
                    <option selected>Sort Price</option>
                    <option value="1">Descending</option>
                    <option value="-1">Ascending</option>
                  </select>
                  <br />
                </div>
              </div>
            </div>

            <div className="form-group col-md-1 p-0">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Products - set to read in the other variables */}
        <div className="container">
          <Products props={values} />
        </div>

        <div className="container">
          <div className="row">
            <a href="#" className="text-center">{pageNumberUI(collectionLength)}</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Parent;

