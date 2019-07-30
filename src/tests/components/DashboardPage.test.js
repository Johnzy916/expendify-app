import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from '../../components/DashboardPage';
import '../setupTests.js'; // needed for codesandbox.io
import toJSON from 'enzyme-to-json'; // needed for codesandbox.io

test('should render the dashboard correctly', () => {
  const wrapper = shallow(<DashboardPage />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});