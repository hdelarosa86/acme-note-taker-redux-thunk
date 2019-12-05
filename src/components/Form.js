import React from 'react';
import { connect } from 'react-redux';

class _Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }
  render() {
    return (
      <form>
        <input type="text" />
        <button type="submit">Add Note</button>
      </form>
    );
  }
}

const Form = connect(({ auth, notes }) => {
  return {
    auth,
    notes,
  };
})(_Form);

export default Form;
