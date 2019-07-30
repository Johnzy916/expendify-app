import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';
import '../setupTests.js'; // needed for codesandbox.io
import toJSON from 'enzyme-to-json'; // needed for codesandbox.io

test('should render Expense List Item with expense', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />)
  expect(toJSON(wrapper)).toMatchSnapshot();
});