import React from 'react';
import { PRIMARY_LIGHT, PRIMARY_DARK } from 'utils/colors';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  NavItem,
  NavLink,
  Row,
  Col,
  Input,
  DropdownMenu,
  Dropdown,
  DropdownToggle,
} from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';
import { nominalTypeHack } from 'prop-types';
const styles = {
  toolbar: {
    height: '70px',
  },
  title: {
    fontSize: '22px',
    color: `${PRIMARY_DARK}`,
    width: '20%',
  },
  search: {
    border: 'none',
    outline: 'none',
    background: `${PRIMARY_LIGHT}`,
  },
  searchIcon: {
    border: 'none',
    background: `${PRIMARY_LIGHT}`,
  },
  toolbarBtn: {
    background: `#F1F1F5`,
    color: '#696974',
    borderColor: '#696974',
  }
};

export default function Toolbar() {
  return (
    <div
      style={styles.toolbar}
      className="d-flex justify-content-between p-3 font-weight-bold"
    >
      <div style={styles.title}>
        2342
        <span> Prospects</span>
      </div>
      <div className="d-flex justify-content-between">
        <InputGroup className="m-2" style={styles.toolbarBtn}>
          <InputGroupAddon addonType="prepend">
            <InputGroupText style={styles.searchIcon}>
              <SearchIcon />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Search prospects..." style={styles.search} />
        </InputGroup>
        <Dropdown className="m-2" style={styles.toolbarBtn}>
          <DropdownToggle caret className="border-0" style={styles.toolbarBtn}>
            Bulk Edit (0/620)
          </DropdownToggle>
          <DropdownMenu>
            <div></div>
          </DropdownMenu>
        </Dropdown>
        <Dropdown className="m-2" style={styles.toolbarBtn}>
          <DropdownToggle caret className="border-0" style={styles.toolbarBtn}>
            Actions
          </DropdownToggle>
          <DropdownMenu>
            <div></div>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
