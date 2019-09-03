import React, { Component } from 'react';
import ReactModal from './PasswordModal';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }
    
    hideModal = () => {
        this.setState(() => ({
          showModal: false
        }));
    }
    
    handleCancelPassword = () => {
       this.hideModal(); 
    }
    
    handleConfirmPassword = () => {
        this.hideModal();
        console.log('confirmed password');
    }
    
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Expendify</h1>
                    <p className="box-layout__tagline">Track, search, and expect what you're spending.</p>
                    <button 
                        className="btn btn--google btn--shine box-layout__button"
                        onClick={() => this.props.startLogin('google')}>
                            <img
                                className="box-layout__button-logo"
                                src="/images/brands/google-logo.png" alt="google logo" 
                            />
                            Login with Google
                    </button>
                    <button 
                        className="btn btn--github btn--shine box-layout__button"
                        onClick={() => this.props.startLogin('github')}>
                            <img
                                className="box-layout__button-logo"
                                src="/images/brands/github-logo.png" alt="google logo" 
                            />
                            Login with Github
                    </button>
                    <button 
                        className="btn btn--facebook btn--shine box-layout__button"
                        onClick={() => this.props.startLogin('facebook')}>
                            <img
                                className="box-layout__button-logo"
                                src="/images/brands/facebook-logo.png" alt="google logo" 
                            />
                            Login with Facebook
                    </button>
                </div>
                <ReactModal 
                  showModal={this.state.showModal}
                  handleConfirmPassword={this.handleConfirmPassword}
                  handleCancelPassword={this.handleCancelPassword}
                />
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    startLogin: (type) => dispatch(startLogin(type))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);