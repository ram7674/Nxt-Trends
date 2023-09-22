import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  
  const navigate = useNavigate();

  const onSubmitSuccess = (jwtToken) =>{
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate("/")
  }

  const onSubmitFailure = (errorMsg) => {
    /* console.log(errorMsg) */
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  }

  useEffect(() => {  //user is already login but try to login once more time to redirect the "/" home page.
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined) {
      navigate('/');
    }
  }, [navigate]);

  const submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = formData;
    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json()
    /* console.log(response)
    console.log(data) */
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    }
    else{
      onSubmitFailure(data.error_msg)
    }
  };

  const onChangeUsername = (event) => {
    setFormData({ ...formData, username: event.target.value });
  };

  const onChangePassword = (event) => {
    setFormData({ ...formData, password: event.target.value });
  };

  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={formData.password}
          onChange={onChangePassword}
        />
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={formData.username}
          onChange={onChangeUsername}
        />
      </>
    );
  };

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
