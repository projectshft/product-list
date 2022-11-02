import { useSelector } from "react-redux";

const DisplayGrid = () => {
  const [pageOneData, productsData] = useSelector((state) => [
    state.first,
    state.products,
  ]);
  const currentData = productsData ? productsData : pageOneData;
  const renderGrid = () => {
    if (currentData.length > 0) {
      return currentData.map((p, index) => {
        return (
          <div className="col-lg-4" key={index}>
            <div className="card" key={index}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR6phDeYUg6EL4uNj6tdRmksE-PI9qjrbgwA&usqp=CAU"
                className="card-img-top"
                alt="your product"
              ></img>
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text1">${p.price}</p>
                <p className="card-text">category: {p.category}</p>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className="each">
      <div className="card-deck">{renderGrid()}</div>
    </div>
  );
};

export default DisplayGrid;
