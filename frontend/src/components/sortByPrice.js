import React from 'react';
import Select from 'react-select';

const sortType = [
  { label: 'highest', value: 'highest' },
  { label: 'lowest', value: 'lowest' }
]

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? '#c66b3d' : '#fca311',
    padding: 5,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200
  }),
  base: () => ({
    borderBottom: "c66b3d",
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}
const SortQuery = (props) => {
  return (
    <div className="sortQuery col-sm-3">
      <Select
        styles={customStyles}
        options={sortType}
        priceQuery={props.query}
        onChange={opt => {
          props.setSortBy(opt.value)
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            text: 'orangered',
            primary25: '#14213d',
            primary: '#14213d',
            color: '#fca311',
          },
        })}
      />
    </div>
  )
}

export default SortQuery;