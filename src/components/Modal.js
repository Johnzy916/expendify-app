import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import {  hideModal } from '../actions/modal';
ReactModal.setAppElement('#app');

class Modal extends Component {
    
    handleConfirm() {
        console.log('confirm handled');
    }
    
    render() {
        return (
            <ReactModal
                isOpen={this.props.modalVisible}
                contentLabel="Delete expense"
                onRequestClose={this.props.cancelModal}
                closeTimeoutMS={200}
                className="react-modal"
            >
                <h3 className="react-modal__body">
                    Are you sure you want to delete this expense?
                </h3>
                <button
                    className="btn btn--primary btn--shine react-modal__btn"
                    onClick={this.props.cancelModal}
                >
                    Keep expense
                </button>
                <button 
                    className="btn btn--tertiary btn--shine react-modal__btn"
                    onClick={this.handleConfirm}
                >
                    Yes, delete
                </button>
            </ReactModal>
        );
    }
    
};

const mapStateToProps = state => ({
    modalType: state.modal.modalType,
    modalVisible: state.modal.modalVisible,
});

const mapDispatchToProps = dispatch => ({
    cancelModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);