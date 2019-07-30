import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
import './style.scss';


// action generators
////////////////////

// ADD_EXPENSE
const addExpense = (
  { description = '', note = '', amount = 0, createdAt = 0 } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, edits) => ({
  type: 'EDIT_EXPENSE',
  id,
  edits
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date'
});

// SORT_BY_AMOUNT
const sortByAmount = (sortBy) => ({
  type: 'SORT_BY_AMOUNT',
  sortBy
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// reducers
///////////////////

// expenses reducer
const expensesReducer = (state, action) => {
  if (typeof state === 'undefined') { 
    return [] 
  }
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.edits
          };
        } else { return expense };
      });
    default:
      return state;
  }
}
// filters reducer
const filtersReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return {
      text: '',
      sortBy: 'date',
      startDate: undefined,
      endDate: undefined
    }
  }
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: action.sortBy
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: action.sortBy
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
}


// store
///////////////////

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  render(visibleExpenses);
})

// get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expenses) => {
    const startDateMatch = typeof startDate !== 'number' || expenses.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expenses.createdAt <= endDate;
    const textMatch = expenses.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'ascending') {
      return a.amount < b.amount ? -1 : 1;
    } else if (sortBy === 'descending') {
      return a.amount < b.amount ? 1 : -1;
    } else return 0;
  });
};

// dispatches
////////////////////

const boundAddExpense = () => {
  const itemArray = ['rent', 'coffee', 'chips', 'bagels', 'home', 'car', 'lettuce'];
  const randomItem = itemArray[Math.floor(Math.random() * itemArray.length)];
  store.dispatch(addExpense({
    description: randomItem,
    note: randomItem,
    amount: Math.floor(Math.random() * 10000),
    createdAt: Math.floor(Math.random() * (1569542400000 - 1542544000000 + 1)) + 1542544000000
  }));
};

const boundRemoveExpense = (id) => {
  store.dispatch(removeExpense({ id }));
};

const boundEditExpense = (id, edits) => {
  store.dispatch(editExpense(id, edits));
};

const boundSelectFilter = (value) => {
  const sortType = value === 'date' ? sortByDate() : sortByAmount(value);
  store.dispatch(sortType);
}

const boundSetTextFilter = () => {
  store.dispatch(setTextFilter(document.getElementById('text').value));
}

const boundSetDateFilter = () => {
  store.dispatch(setStartDate(new Date(document.getElementsByName('startDate')[0].value).getTime()));
  store.dispatch(setEndDate(new Date(document.getElementsByName('endDate')[0].value).getTime()));
};

// render stuff (since we haven't connected to React yet)
//////////////////////

const render = (visibleExpenses = store.getState().expenses) => {
  const App = () => {
    // create list of expense items
    const listItems = visibleExpenses.map(expense => (
      <div 
      key={expense.id}
      style={{
        border: '1px solid gray',
        padding: '1rem 2rem',
        marginBottom: 2,
        background: 'paleturquoise'
      }}>
        <p>
          Description: {expense.description}
          <button
          className="editBtn" 
          onClick={() => boundEditExpense(expense.id, {
            description: 'this was edited'
          })}>edit</button>
        </p>
        <p>
          Note: {expense.note}
          <button
          className="editBtn" 
          onClick={() => boundEditExpense(expense.id, {
            note: 'this was also edited'
          })}>edit</button>
        </p>
        <p>
          Amount: {expense.amount}
          <button
          className="editBtn" 
          onClick={() => boundEditExpense(expense.id, {
            amount: Math.floor(Math.random() * 15000)
          })}>edit</button>
        </p>
        <button 
          className="removeBtn"
          onClick={() => boundRemoveExpense(expense.id)}
        >Remove</button>
      </div>
    ));
    // return for render
    return (
      <div className="appContainer">
        <div className="addSearchDiv">
        <button
          className="btn"
          onClick={() => boundAddExpense()}
        >addExpense</button>
        <form name="search" 
          onSubmit={(e) => {
            e.preventDefault();
            boundSetTextFilter();
          }}>
        <input type="text" id="text" placeholder="search"></input>
        <button type="submit">Go</button>
        </form>
        </div>
        <div className="filterDateDiv">
          <select 
            className="select"
            defaultValue={store.getState().filters.sortBy}
            onChange={() => boundSelectFilter(document.querySelector('.select').value)}
          >
          <option value="date">Date</option> :
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
          </select>
        <form name="filter"
          onSubmit={(e) => {
            e.preventDefault();
            boundSetDateFilter();
          }}
        >
          <input type="date" name="startDate"
            disabled={store.getState().filters.sortBy !== 'date'}
            defaultValue="2019-07-08"
            required
          />
          <input type="date" name="endDate"
            disabled={store.getState().filters.sortBy !== 'date'}
            defaultValue="2019-09-27"
            required
          />
          <button type="submit" disabled={store.getState().filters.sortBy !== 'date'}>Go</button>
        </form>
        </div>
        <div>
        {listItems}
        </div>
      </div>
    );
  };

  const appRoot = document.getElementById('app');
  ReactDOM.render(<App />, appRoot);
};

render();