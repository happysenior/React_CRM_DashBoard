import React, { useState } from 'react';
import { PRIMARY_LIGHT, PRIMARY_BLUE_DARK } from 'utils/colors';
import { Container, Button, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import AddIcon from '@material-ui/icons/Add';
const styles = {
  menuHeader: {
    height: '70px',
    background: `${PRIMARY_LIGHT}`,
    color: `${PRIMARY_BLUE_DARK}`,
  },
  addFilter: {
    background: `${PRIMARY_BLUE_DARK}`,
    borderRadius: '0.7em'
  },
};

export default function MenuHeader() {
  return (
    <div style={styles.menuHeader}>
      <Container>
        <div className="d-flex p-3">
          <div className="d-flex justify-content-start w-75 ">
            <Button style={styles.addFilter}>
              <AddIcon /> Add filter
            </Button>
          </div>
          <div className="d-flex justify-content-end w-25">
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
        </div>
      </Container>
    </div>
  );
}
