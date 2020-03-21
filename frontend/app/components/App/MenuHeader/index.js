import React, { useState } from 'react';
import { PRIMARY_LIGHT, PRIMARY_BLUE_DARK } from 'utils/colors';
import { Container, Button, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

const styles = {
  menuHeader: {
    height: '50px',
    background: `${PRIMARY_LIGHT}`,
    color: `${PRIMARY_BLUE_DARK}`,
  },
  addFilter: {
    background: `${PRIMARY_BLUE_DARK}`,
    borderRadius: '0.7em',
  },
};

export default function MenuHeader() {

  return (
    <div style={styles.menuHeader}>
      <Container>
        <div className="d-flex justify-content-end">
          <Nav>
            <NavItem>
              <NavLink to="/propspects">
                <FormatListBulletedIcon />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/pipeline">
                <ViewColumnIcon />
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </Container>
    </div>
  );
}
