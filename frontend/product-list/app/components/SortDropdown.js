const SortDropdown = ({ name, id, options, onChange }) => {
  return (
    <select
      name={name}
      id={id}
      className="form-control form-select w-15 m-2"
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default SortDropdown;
