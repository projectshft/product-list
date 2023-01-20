//returns the search bar consisting of the inputbar, category+price drop down menu
export default function SearchBarExcerpt ({setInput,setCategory,setPrice}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-4">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search" aria-label="Search input" aria-describedby="button-addon2"
              onInput={event => {setInput( event.target.value !== "" ? "&query=" + event.target.value : "");}}
            />
          </div>
      </div>
      <div  className="col-lg-3 col-md-4">
        <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect01"defaultValue = ""
            onChange={event => {
              setCategory(event.target.value !== "" ? "&category=" + event.target.value : "");
            }}
          >
            <option value = "">Sort by Category</option>
            <option value="Home" >Home</option>
            <option value="Music">Music</option>
            <option value="Games" >Games</option>
            <option value="Tools" >Tools</option>
            <option value="Shoes" >Shoes</option>
            <option value="Health" >Health</option>
            <option value="Grocery" >Grocery</option>
            <option value="Outdoors" >Outdoors</option>
            <option value="Jewelery" >Jewelery</option>
            <option value="Electronics" >Electronics</option>
          </select>
        </div>
      </div>
        <div  className="col-lg-3 col-md-4">
          <div className="input-group mb-3">
              <select 
                className="form-select" 
                id="inputGroupSelect02"
                defaultValue = ""
                onChange={event => {setPrice(event.target.value === "" ? "" : "&price=" + event.target.value);}} 
              >
                <option value = "">Sort by Price</option>
                <option value="lowest" >Lowest</option>
                <option value="highest" >Highest</option>
              </select>
            </div>
        </div>
      </div>
    </div>
)}