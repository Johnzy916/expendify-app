import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import getVisibleExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/selectExpensesTotal';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? " expense " : " expenses ";
  const total = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      <h3>
        Viewing {expenseCount} {expenseWord} totalling {total}
      </h3>
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
