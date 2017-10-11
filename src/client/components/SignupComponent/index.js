require('./index.scss');
const React = require('react');
import SignupForm from '../SignupForm';

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'status': 'being',
      'alert': '',
    };
  }
  submitHandler(ev) {
    ev.preventDefault();
    let username = ev.target.elements.namedItem('username').value;
    let fullname = ev.target.elements.namedItem('fullname').value;
    let email = ev.target.elements.namedItem('email').value;
    let phonenumber = ev.target.elements.namedItem('phonenumber').value;
    let password = ev.target.elements.namedItem('password').value;
    let obj = {
      username: username,
      fullname: fullname,
      email: email,
      phonenumber: phonenumber,
      password: password,
    };
    let jsonData = JSON.stringify(obj);
    this.sendData(jsonData);
    
  }

  sendData(data) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 400) {
          let error = JSON.parse(xhr.responseText).errorType;
          if (error === 'contentType') {
            this.setState({'alert':
              'You entered the wrong content, please retry.'});
          } else if (error === 'missingField') {
            this.setState({'alert': 'You missed some field, please retry.'});
          } else if (error === 'fieldWrong') {
            this.setState({'alert':
              'You enter something wrong, please retry.'});
          }
        } else if (xhr.status === 409) {
          let error = JSON.parse(xhr.responseText).errorType;
          if (error === 'phoneError') {
            this.setState({'alert': 'Your phone has been used, please retry.'});
          } else if (error === 'usernameError') {
            this.setState({'alert':
              'Your username has been used, please retry.'});
          } else if (error === 'emailError') {
            this.setState({'alert': 'Your email has been used, please retry.'});
          }
        } else if (xhr.status === 500) {
          this.setState({'alert': 'Something wrong, please retry.'});
        } else if (xhr.status === 201) {
          this.setState({'alert': ''});
        }
      }
    }.bind(this));
    xhr.open('POST', 'http://localhost:1234/');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    this.setState({'status': 'loading'});
    xhr.send(data);
  }


  render() {
    return (
      <main >
        <h3>Create A New Account</h3>
        <SignupForm isLoading={this.state.status === 'loading'}
          onSubmit={this.submitHandler.bind(this)} alert={this.state.alert}/>
      </main>
    );
  }
}

export default SignupComponent;
