'use strict';

const React = require('react');
var LoginForm = require('../login-form/index.js');

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'status': 'being',
            'error': null
        };
    }

    handleLoginResponse(status, response) {
        if (status === 400) {
            console.log(status);
            this.handleFieldsError(response);
        }
        else if (status === 403) {
            console.log(status);
            this.handleMisMatch(response);
        }
        else if (status === 500) {
            console.log(status);
            this.handleUnknownError(response);
        }
        else if (status === 200) {
            console.log('good');
        }
    }

    handleFieldsError(response) {
        if (response.errorType === 'ContentType') {
            let errorMessage = 'Wrong content type!';
            this.setState({'error': errorMessage});
        }
        else if (response.errorType === 'MissingFields') {
            let errorMessage = 'Required field Missing!';
            this.setState({'error': errorMessage});
        }
        else if (response.errorType === 'WrongFormat') {
            let errorMessage = 'Wrong format!';
            this.setState({'error': errorMessage});            
        }
    }

    handleMisMatch(response) {
        if (response.errorType === 'MisMatch') {
            let errorMessage = 'Wrong password!';
            this.setState({'error': errorMessage});
        }
    }

    handleUnknownError(response) {
        if (response.errorType === 'Unknown') {
            let errorMessage = 'Unknown Error!';
            this.setState({'error': errorMessage});
        }
    }

    submitLogin(event) {
        event.preventDefault();
        var LoginInfo = {
            'username': event.target.elements.namedItem('username').value,
            'password': event.target.elements.namedItem('password').value
        }
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                this.handleLoginResponse(xhr.status, xhr.response);
            }
        }.bind(this));
        xhr.open('POST', '/api/login');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader("Content-Type", "application/json");
        this.setState({'status': 'loading'});
        xhr.send(JSON.stringify(LoginInfo));
    };

    render() {
        return (
            <main >
                <h3>Log in to Variscite</h3>
                <LoginForm isLoading={this.state.status === 'loading'} onSubmit={this.submitLogin.bind(this)} />
                <p className='or'>or</p>
                <button className="newAccount">Create New Account</button>
            </main>
        );
    }
}

module.exports = LoginComponent;