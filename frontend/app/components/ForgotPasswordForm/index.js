import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  PRIMARY_LIGHT,
  BORDER_GREY_LIGHT,
  PRIMARY_BLUE_DARK,
} from 'utils/colors';

// Import Components
import FormHeader from 'components/FormHeader';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';

const styles = {
  forgotPasswordContainer: {
    width: '512px',
    margin: 'auto',
    paddingTop: '150px',
  },
  formTitle: {
    fontSize: '24px',
  },
  forgotPasswordForm: {
    padding: '20px',
    border: '1px solid',
    borderColor: `${BORDER_GREY_LIGHT}`,
    borderRadius: '8px',
    background: `${PRIMARY_LIGHT}`,
  },
  back: {
    color: `${PRIMARY_BLUE_DARK}`,
    textDecoration: 'none',
  },
  resetBtn: {
    background: `${PRIMARY_BLUE_DARK}`,
  },
};

function validator(email, password) {
  const emailLimit = 20;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !isEmail.test(email) || email.length > emailLimit)
    return { status: false, error: 'Enter the correct email' };
  return { status: true };
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch();
  const handleReset = e => {
    const result = validator(email);
    if (result.status) {
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div style={styles.forgotPasswordContainer}>
      <FormHeader title="company" />
      <Form
        style={styles.forgotPasswordForm}
        onSubmit={e => e.preventDefault()}
      >
        <FormGroup>
          <p style={styles.formTitle} className="font-weight-normal">
            Reset password
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
              setLocalError('');
              setEmail(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Button block style={styles.resetBtn} onClick={handleReset}>
            Reset password
          </Button>
        </FormGroup>
        <FormGroup className="text-center">
          <Link to="/login" style={styles.back}>
            Back to login
          </Link>
        </FormGroup>
        <p>{localError ? localError : null}</p>
      </Form>
    </div>
  );
}
