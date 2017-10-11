import React from 'react';
import SignupComponent from '../../components/SignupComponent';
import Header from '../../components/Header';

class SignupScreen extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={false}/>
        <main>
          <SignupComponent />
        </main>

      </div>
    );
  }
}

export default SignupScreen;
