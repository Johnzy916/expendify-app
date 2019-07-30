import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = () => (
  <header className="header">
    <h1>Expensify</h1>
    <nav className="header__links">
      <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
      <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
      <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    </nav>
  </header>
);

export default Header;