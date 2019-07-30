import moment from 'moment';
import expenses from '../fixtures/expenses';
import getVisibleExpenses from '../../selectors/expenses';

test('should filter by text value', () => {
  const filters = {
    text: 'lettuce',
    sortBy: 'date'
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[1]]);
});

test('should filter by start date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0], expenses[2] ])
});

test('should filter by end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  }
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[2], expenses[1] ]);
});

test('should filter by both start and end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: moment(0).add(6, 'days')
  }
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0], expenses[2] ]);
});

test('should sort by date', () => {
  const filters ={
    text: '',
    sortBy: 'date'
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0], expenses[2], expenses[1] ]);
});

test('should sort by date (increment)', () => {
  const filters ={
    text: '',
    sortBy: 'increment'
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0], expenses[1], expenses[2] ]);
});

test('should sort by date (decrement)', () => {
  const filters ={
    text: '',
    sortBy: 'decrement'
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[2], expenses[1], expenses[0] ]);
});