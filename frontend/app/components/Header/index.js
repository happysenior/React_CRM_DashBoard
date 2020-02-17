/**
 *
 * Header
 *
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

// Import Components
import HeaderWrapper from './HeaderWrapper';
import ImageWrapper from './ImageWrapper';
import Logo from './Logo';
import Icon from './Icon';

export default function Header() {
  return (
    <HeaderWrapper>
      <ImageWrapper>
        <NavLink to="/">
          <Logo src="/logo.png" alt="Company" />
        </NavLink>
      </ImageWrapper>
      <ImageWrapper>
        <Icon src="/icon.png" alt="Company" />
      </ImageWrapper>
    </HeaderWrapper>
  );
}
