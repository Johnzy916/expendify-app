import React from 'react';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#app');

const DeleteModal = ({ showModal, handleConfirmDelete, handleCancelDelete }) => (
    <ReactModal
        isOpen={showModal}
        contentLabel="Delete expense"
        onRequestClose={handleCancelDelete}
        closeTimeoutMS={200}
        className="react-modal"
    >
        <h3 className="react-modal__body">
            Are you sure you want to delete this expense?
        </h3>
        <button
            className="btn btn--primary btn--shine react-modal__btn"
            onClick={handleCancelDelete}
        >
            Keep expense
        </button>
        <button 
            className="btn btn--tertiary btn--shine react-modal__btn"
            onClick={handleConfirmDelete}
        >
            Yes, delete
        </button>
    </ReactModal>
);

export default DeleteModal;
