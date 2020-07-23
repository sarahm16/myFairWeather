import React from 'react';
import PropTypes from 'prop-types';

import './modal.css';

function openWidget(event) {
  event.preventDefault();
  window.cloudinary.openUploadWidget({
    cloudName: 'sarahm16', 
    uploadPreset: 'gvezom1v'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info); 
    }
  })
}

const Modal = ({customClass, show, closeCallback, onChangeCallback, commentText, cancelCallback }) => (
  <div className={`modal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
    <div className="overlay" onClick={closeCallback}></div>
    <div className="modal_content">
        <form className="journalEntry">
            <label className="inputBox">
                Trip Report
                <input className="inputText" type="text" name="commentBox" id="commentBox" onChange={onChangeCallback} value={commentText} />
            </label>

            <div className='row'>
              <div className='col m2 l2'></div>
              <div className='col s12 m4 l4'>
                <button className="waves-effect waves-light btn hoverable blue accent-3" id="submit-complete" value="Submit" onClick={closeCallback}>Submit</button>
              </div>

              <div className='col s12 m4 l4'>              
                <button className="waves-effect waves-light btn hoverable red accent-3" id="cancel-submit" value="cancel" onClick={cancelCallback}>Cancel</button>
              </div>
              <div className='col m2 l2'></div>
              <div><button id="upload_widget" className="cloudinary-button" onClick={openWidget}>Upload files</button></div>
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
  commentText: PropTypes.string,
  cancelCallback: PropTypes.func,
};

Modal.defaultProps = {
  customClass: '',
  show: false,
  closeCallback: () => (false),
  onChangeCallback: () => (false),
  cancelCallback: () => (false),
  commentText: '',
};

export default Modal;