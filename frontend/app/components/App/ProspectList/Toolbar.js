import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';

import saga from 'containers/ProspectPage/saga';
import { PRIMARY_LIGHT, PRIMARY_DARK } from 'utils/colors';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle,
} from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';
import ToolbarMenuItem from './ToolbarMenuItem';
import {
  goSendBroadcastAction,
  goImportCSVAction,
} from 'containers/ProspectPage/actions';

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
  },
};

const key = 'prospectPage';

const Toolbar = props => {
  const [bulkEditDropdownOpen, setBulkEditDropdownOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);

  const toggleBulkEdit = () => setBulkEditDropdownOpen(prevState => !prevState);
  const toggleActions = () => setActionsDropdownOpen(prevState => !prevState);

  const dispatch = useDispatch();

  useInjectSaga({ key, saga });

  const handleSendBroadcast = () => {
    dispatch(goSendBroadcastAction());
  };

  const handleImportCSV = () => {
    dispatch(goImportCSVAction());
  };

  const renderActionsDropdown = () => (
    <Dropdown
      className="m-2"
      style={styles.toolbarBtn}
      isOpen={actionsDropdownOpen}
      toggle={toggleActions}
    >
      <DropdownToggle caret className="border-0" style={styles.toolbarBtn}>
        Actions
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header>Choose an option</DropdownItem>
        <DropdownItem onClick={handleSendBroadcast}>
          <ToolbarMenuItem
            title="Send Broadcast"
            help="To prospects who match these filter"
          />
        </DropdownItem>
        <DropdownItem>
          <ToolbarMenuItem title="Add new prospect" help="" />
        </DropdownItem>

        <DropdownItem>
          <ToolbarMenuItem
            title="Call"
            help="Prospects who match these filters"
          />
        </DropdownItem>
        <DropdownItem onClick={handleImportCSV}>
          <ToolbarMenuItem title="Import from CSV file" help="" />
        </DropdownItem>
        <DropdownItem>
          <ToolbarMenuItem
            title="Export"
            help="Prospects who match these filters"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <div
      style={styles.toolbar}
      className="d-flex justify-content-between p-3 font-weight-bold"
    >
      <div style={styles.title}>
        {props.prospectCnt}
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
        <Dropdown
          className="m-2"
          style={styles.toolbarBtn}
          isOpen={bulkEditDropdownOpen}
          toggle={toggleBulkEdit}
        >
          <DropdownToggle caret className="border-0" style={styles.toolbarBtn}>
            Bulk Edit (0/620)
          </DropdownToggle>
          <DropdownMenu right>
            <div></div>
          </DropdownMenu>
        </Dropdown>
        {renderActionsDropdown()}
      </div>
    </div>
  );
};

export default Toolbar;
