import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date-hi',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sort by to amount', () => {
  const prevState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const action = {
    type: 'SORT_BY_TYPE',
    sortBy: 'amount'
  }
  const state = filtersReducer(prevState, action);
  expect(state.sortBy).toBe('amount');
});

test('should set sort by to date (high first)', () => {
  const prevState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const action = {
    type: 'SORT_BY_TYPE',
    sortBy: 'date-hi'
  }
  const state = filtersReducer(prevState, action);
  expect(state.sortBy).toBe('date-hi');
});

test('should set sort by to date (low first)', () => {
  const prevState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const action = {
    type: 'SORT_BY_TYPE',
    sortBy: 'date-lo'
  }
  const state = filtersReducer(prevState, action);
  expect(state.sortBy).toBe('date-lo');
});

test('should set text filter', () => {
  const prevState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const text = 'testing text'
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  }
  const state = filtersReducer(prevState, action);
  expect(state).toEqual({
    text: 'testing text',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set startDate filter', () => {
  const prevState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const startDate = moment(0).add(4, 'days');
  const action = {
    type: 'SET_START_DATE',
    startDate
  }
  const state = filtersReducer(prevState, action);
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment(0).add(4, 'days'),
    endDate: undefined
  });
});

test('should set endDate filter', () => {
  const prevState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const endDate = moment(0).endOf('month');
  const action = {
    type: 'SET_END_DATE',
    endDate: endDate
  }
  const state = filtersReducer(prevState, action);
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).endOf('month')
  });
});