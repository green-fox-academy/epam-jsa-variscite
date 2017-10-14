import React from 'react';

const SignupForm = (props) => (
  <form className="signup-form" method="POST" action="/api/signup"
    onSubmit={props.onSubmit}>
    <input type="text" name="username"
      placeholder="Username (optional)"></input>
    <input type="text" name="fullname"
      placeholder="Full name (optional)"></input>
    <input type="email" name="email"
      required placeholder="Email Address"></input>
    <input type="text" name="phonenumber"
      placeholder="Phone number (optional)"></input>
    <input type="password" name="password" pattern=".{6,}"
      style={props.style} required placeholder="Password"></input>
    {props.error !== '' ? <span className='error'>
      {props.error}</span> : null}
    <input type="submit"
      value={props.isLoading ? 'loading' : 'Sign Up'}
      disabled={props.isLoading ? true : false}></input>
  </form>
);

module.exports = SignupForm;
