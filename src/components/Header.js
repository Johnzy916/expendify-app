import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout, userName }) => (
  <header className="header">
      <div className="content-container">
        <nav className="header__content">
          <Link
            className="header__title"
            to="/dashboard">
              <h1>Expendify</h1>
          </Link>
          <div>
            <span className="header__username">
              {userName}
            </span>
            <button
              className="btn btn--primary btn--link"
              onClick={startLogout}>
                Logout
            </button>
          </div>
        </nav>
      </div>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = state => ({
  userName: state.auth.userName
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);