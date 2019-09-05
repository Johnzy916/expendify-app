import { startRemoveExpense } from './expenses';

// SHOW MODAL ACTION
export const showModal = (modalProps) => ({
   type: 'SHOW_MODAL',
   modalProps
});

export const hideModal = () => ({
    type: 'HIDE_MODAL'
});

export const modalConfirm = (confirmType, id) => {
    return dispatch => {
        if (confirmType === 'remove' && id) {
            dispatch(startRemoveExpense({ id }));
            return null;
        } else if (confirmType === 'connect') {
            return 'this is from the modal action';
        }
    }
}