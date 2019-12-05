import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ auth, notes })=> {
    return (
      <div>
        <nav>
          <Link to='/notes'>Notes ({ notes.length })</Link>
          <Link to='/notes/create'>Create</Link>
        </nav>
        <h1>Welcome { auth.fullName }</h1>
      </div>
    );
  };
  
  const Nav = connect(
    ({ auth, notes })=> {
      return {
        auth,
        notes
      };
    }
  )(_Nav);

  export default Nav