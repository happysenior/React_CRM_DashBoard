import React from 'react';
import Toolbar from './Toolbar';
import Status from './Status';
import Panel from './Panel';
import Paginator from './Paginator';
import { Container } from 'reactstrap';

export default function ProspectList() {
  return (
    <Container>
      <Toolbar />
      <Status />
      <Panel />
      <Paginator />
    </Container>
  );
}
