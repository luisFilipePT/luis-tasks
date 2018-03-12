import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

import { SCOPES, CLIENT_ID } from '../../constants';

import { loginUser } from '../../actions';
import withNavigate from '../hocs/with_navigate';

import dummyLogo from '././../../assets/img/the-web-works.svg';


const styles = {
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    innerBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '10rem',
        borderRadius: 3,
        boxShadow: '#0000005e 4px 4px 15px 2px',
    },
};

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        const funcsToBind = [
            'responseGoogle',
        ];
        funcsToBind.forEach((f) => {
            this[f] = this[f].bind(this);
        });
    }

    componentDidMount() {
        if (this.props.isAuthenticated) this.props.navigateTo('/');
    }

    responseGoogle(googleLoginResponse) {
        if (!googleLoginResponse.error) {
            this.props.loginUser(googleLoginResponse, this.props.navigateTo);
        }
    }

    render() {
        return (
            <div className="login" style={styles.box}>
                <div style={styles.innerBox}>
                    <div style={{ marginBottom: '3rem' }}>
                        <img src={dummyLogo} alt="dummy logo"/>
                    </div>
                    <p className="paragraph">Login with your google account</p>
                    <GoogleLogin
                        isSignedIn
                        clientId={CLIENT_ID}
                        scope={SCOPES}
                        buttonText="Login"
                        prompt="consent"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    const { isAuthenticated, isFetching, formErrors } = auth;

    return {
        isAuthenticated,
        isFetching,
        formErrors,
    };
}

export default connect(mapStateToProps, {
    loginUser,
})(withNavigate(LoginScreen));
