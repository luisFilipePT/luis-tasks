import React, { Component, Fragment } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import logo from './logo.svg';
import './assets/styles/main.css';

// components
import { NavBar, SideBar, ActionBar, TasksGrid, Footer } from './components/elements';

// Client ID and API key from the Developer Console
const CLIENT_ID = '951627156938-5d2pd5k9vjksj9ksh7fgksjanhvicjmu.apps.googleusercontent.com';
const API_KEY = 'DUrDmorIQ6UpoDMWNmlnSaNz';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/tasks.readonly';

class App extends Component {
    constructor(props) {
        super(props);
        const funcsToBind = [
            'responseGoogle',
        ];
        funcsToBind.forEach((f) => {
            this[f] = this[f].bind(this);
        });
    }

    responseGoogle(googleLoginresponse) {
        console.log(googleLoginresponse);
        console.log('googleLoginresponse.googleId ', googleLoginresponse.googleId);
        console.log('googleLoginresponse.token ', googleLoginresponse.tokenObj.access_token);
        const token = `Bearer ${googleLoginresponse.tokenObj.access_token}`;
        axios.get(`https://www.googleapis.com/tasks/v1/users/@me/lists?key=${API_KEY}`, {
            headers: {
                authorization: token,
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        // return (
        //     <GoogleLogin
        //         clientId={CLIENT_ID}
        //         scope={SCOPES}
        //         buttonText="Login"
        //         onSuccess={this.responseGoogle}
        //         onFailure={this.responseGoogle}
        //     />
        // );

        return (
            <Fragment>
                <NavBar/>
                <SideBar/>
                <main>
                    <div className="section-tasks">
                        <ActionBar/>
                        <TasksGrid/>
                    </div>
                </main>
                <Footer/>
            </Fragment>
        );
    }
}

export default App;
