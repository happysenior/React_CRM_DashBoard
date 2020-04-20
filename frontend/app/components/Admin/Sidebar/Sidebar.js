import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'perfect-scrollbar';

import logo from 'assets/svg/logo.svg';
import AuthService from 'services/auth.service.js';
import './index.scss';
import Dashboard from '../../../containers/Admin/views/Dashboard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
    this.auth = new AuthService();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <Link to="/admin/dashboard" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </Link>
          <Link to="/admin/dashboard" className="simple-text logo-normal">
            Leadconversation
          </Link>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? ' active-pro' : '')
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {prop.icon == 'dashboard' ? <DashboardIcon /> : null}
                    {prop.icon == 'person' ? <PersonIcon /> : null}
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
            <li key={`logout-btn`}>
              <NavLink
                onClick={() => {
                  this.auth.unsetToken();
                }}
                to={'/'}
                className="nav-link"
                activeClassName=""
              >
                <PowerSettingsNewIcon />
                <p>LOGOUT</p>
              </NavLink>
            </li>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
