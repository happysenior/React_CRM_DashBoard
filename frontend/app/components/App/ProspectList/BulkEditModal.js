import React, { useState, useEffect } from 'react';
import { useReducer } from 'react-redux';

import Select from 'react-select';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import IOSSwitch from './SwitchButton';
import { assignStatus } from '../../../containers/ProspectPage/saga';

import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import request from 'utils/request';

const auth = new AuthService();
const token = auth.getToken();
const api = new ApiEndpoint();

const CampaignModal = props => {
  const toggle = props.modalToggle;

  const [state, setState] = useState({
    campaign: '',
    autoSequence: false,
    waiting: false,
  });

  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = () => {
    setState(prevState => ({
      ...prevState,
      autoSequence: !prevState.autoSequence,
    }));
  };

  const changeCampaign = option => {
    setState(prevState => {
      return {
        ...prevState,
        campaign: option.value,
      };
    });
  };

  const assignCampaign = () => {
    props.assignCampaign(state.campaign, state.autoSequence);
    setState(prevState => {
      return {
        ...prevState,
        waiting: true,
      };
    });
  };

  useEffect(() => {
    async function fetchData() {
      const url = api.getAllCampaignsPath();
      try {
        const res = await request(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.campaigns) {
          return res.campaigns.map(x => {
            return {
              value: x._id,
              label: x.name,
            };
          });
        }
      } catch (err) {}
    }
    setIsLoading(true);
    fetchData().then(x => {
      setOptions(x);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Modal isOpen={true} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Assign to Campaign</ModalHeader>
        <ModalBody>
          <div>
            <span>What campaign would you like to move </span>
            <strong>{props.selectedIdsVSTotal}</strong>
            <span> prospects to?</span>
          </div>
          <div className="mt-2 h6">Campaigns</div>
          <Select
            options={options}
            isLoading={isLoading}
            onChange={changeCampaign}
          />
          <div className="mt-3 h6">Schedule automatic sequence</div>
          <div className="d-inline-flex">
            <div>
              Switch on if you'd like the prospect to be added into the new
              campaign sequence
            </div>
            <div>
              <IOSSwitch
                checked={state.autoSequence}
                onChange={handleChange}
                name="checkedAutoSequence"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className={'primary-button'}
            size="sm"
            onClick={assignCampaign}
            disabled={state.waiting}
          >
            Move
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const StatusModal = props => {
  const toggle = props.modalToggle;
  const options = [
    { value: '', label: '' },
    { value: 'NEW', label: 'NEW' },
    { value: 'RESPONDED', label: 'RESPONDED' },
    { value: 'WON', label: 'WON' },
    { value: 'LOST', label: 'LOST' },
  ];

  const [state, setState] = useState({
    status: '',
    waiting: false,
  });

  const assignStatus = () => {
    props.assignStatus(state.status);
    setState(prevState => {
      return {
        ...prevState,
        waiting: true,
      };
    });
  };

  const changeStatus = option => {
    setState(prevState => {
      return {
        ...prevState,
        status: option.value,
      };
    });
  };

  return (
    <div>
      <Modal isOpen={true} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Change status</ModalHeader>
        <ModalBody>
          <div>
            <span>What is the status of these </span>
            <strong>{props.selectedIdsVSTotal}</strong>
            <span> prospects</span>
          </div>
          <div className="mt-2 h6">Status</div>
          <Select options={options} onChange={changeStatus} />
        </ModalBody>
        <ModalFooter>
          <Button className={'primary-button'} size="sm" onClick={assignStatus}>
            SAVE
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const TagModal = props => {
  const toggle = props.modalToggle;
  const options = [
    { value: '', label: '' },
    { value: 'realestate', label: 'Real Estate' },
  ];

  return (
    <div>
      <Modal isOpen={true} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Add tags</ModalHeader>
        <ModalBody>
          <div>
            <span>Add tags to </span>
            <strong>{props.selectedIdsVSTotal}</strong>
            <span> prospects</span>
          </div>
          <div className="mt-2 h6">Add tag </div>
          <Select options={options} />
        </ModalBody>
        <ModalFooter>
          <Button className={'primary-button'} size="sm" onClick={toggle}>
            SAVE
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const DeleteModal = props => {
  const toggle = props.modalToggle;

  const [state, setState] = useState({
    waiting: false,
  });

  const deleteProspects = () => {
    props.deleteProspects();
    setState(prevState => {
      return {
        ...prevState,
        waiting: true,
      };
    });
  };

  return (
    <div>
      <Modal isOpen={true} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
        <ModalBody>
          <div>
            <span>You're about to delete </span>
            <strong>{props.selectedIdsVSTotal}</strong>
            <span> prospects?</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className={'primary-button'}
            size="sm"
            onClick={deleteProspects}
          >
            DELETE
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const BulkEditModal = props => {
  const { modalState, modalToggle } = props;

  if (modalState.open == false) return null;
  let selectedCnt = props.checkAll
    ? props.totalProspects - props.selectedIdsCnt
    : props.selectedIdsCnt;
  const selectedIdsVSTotal = `${selectedCnt}/${props.totalProspects}`;
  switch (props.modalState.type) {
    case 1:
      return (
        <CampaignModal
          modalToggle={modalToggle}
          selectedIdsVSTotal={selectedIdsVSTotal}
          assignCampaign={props.assignCampaign}
        />
      );
    case 2:
      return (
        <StatusModal
          modalToggle={modalToggle}
          selectedIdsVSTotal={selectedIdsVSTotal}
          assignStatus={props.assignStatus}
        />
      );
    case 3:
      return (
        <TagModal
          modalToggle={modalToggle}
          selectedIdsVSTotal={selectedIdsVSTotal}
        />
      );
    default:
      return (
        <DeleteModal
          modalToggle={modalToggle}
          selectedIdsVSTotal={selectedIdsVSTotal}
          deleteProspects={props.deleteProspects}
        />
      );
  }
};

export default BulkEditModal;
