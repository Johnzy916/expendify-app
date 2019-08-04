import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render correctly with 0 expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={999} />);
  expect(wrapper).toMatchSnapshot();
});
