const SelectListItem = ({ value }) => {
  return <option>{value}</option>
};

const SelectList = ({ list }) => {
  const selectListItems = list.map((item, i) => {
    return <SelectListItem key={i} value={item} />
  });

  return (
    <select className="form-select">
      {selectListItems}
    </select>
  );
};

export default SelectList;
