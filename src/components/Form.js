import React from 'react';
import { connect } from 'react-redux';
// pretend you are importing this from action creator file
const postNoteThunk = (value) => {
    return async (dispatch, getState) => {
      const note = await axios.post(`${API}/users/${getState().auth.id}/notes`);
      return dispatch(createNote(note));
    };
  };

class _Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  
  render() {
      console.log(this.props);
    return (
      <form>
        <input type="text" />
        <button type="submit">Add Note</button>
      </form>
    );
  }
}

// const Form = connect
// // (({ }) => {
// //   dispatch => {
// //       return {
// //           fetchNote: ()=> dispatch(postNote())
// //       };
// //   }
// // })(_Form);
const mapDispatchToProps = (dispatch) => ({
    postNote: (value) => postNoteThunk(value),

})
const Form = connect(null, mapDispatchToProps)(_Form);

export default Form;
