import { normalize, schema } from 'normalizr';
import { FETCH_PRODUCT, COMBO_FILTER } from '../action';

// const defaultState = { entries: {}, order: [] };
// const productSchema = new schema.Entity('products', undefined, {
//   idAttribute: (value) => value._id,
// });

const defaultState = [];

// const ProductReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case FETCH_PRODUCT:
//       // const normalizedProducts = normalize(action.payload.data.products, [
//       //   productSchema,
//       // ]);
//       return action.payload.data.products;
//     // return {
//     //   entries: normalizedProducts.entities.products,
//     //   order: normalizedProducts.result,
//     // };
//     default:
//       return state;
//   }
// };

const ProductReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload.data.products;
    default:
      return state;
  }
};

const ComboReducer = (state = defaultState, action) => {
  switch (action.type) {
    case COMBO_FILTER:
      return action.payload.data.products;
    default:
      return state;
  }
};

const reducers = {
  ProductReducer,
  ComboReducer,
};

export default reducers;
