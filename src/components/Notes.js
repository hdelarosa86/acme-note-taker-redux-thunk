import React from 'react';
import ReactDOM from 'react-dom';
import thunks from 'redux-thunk';
import { HashRouter, Link, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Form from './Form';
const getNotes = () => {
  return async (dispatch, getState) => {
    const notes = (await axios.get(`${API}/users/${getState().auth.id}/notes`))
      .data;
    return dispatch(setNotes(notes));
  };
};

const _Notes = props => {
  return (
      <div>
    <ul>
      {props.notes.map(note => {
        return <li key={note.id}>{note.text}</li>;
      })}
    </ul>
    
    </div>

  );
};

const Notes = connect(
  ({ notes }) => {
    return {
      notes,
    };
  },
  dispatch => {
    return {
      fetchNotes: () => dispatch(getNotes()),
    };
  }
)(_Notes);

export default Notes;
