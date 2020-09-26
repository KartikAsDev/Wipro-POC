import React from "react";
import './Modal.css';

const Modal = ({ handleClose, show, currentMovie }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    console.log('Current Movei', currentMovie);
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          <h7 className='modal-title'> Movie Details </h7>
          <hr />
          <div> <span className='item-name'>Movie Name: </span><span className='item-value'>{currentMovie ? currentMovie.title : '' }</span></div>
          <div> <span className='item-name'>The Movie Title: </span><span className='item-value'>{currentMovie ? currentMovie.title : '' }</span></div>
          <div> <span className='item-name'>The Director’s Name: : </span><span className='item-value'>{currentMovie ? currentMovie.director : ''}</span></div>
          <div> <span className='item-name'>Movie Description/Summary: </span><span className='item-value'>{currentMovie ? currentMovie.description : ''}</span></div>
          <div> <span className='item-name'>Producer’s Name : </span><span className='item-value'>{currentMovie ? currentMovie.producer : ''}</span></div>
          <div> <span className='item-name'>Year of Release: </span><span className='item-value'>{currentMovie ? currentMovie.release_date : ''}</span></div>
          <div> <span className='item-name'>Movie’s Rating(IMDB): </span><span className='item-value'>{ currentMovie ? currentMovie.rt_score : ''}</span></div>
          <button
            onClick={handleClose}
          >
            Close
          </button>
        </section>
      </div>
    );
  };

  export default Modal;

  

  