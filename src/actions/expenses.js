import uuid from 'uuid';
import database from '../firebase/firebase.js';

// ADD_EXPENSES ACTION
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// WRITE EXPENSE TO DATABASE / DISPATCH ACTION
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    
    const expense = { description, note, amount, createdAt };
    return database.ref('expenses').push(expense)
      .then(ref => {
        dispatch(addExpense({
          id: ref.key, 
          ...expense 
        }));
      }).catch(error => {
        console.log('Couldn\'t add expense > ', error);
      });
  };
};

// REMOVE_EXPENSE ACTION
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE ACTION
export const editExpense = (id, edits) => ({
  type: 'EDIT_EXPENSE',
  id,
  edits
});

// SET_EXPENSE ACTION
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
})

// FETCH EXPENSES FROM DATABASE / DISPATCH ACTION
 export const startSetExpenses = () => {
   return (dispatch) => {
     return database.ref('expenses').once('value')
    .then(snapshot => {
      const expenses = [];
      snapshot.forEach(expense => {
        expenses.push({
          id: expense.key,
          ...expense.val()
        });
      });
      dispatch(setExpenses(expenses));
    }).catch(error => console.log('couldn\'t get expenses > : ', error));
   };
 };

