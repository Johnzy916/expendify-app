import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters.js';
import '../setupTests.js'; // needed for codesandbox.io
import toJSON from 'enzyme-to-json'; // needed for codesandbox.io

let setTextFilter, sortByType, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByType = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters 
      filters={filters}
      setTextFilter={setTextFilter}
      sortByType={sortByType}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters with default values', () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render ExpenseListFilters with data values', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'rent';
  wrapper.find('input').at(0).simulate('change', { target: { value }});
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  wrapper.setProps({
    filters: altFilters
  });
  const value = 'date';
  wrapper.find('select').simulate('change', { target: { value }});
  expect(sortByType).toHaveBeenLastCalledWith(value);
});

test('should sort by amount', () => {
  const value = 'increment';
  wrapper.find('select').simulate('change', { target: { value }});
  expect(sortByType).toHaveBeenLastCalledWith(value);
});

test('should handle date changes', () => {
  const startDate = moment(0);
  const endDate = moment(0).add(3, 'days');
  wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});