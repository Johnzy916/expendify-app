import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: 'abc123' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'abc123'
  });
});

test('should remove expense from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toBeNull();
      done();
    });
});

test('should setup edit expense action object', () => {
  const action = editExpense('abc123', { note: 'new note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    edits: { note: 'new note value' }
  });
});

test('should edit expense in firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  const edits = {
    description: 'Onion',
  };
  store.dispatch(startEditExpense(id, edits))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        edits
      });
      return database.ref(`expenses/${id}`).once('value');
    }).then(snapshot => {
      expect(snapshot.val().description).toBe(edits.description);
      done();
    });
});

// test('should setup add expense action object with provided values', () => {
//   const action = addExpense(expenses[0]);
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: expenses[0]
//   });
// });

// test('should add expense to database and store', (done) => {
//   const store = createMockStore({});
//   const expenseData = {
//     description: 'Mouse',
//     amount: 3000,
//     note: 'baby mouse',
//     createdAt: 9999
//   };
  
//   store.dispatch(startAddExpense(expenseData))
//     .then(() => {
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//           id: expect.any(String),
//           ...expenseData
//         }
//       });
//       return database.ref(`expenses/${actions[0].expense.id}`).once('value');
//     }).then(snapshot => {
//       expect(snapshot.val()).toEqual(expenseData);
//       done();
//     });
// });

// test('should add expense with defaults to database and store', (done) => {
//   const store = createMockStore({});
//   const defaultValues = {
//     description: '',
//     amount: 0,
//     note: '',
//     createdAt: 0
//   };
  
//   store.dispatch(startAddExpense({}))
//     .then(() => {
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//           id: expect.any(String),
//           ...defaultValues
//         }
//       });
      
//       return database.ref(`expenses/${actions[0].expense.id}`).once('value');
//     }).then(snapshot => {
//       expect(snapshot.val()).toEqual(defaultValues);
//       done();
//     });
// });

// test('should setup set expense action object with data', () => {
//   const action = setExpenses(expenses);
//   expect(action).toEqual({
//     type: 'SET_EXPENSES',
//     expenses
//   })
// });

// test('should fetch the expenses from firebase', (done) => {
//   const store = createMockStore({});
//   store.dispatch(startSetExpenses())
//     .then(() => {
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({
//           type: 'SET_EXPENSES',
//           expenses
//       });
//       done();
//     });
// });