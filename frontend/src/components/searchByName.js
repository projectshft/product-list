const SearchQuery = (props) => {
  return (
    <div className="col text-center">
      <div className="text-xs search ">

        <input
          value={props.value}
          onChange={event => {
            props.setValue(event.target.value)
          }}
          type="text center" id="search-query" className="text-center input-group input-group-sm col-sm-12" placeholder="Type in query" />
        <br />
      </div>
    </div>
  )
};

export default SearchQuery;