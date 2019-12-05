import thunks from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { SET_AUTH, SET_NOTES } from './constants'


const store = createStore(
    combineReducers({
      auth: (state = {}, action)=> {
        if(action.type === SET_AUTH){
          return action.auth;
        }
        return state;
      },
      notes: (state = [], action)=> {
        if(action.type === SET_NOTES){
          return action.notes;
        }
        return state;
      }
    }), applyMiddleware(thunks)
  );

  export default store 