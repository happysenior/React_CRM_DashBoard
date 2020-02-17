/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  loginToTheSystem: {
    id: `${scope}.loginToTheSystem`,
    defaultMessage: 'Company',
  },
  helmetLoginTitle: {
    id: `${scope}.helmetPaymentTitle`,
    defaultMessage: 'Login · CRM',
  },
  emailError: {
    id: `${scope}.emailError`,
    defaultMessage: 'Please enter the correct email',
  },
  passwordError: {
    id: `${scope}.passwordError`,
    defaultMessage: 'Please enter the correct access code',
  },
  emailEmpty: {
    id: `${scope}.emailEmpty`,
    defaultMessage: 'Please enter the email',
  },
  passwordEmpty: {
    id: `${scope}.passwordEmpty`,
    defaultMessage: 'Please enter the access code',
  },
  serverError: {
    id: `${scope}.serverError`,
    defaultMessage: 'Please try again in a moment',
  },
  loginAttemptError: {
    id: `${scope}.loginAttemptError`,
    defaultMessage: 'Please enter the correct email or password',
  },
});
