import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import BulkEditModal from './BulkEditModal';
import {
  goSendBroadcastAction,
  goImportCSVAction,
  searchAction,
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
  const [modalState, setModalState] = useState({
    type: 1,
    open: false,
  });

  let history = useHistory();

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

  const handlCreateProspect = () => {
    history.push('/prospects/create');
  };

  const modalToggle = () => {
    setModalState(prevState => ({ ...prevState, open: !prevState.open }));
  };

  const search = searchKey => {
    dispatch(searchAction(searchKey));
  };

  const openModal = type => {
    setModalState(prevState => {
      return {
        ...prevState,
        open: true,
        type,
      };
    });
  };

  useEffect(() => {
    setModalState(prevState => {
      return props.modalState;
    });
    return () => {};
  }, [props.modalState]);
  const renderBulkEditDropdown = (selectedIdsCnt, totalProspects, checkAll) => {
    let selectedCnt = checkAll
      ? totalProspects - selectedIdsCnt
      : selectedIdsCnt;
    return (
      <Dropdown
        className="m-2"
        style={styles.toolbarBtn}
        isOpen={bulkEditDropdownOpen}
        toggle={toggleBulkEdit}
      >
        <DropdownToggle caret className="border-0" style={styles.toolbarBtn}>
          Bulk Edit ({selectedCnt}/{totalProspects})
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              if (selectedCnt < 1) return;
              openModal(1);
            }}
          >
            <ToolbarMenuItem title="Assign to campaign" help="" />
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              if (selectedCnt < 1) return;
              openModal(2);
            }}
          >
            <ToolbarMenuItem title="Change status" help="" />
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              if (selectedCnt < 1) return;
              openModal(3);
            }}
          >
            <ToolbarMenuItem title="Add tags" help="" />
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              if (selectedCnt < 1) return;
              openModal(4);
            }}
          >
            <ToolbarMenuItem title="Delete prospects" help="" />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
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
        <DropdownItem onClick={handlCreateProspect}>
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
        {props.totalProspects}
        <span> Prospects</span>
      </div>
      <div className="d-flex justify-content-between">
        <InputGroup className="m-2" style={styles.toolbarBtn}>
          <InputGroupAddon addonType="prepend">
            <InputGroupText style={styles.searchIcon}>
              <SearchIcon />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Search prospects..."
            style={styles.search}
            onChange={e => {
              search(e.target.value);
            }}
          />
        </InputGroup>
        {renderBulkEditDropdown(
          props.selectedIdsCnt,
          props.totalProspects,
          props.checkAll,
        )}
        {renderActionsDropdown()}
      </div>
      <BulkEditModal
        modalState={modalState}
        modalToggle={modalToggle}
        totalProspects={props.totalProspects}
        selectedIdsCnt={props.selectedIdsCnt}
        checkAll={props.checkAll}
        assignCampaign={props.assignCampaign}
        assignStatus={props.assignStatus}
        deleteProspects={props.deleteProspects}
      />
    </div>
  );
};

export default Toolbar;
