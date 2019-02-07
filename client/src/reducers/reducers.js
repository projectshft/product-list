import {combineReducers} from 'redux';
import ProductReducer from './ProductReducer';
import _ from 'lodash';

const rootReducer = combineReducers({
    products: ProductReducer
});

export default rootReducer;

// const initialState = () => {
//     products: [],
//     isLoading: false,
//     error: null

//     // this.setState({ isLoading: true });

//     axios.get(url)
//         .then(response => this.setState({
//             products: this.props.products.concat(response.data),
//             isLoading: false
//         }))
//         .catch(error => this.setState({
//             error,
//             isLoading: false
//         }))
//     }

// function reducers(state = initialState, action) {
//     return {
        
//     }
// }