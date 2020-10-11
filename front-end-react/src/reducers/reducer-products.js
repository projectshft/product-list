import { FETCH_PRODUCTS } from "../actions/index";

export default function (state = { count: 0, list: [] }, action) {
  console.log('in fetch reducer & state list = ' + state);
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data.products
    default:
      return state;
  }
}

//DOMAIN STATE: all of the products retrieved from the server
//APP STATE: category 'tools' is selected, sort 'lowest' is selected
// search term 'metal' is selected (& page 5 is selected)
//UI STATE: the sort dropdown is still showing 'lowest': DO NOT USE 
//this to define state shape
//https://redux.js.org/recipes/structuring-reducers/basic-reducer-structure
//sample state shape:
// {
//   domainData1 : {},
//   domainData2 : {},
//   appState1 : {},
//   appState2 : {},
//   ui : {
//       uiState1 : {},
//       uiState2 : {},
//   }
// }
