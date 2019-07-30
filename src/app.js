import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import 'normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(addExpense({ description: 'Gas bill', amount: 13000, createdAt: 2000 }));
store.dispatch(addExpense({ description: 'Water bill', amount: 12000, createdAt: 1024 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 500 }));

ReactDOM.render(
  <Provider store={store}>
  <AppRouter />
  </Provider>,
  document.getElementById('app')
);