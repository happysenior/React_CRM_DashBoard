/**
 *
 * Header
 *
 */

import React from 'react';

// Import Components
import FormHeaderWrapper from './FormHeaderWrapper';
import FormImageWrapper from './FormImageWrapper';
import EmptyLogo from '../Header/EmptyLogo';

export default function FormHeader(props) {
  return (
    <FormHeaderWrapper>
      <FormImageWrapper>
        {/* <Logo src="/logo.png" alt="Company" /> */}
        <EmptyLogo />
        <span>{props.title}</span>
      </FormImageWrapper>
    </FormHeaderWrapper>
  );
}
