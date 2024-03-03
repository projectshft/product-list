import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPrice } from "../slices/priceFilterSlice";

const PriceDropdown = ({ onSelect }) => {

  const dispatch = useDispatch();

  const [prices, setPrices] = useState([]);

  const sortingOptions = [
    { label: 'Lowest to Highest', value: 'lowest' },
    { label: 'Highest to Lowest', value: 'highest' }
  ];

  useEffect(() => {
    axios.get('http://localhost:8000/prices')
      .then(response => {
        setPrices(response.data)
        console.log(response.data)
      })
      .catch(error => console.error('Error fetching categories:', error))
  }, [])

  const handlePriceSelect = (price) => {
    dispatch(setPrice(price))
  };

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle me-2" type="button" id="categoryDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
        Sort By Price
      </button>
      <ul className="dropdown-menu" aria-labelledby="categoryDropdownButton">
        {sortingOptions.map((option, index) => (
          <li key={index} onClick={() => handlePriceSelect(option.value)}>
            <a className="dropdown-item" href="#">{option.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default PriceDropdown;