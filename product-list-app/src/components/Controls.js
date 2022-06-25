import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../actions';
import './Controls.css';



const Controls = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');

    const dispatch = useDispatch();

    const handleKeyDown = evt => {
        let keyCode = evt.keyCode;
        if (keyCode >= 48 && keyCode <= 57) {
            evt.preventDefault();
        }
    }
    
    const handleSubmit = evt => {
        evt.preventDefault();
        dispatch(
            fetchProducts({query, category, sort, page: '1'})
        );
    }
    
    const handleInputChange = evt => {
        let inputVal = evt.target.value;
        switch(evt.target.name) {
            case "query":
                setQuery(inputVal);
                break;
            case "category":
                setCategory(inputVal);
                break;
            case "sort":
                setSort(inputVal);
                break;
            default:
                return;
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="ControlBarForm">
            <div className="row">
                <input className="form-control" type="text" name="query" value={query} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Search Term Here" />
                <select className="form-control" type="text" name="category" value={category} onChange={handleInputChange}>
                    <option value="">Filter By Category</option>
                    <option value="Books">Books</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Baby">Baby</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Games">Games</option>
                    <option value="Computers">Computers</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Home">Home</option>
                    <option value="Health">Health</option>
                    <option value="Music">Music</option>
                    <option value="Garden">Garden</option>
                    <option value="Sports">Sports</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Movies">Movies</option>
                    <option value="Tools">Tools</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Toys">Toys</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Electronics">Electronics</option>
                </select>
                <select className="form-control" type="text" name="sort" value={sort} onChange={handleInputChange}>
                    <option value="">Sort By Price</option>
                    <option value="lowest">Lowest to Highest</option>
                    <option value="highest">Highest to Lowest</option>
                </select>
            </div>
        </form>
    )
};

export default Controls;