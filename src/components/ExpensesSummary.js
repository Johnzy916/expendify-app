import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';
import getVisibleExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/selectExpensesTotal';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? " expense " : " expenses ";
  const total = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{total}</span>
        </h1>
        <div className="page-header__actions">
          <Link 
            className="btn btn--primary btn--shine"
            to="/create">
              Add expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expenseCount: expenses.length,
    expensesTotal: selectExpensesTotal(expenses)
  }
};

export default connect(mapStateToProps)(ExpensesSummary);
