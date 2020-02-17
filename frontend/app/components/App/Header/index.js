import React, { useState } from 'react';
import styled from 'styled-components';
import { PRIMARY_LIGHT, PRIMARY_BLUE_DARK } from 'utils/colors';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

const EmptyLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 10px;
  background-color: ${PRIMARY_LIGHT};
  &:hover {
    cursor: pointer;
  }
`;

const styles = {
  header: {
    background: `${PRIMARY_BLUE_DARK}`,
    height: '70px',
    color: `${PRIMARY_LIGHT}`,
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={styles.header}>
      <Navbar expand="md">
        <NavLink to="/" className="w-25 font-weight-bold">
          <div className="d-inline-flex">
            <EmptyLogo />
            <div className="d-flex align-items-center text-bold">Company</div>
          </div>
        </NavLink>
        <div className="d-flex justify-content-center h-100 w-50 ">
          <Nav className="mr-auto ">
            <NavItem>
              <NavLink to="/prospects">Prospects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/pipline">Pipline</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/campaigns">Campaigns</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/users">Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/lead-round-robin">Lead round robins</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/commissions">Commissions</NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className="d-flex justify-content-end h-100 w-25">
          <Nav>
            <NavItem>
              <NavLink to="/appointments">
                <CalendarTodayIcon />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/conversations">
                <ForumOutlinedIcon />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/notifications">
                <NotificationsIcon />
              </NavLink>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle className="bg-transparent border-0">
                  <AccountCircleIcon fontSize='large'/>
                </DropdownToggle>
                <DropdownMenu>
                  <div></div>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}
