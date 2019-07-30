import moment from 'moment';
import { setTextFilter, sortByType, setStartDate, setEndDate } from '../../actions/filters';

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('should generate set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

test('should generate sort by type action object', () => {
  const sortBy = 'amount';
  const action = sortByType(sortBy);
  expect(action).toEqual({
    type: "SORT_BY_TYPE",
    sortBy
  });
});

test('should generate set text filter action object', () => {
  const text = 'testing'
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text
  });
});

test('should generate set text filter action object (no args)', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: ''
  });
});