const SelectListItem = ({ value }) => {
  return <option>{value}</option>
};

const SelectList = ({ list, field, state, updateState }) => {
  const selectListItems = list.map((item, i) => {
    return <SelectListItem key={i} value={item} />
  });

  const onChange = (event) => {
    if (event.target.value === "All") {
      updateState(field, '')
    } else {
      updateState(field, event.target.value.toLowerCase())
    }
  }

  return (
    <select className="form-select" onChange={event => {onChange(event)}}>
      {selectListItems}
    </select>
  );
};

export default SelectList;
