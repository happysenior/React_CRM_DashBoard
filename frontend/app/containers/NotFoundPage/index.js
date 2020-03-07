/**
 *
 * NotFoundPage
 *
 */

import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import './index.scss';

export default function NotFoundPage() {
  return (
    <Container>
      <div className="pt-5 d-flex justify-content-center">
        <div className="h2 font-weight-bold mr-5">404 </div>
        <div className="h3"> Not Found Page</div>
      </div>
    </Container>
  );
}
