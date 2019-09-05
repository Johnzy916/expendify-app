import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from '../../components/Modal';

let wrapper, cancelModal, confirmModal;

beforeEach(() => {
  cancelModal = jest.fn();
  confirmModal = jest.fn();
  wrapper = shallow(<Modal
    modalVisible={true}
    modalProps={{
        contentLabel: 'Delete expense',
        header: 'Are you sure you want to delete this expense?',
        cancelText: 'Keep expense',
        confirmText: 'Yes, delete',
        confirmType: 'remove',
        id: '1'
    }}
    modalType='remove'
    cancelModal={cancelModal}
    confirmModal={confirmModal}
  />)
});

test('should render modal correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle cancel button', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(cancelModal).toHaveBeenCalled();
});

test('should handle confirm button', () => {
  wrapper.find('button').at(1).simulate('click');
  expect(confirmModal).toHaveBeenCalled();
});