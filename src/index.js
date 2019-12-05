const API = 'https://acme-users-api-rev.herokuapp.com/api';

//simulation of logged in user
const fetchUser = async ()=> {
  const storage = window.localStorage;
  const userId = storage.getItem('userId'); 
  if(userId){
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    }
    catch(ex){
      storage.removeItem('userId');
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return  user;
};

import React from 'react';
import ReactDOM from 'react-dom';
import thunks from 'redux-thunk';
import { HashRouter, Link, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import store from './redux/store';
import axios from 'axios';
import { SET_AUTH, SET_NOTES } from './redux/constants'


import Nav from './components/Nav';
import Notes from './components/Notes';
import Form from './components/Form';


//constants


//action creators
const setAuth = (auth)=> ({ type: SET_AUTH, auth });
const setNotes = (notes)=> ({ type: SET_NOTES, notes });
const createNote = (note)=> ({ type: CREATE_NOTE, note });

//thunks
const getAuth = ()=> {
  return async(dispatch)=> {
    const auth = await fetchUser();
    await dispatch(setAuth(auth));
    return dispatch(getNotes());
  };
};

const getNotes = ()=> {
    return async(dispatch, getState)=> {
      const notes = (await axios.get(`${API}/users/${getState().auth.id}/notes`)).data;
      return dispatch(setNotes(notes));
    };
  };

const createNotes = (value) => {
    return async(dispatch, getState) => {
        const note = (await axios.post(`${API}/users/${getState().auth.id}/notes`));
        return dispatch()
    }
    
}

//store


const { render } = ReactDOM;
const { Component } = React;



class _App extends Component{
  componentDidMount(){
    this.props.fetchUser()
  }
  render(){
    return (
      <HashRouter>
        <Route component={ Nav } />
        <Route exact path='/notes' component={Notes} /> 
        <Route path='/notes/create' component={Form}/> 
      </HashRouter>
    );
  }
}

const App = connect(({ auth })=> {
  return {
    auth
  };
}, (dispatch)=> {
  return {
    fetchUser: ()=> dispatch(getAuth())
  };
})(_App);

const root = document.querySelector('#root');
render(<Provider store={ store }><App /></Provider>, root);
