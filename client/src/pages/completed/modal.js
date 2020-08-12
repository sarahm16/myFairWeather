import React from 'react';
import PropTypes from 'prop-types';

import './modal.css';

const Modal = ({customClass, show, closeCallback, onChangeCallback, commentText, cancelCallback, selectPhotoCallback }) => (
  <div className={`modal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
    <div className="overlay" onClick={closeCallback}></div>
    <div className="modal_content">
        <form className="journalEntry">
            <label className="inputBox">
                Trip Report
                <textarea className="inputText" type="text" name="commentBox" id="commentBox" onChange={onChangeCallback} value={commentText} />
            </label>

            <div className='row'>
              <div><button id="upload_widget" className="cloudinary-button" onClick={selectPhotoCallback}>Upload Photos</button></div>
            </div>

            <div className='row'>
              <div className='col s6 m6 l6'>
                <button className="waves-effect waves-light btn hoverable green accent-3" id="submit-complete" value="Submit" onClick={closeCallback}>Submit</button>
              </div>
              <div className='col s6 m6 l6'>
                <button className="waves-effect waves-light btn hoverable red accent-3" id="cancel-submit" value="cancel" onClick={cancelCallback}>Cancel</button>
              </div>
            </div>
        </form>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.element,
  customClass: PropTypes.string,
  show: PropTypes.bool,
  closeCallback: PropTypes.func,
  onChangeCallback: PropTypes.func,
  selectPhotoCallback: PropTypes.func,
  commentText: PropTypes.string,
  cancelCallback: PropTypes.func,
};

Modal.defaultProps = {
  customClass: '',
  show: false,
  closeCallback: () => (false),
  onChangeCallback: () => (false),
  cancelCallback: () => (false),
  selectPhotoCallback: () => (false),
  commentText: '',
};

export default Modal;