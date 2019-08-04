import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import getVisibleExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/selectExpensesTotal';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
  <p>
  Viewing {expenseCount}&nbsp;
  {expenseCount === 1 ? "expense" : "expenses"}&nbsp;
  totalling {numeral(expensesTotal / 100).format('$0,0.00')}
  </p>
);

const mapStateToProps = state => {
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expenseCount: expenses.length,
    expensesTotal: selectExpensesTotal(expenses)
  }
};

export default connect(mapStateToProps)(ExpensesSummary);
