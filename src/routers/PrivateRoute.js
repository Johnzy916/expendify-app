import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Modal from '../components/Modal';

export const PrivateRoute = ({
        isAuthenticated,
        component: Component,
        ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Fragment>
                <Header />
                <Component {...props} />
                <Modal />
            </Fragment>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);