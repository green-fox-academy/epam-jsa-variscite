require('./index.scss');
const ReactDOM = require('react-dom');
const React = require('react');
import SignupForm from '../SignupForm';

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'status': 'being'
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
      password: password
    };
    let jsonData = JSON.stringify(obj);
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
          console.log(jsonData);
      }
    });
    xhr.open('POST', 'http://localhost:8080/');
    xhr.setRequestHeader("Accept","application/json");
    xhr.setRequestHeader("Content-Type","application/json");
    this.setState({'status': 'loading'});
    xhr.send(jsonData);
  }


  render() {
    return (
      <main >
        <h3>Create A New Account</h3>
        <SignupForm isLoading={this.state.status === 'loading'} onSubmit={this.submitHandler.bind(this)}/>
      </main>
    )
  };
}

export default SignupComponent;