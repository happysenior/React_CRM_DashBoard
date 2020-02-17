import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  PRIMARY_LIGHT,
  BORDER_GREY_LIGHT,
  PRIMARY_BLUE_DARK,
} from 'utils/colors';

// Import Components
import FormHeader from 'components/FormHeader';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';

// Import Actions
import {
  loginRequestAction,
  clearErrorAction,
} from 'containers/LoginPage/actions';

// Import Selectors
import {
  makeErrorSelector,
  makeIsLoadingSelector,
} from 'containers/LoginPage/selectors';

const stateSelector = createStructuredSelector({
  error: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
});

const styles = {
  loginContainer: {
    width: '512px',
    margin: 'auto',
    paddingTop: '150px',
  },
  loginForm: {
    padding: '20px',
    border: '1px solid',
    borderColor: `${BORDER_GREY_LIGHT}`,
    borderRadius: '8px',
    background: `${PRIMARY_LIGHT}`,
  },
  formTitle: {
    fontSize: '24px',
  },
  rememberMe: {
    width: '15px',
    height: '15px',
  },
  forgotPass: {
    color: `${PRIMARY_BLUE_DARK}`,
    textDecoration: 'none',
  },
  loginBtn: {
    background: `${PRIMARY_BLUE_DARK}`,
  },
  divider: {
    borderTop: '2px solid black',
  },
};

function validator(email, password) {
  const emailLimit = 20;
  const passwordLimit = 255;

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !isEmail.test(email) || email.length > emailLimit)
    return { status: false, error: 'Enter the correct email' };

  if (!password || password.length >= passwordLimit)
    return { status: false, error: 'Entger the correct password' };
  return { status: true };
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch();
  const handleLogin = e => {
    const result = validator(email, password);
    if (result.status) {
      dispatch(loginRequestAction({ email, password }));
    } else {
      setLocalError(result.error);
    }
  };
  const { error, isLoading } = useSelector(stateSelector);

  return (
    <div style={styles.loginContainer}>
      <FormHeader title="company" />
      <Form style={styles.loginForm} onSubmit={e => e.preventDefault()}>
        <FormGroup>
          <p style={styles.formTitle} className="font-weight-normal">
            Log In
          </p>
          <hr />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={e => {
              dispatch(clearErrorAction());
              setLocalError('');
              setEmail(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={e => {
              dispatch(clearErrorAction());
              setLocalError('');
              setPassword(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" style={styles.rememberMe} /> Remember Me
            </Label>
            <Link
              to="/forgot-password"
              style={styles.forgotPass}
              className="float-right"
            >
              Forgot password
            </Link>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Button block style={styles.loginBtn} onClick={handleLogin}>
            Log in
          </Button>
        </FormGroup>
        {error ? error : null}
        <p>{localError ? localError : null}</p>
      </Form>
    </div>
  );
}
