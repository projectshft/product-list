import { useSelector } from "react-redux";


const RenderQuery = () => {
  const results = useSelector(state => state.search);

  return(
    results.map((data) => {
      
      return (
        <div className="col-3 products">
          <div className="row">
            <div className="col d-flex">
              Category: <strong>{data.category}</strong>
            </div>
            <div className="col price">
              <strong>${data.price}</strong>
            </div>
          </div>
          <div className="row">
            <img src={data.image} alt=""></img>
          </div>
          <div className="row">
          <strong>{data.name}</strong>
          </div>
        </div>
      )
    })
  )
}

export default RenderQuery
