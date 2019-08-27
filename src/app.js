import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { auth } from './firebase/firebase';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';
import 'normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './styles/base/react-dates-overrides.scss';


const store = configureStore();

// Render variables
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
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

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