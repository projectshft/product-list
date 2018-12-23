import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    products: function(state = null, action) {
      switch (action.type) {
        case "NEW_SEARCH":
          return action.payload;
      }
      return state;
    },
    activePage: function(state = 1, action) {
        switch (action.type) {
            case "SELECT_PAGE":
            return action.payload;
        }
      return state;
    },
    numPages: function(state=0, action) {
        switch(action.type) {
            case "SET_PAGES":
            return action.payload;
        }
        return state;
    },
    currentCategory: function(state="",action) {
        switch(action.type) {
            case "SET_CATEGORY":
            return action.payload;
        }
        return state;
    },
    currentSort: function(state="",action) {
        switch(action.type) {
            case "SET_SORT":
            return action.payload;
        }
        return state;
    }
  });

  export default rootReducer;