import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { socket } from 'utils/socket';

import styled from 'styled-components';
import { PRIMARY_LIGHT, PRIMARY_BLUE_DARK } from 'utils/colors';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
} from 'reactstrap';

import './index.scss';
import {
  logoutAction,
  goProspectAction,
  receiveNewMessageAction,
  goConversationAction,
  goCampaignsAction,
} from 'containers/App/actions';
import { makeUnreadMessageSelector } from 'containers/App/selectors';
import {
  loadChatAction,
  loadListAction,
  loadProspectAction,
  reloadConversationAction,
} from 'containers/ConversationPage/actions';

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

const key = 'appPage';

const stateSelector = createStructuredSelector({
  unreadMessage: makeUnreadMessageSelector(),
});

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => setDropdownOpen(prevState => !prevState);

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const { unreadMessage } = useSelector(stateSelector);
  const notifications = 0;
  const appointments = 0;
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const handleGoProspect = () => {
    dispatch(goProspectAction());
  };

  const handleGoConversation = () => {
    dispatch(goConversationAction());
  };

  const handleGoCampaigns = () => {
    dispatch(goCampaignsAction());
  };

  useEffect(() => {
    socket.on('RECEIVE_NEW_MESSAGE', data => {
      dispatch(receiveNewMessageAction(data));
      dispatch(reloadConversationAction());
    });
    return () => {
      socket.off('RECEIVE_NEW_MESSAGE');
    };
  }, []);
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
          <Nav className="mr-auto cursor-point">
            <NavItem>
              <NavLink to="/prospects" onClick={handleGoProspect}>
                Prospects
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/pipline">Pipline</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/campaigns" onClick={handleGoCampaigns}>
                Campaigns
              </NavLink>
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
              <NavLink to="/appointments" className="position-relative">
                <CalendarTodayIcon />
                {appointments ? (
                  <div className="indicator">{appointments}</div>
                ) : null}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/conversations"
                className="position-relative"
                onClick={handleGoConversation}
              >
                <ForumOutlinedIcon />
                {unreadMessage ? (
                  <div className="indicator">{unreadMessage}</div>
                ) : null}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/notifications" className="position-relative">
                <NotificationsIcon />
                {notifications ? (
                  <div className="indicator">{notifications}</div>
                ) : null}
              </NavLink>
            </NavItem>
            <NavItem>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="bg-transparent border-0">
                  <AccountCircleIcon fontSize="large" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}
