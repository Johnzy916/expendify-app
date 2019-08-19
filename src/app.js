import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { auth } from './firebase/firebase';

const store = configureStore();

const appJsx = (
  <Provider store={store}>
  <AppRouter />
  </Provider>
);

const appRoot = document.getElementById('app');

// CHECK IF RENDERED / AVOID RE-RENDER IF ALREADY RENDERED
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(appJsx, appRoot);
    hasRendered = true;
  }
}

// LOADING
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// LOGIN STATE CHANGE
auth.onAuthStateChanged((user) => {
  if (user) {
    
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses())
      .then(() => {
        renderApp();
        if (history.location.pathname === '/') {
          history.push('/dashboard');
        }
      });
      
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});