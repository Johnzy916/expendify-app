import React from 'react';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#app');

const PasswordModal = ({ showModal, handleConfirmPassword, handleCancelPassword }) => (
    <ReactModal
        isOpen={showModal}
        contentLabel="Connect accounts"
        onRequestClose={handleCancelPassword}
        closeTimeoutMS={200}
        className="react-modal"
    >
        <h3 className="react-modal__body">
            You already have an account with this email!
        </h3>
        <p className="react-modal__info">
            Do you want to connect these accounts?
        </p>
        <input type="password" name="password" className="react-modal__input text-input" />
        <button
            className="btn btn--primary btn--shine react-modal__btn"
            onClick={handleCancelPassword}
        >
            Connect accounts
        </button>
        <button 
            className="btn btn--tertiary btn--shine react-modal__btn"
            onClick={handleConfirmPassword}
        >
            Cancel
        </button>
    </ReactModal>
);

export default PasswordModal;