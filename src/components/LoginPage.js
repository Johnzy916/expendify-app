import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expendify</h1>
            <p>Track, search, and expect what you're spending.</p>
            <button 
                className="btn btn--google btn--shine"
                onClick={startLogin}>
                    Login with Google
            </button>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);