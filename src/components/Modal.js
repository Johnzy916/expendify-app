import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import {  hideModal, modalConfirm } from '../actions/modal';
import { history } from '../routers/AppRouter';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#app');

export const Modal = ({ modalVisible, modalProps, modalType, cancelModal, confirmModal }) => (
    <ReactModal
        isOpen={modalVisible}
        contentLabel={modalProps.contentLabel}
        onRequestClose={cancelModal}
        closeTimeoutMS={200}
        className="react-modal"
    >
        <h3 className="react-modal__body">
            {modalProps.header}
        </h3>
        { modalProps.subtitle &&
        <p className="react-modal__info">
            {modalProps.subtitle}
        </p>
        }
        <button
            className="btn btn--tertiary btn--shine react-modal__btn"
            onClick={() => {
                    cancelModal();
                    if (modalProps.cancelAuth) { 
                        modalProps.cancelAuth('User chose not to connect accounts');
                    };
                }
            }
        >
            {modalProps.cancelText}
        </button>
        <button 
            className="btn btn--primary btn--shine react-modal__btn"
            onClick={() => {
                    confirmModal(modalProps.confirmType, modalProps.id);
                    if (modalProps.confirmAuth) { modalProps.confirmAuth() };
                }
            }
        >
            {modalProps.confirmText}
        </button>
    </ReactModal>
);

const mapStateToProps = state => ({
    modalType: state.modal.modalType,
    modalVisible: state.modal.modalVisible,
    modalProps: state.modal.modalProps
});

const mapDispatchToProps = (dispatch, props) => ({
    cancelModal: () => {
        dispatch(hideModal())
    },
    confirmModal: (confirmType, id) => {
        dispatch(hideModal());
        dispatch(modalConfirm(confirmType, id));
        history.push('/');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);