import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ReactModal from './DeleteModal';

export class EditExpensePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  
  onSubmit = editedExpense => {
    this.props.startEditExpense(this.props.expense.id, editedExpense);
    this.props.history.push('/');
  }
  
  hideModal = () => {
    this.setState(() => ({
      showModal: false
    }));
  }
  
  onRemove = () => {
    this.setState(() => ({
      showModal: true
    }))
  }
  
  handleConfirmDelete = () => {
    this.hideModal();
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }
  
  handleCancelDelete = () => {
    this.hideModal();
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              Edit Expense
            </h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
            submitType="Save"
          />
          <button
            className="btn btn--tertiary btn--shine"
            onClick={this.onRemove}
          >
            Remove
          </button>
        </div>
        <ReactModal 
          showModal={this.state.showModal}
          handleConfirmDelete={this.handleConfirmDelete}
          handleCancelDelete={this.handleCancelDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, editedExpense) => dispatch(startEditExpense(id, editedExpense)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);