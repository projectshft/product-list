import CategoryDrop from "./Category-Drop"
import PriceDrop from "./Price-Drop"

function Search (props) {
  return (
    <div id="search">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <input className="form-control col add-margin" placeholder="Search"></input>
            <div className="add-margin">
              <CategoryDrop setPages={props.setPages} setPage={props.setPage} />
            </div>
            <div className="add-margin">
              <PriceDrop setPages={props.setPages} setPage={props.setPage} />
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Search