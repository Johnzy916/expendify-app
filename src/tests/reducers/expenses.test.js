import moment from 'moment';
import uuid from 'uuid';
import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses'

test('should set default expenses to empty array', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should add expense', () => {
  const expense = {
    id: uuid(),
    description: 'pickle',
    note: '',
    amount: '1000',
    createdAt: moment(0)
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should remove expense with id', () => {
  const id = '2';
  const action = {
    type: 'REMOVE_EXPENSE',
    id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expense if id not found', () => {
  const id = '4';
  const action = {
    type: 'REMOVE_EXPENSE',
    id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should edit expense', () => {
  const id = '1';
  const edits = {
    note: 'test note',
    amount: 1987
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id,
    edits
  };
  const state = expensesReducer(expenses, action);
  expect(state[0]).toEqual({
    id: '1',
    description: 'Pickles',
    note: 'test note',
    amount: 1987,
    createdAt: moment(0).add(4, 'days').valueOf()
  });
});

test('should not edit expense if id not found', () => {
  const id = '4';
  const edits = {
    note: 'test note',
    amount: 1987
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id,
    edits
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[0]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0]]);
});