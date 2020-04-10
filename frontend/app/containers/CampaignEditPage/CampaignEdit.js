import React, { useEffect, useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Sequence from './Sequence';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

import './index.scss';

import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import request from 'utils/request';

const CampaignEdit = props => {
  let campaignCardStyle = { height: props.sequence ? '230px' : '175px' };

  const history = useHistory();
  const { campaignId } = useParams();

  const [state, setState] = useState({
    campaign: null,
    sequence: null,
    modalOpen: false,
  });

  const [newCampaignName, setNewCampaignName] = useState('');

  const auth = new AuthService();
  const token = auth.getToken();
  const api = new ApiEndpoint();

  const loadCampaign = async () => {
    const url = api.getLoadCampaignPath(campaignId);
    try {
      const res = await request(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.campaign) {
        setState({
          campaign: {
            _id: res.campaign._id,
            name: res.campaign.name,
            sequence: res.campaign.sequence ? res.campaign.sequence._id : null,
          },
          sequence: res.campaign.sequence ? res.campaign.sequence : null,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createSequence = async () => {
    try {
      const url = api.getCreateSequencePath(campaignId);
      const res = await request(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.sequence) {
        history.push(`/sequences/${res.sequence._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggle = () => {
    setState(prevState => {
      console.log(prevState);
      return {
        ...prevState,
        modalOpen: !prevState.modalOpen,
      };
    });
  };

  const renameCampaign = async () => {
    try {
      const url = api.getRenameCampaignPath(campaignId);
      console.log(url);
      const res = await request(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newCampaignName,
        }),
      });

      loadCampaign();
    } catch (err) {
      console.log(err);
    }
  };

  const addDay = () => {
    let days = state.sequence.days;
    console.log(days);
  };

  useEffect(() => {
    loadCampaign();
  }, []);

  return (
    <React.Fragment>
      <main className="main">
        <div className="container">
          <div>
            {state.campaign ? (
              <div className="animated fadeIn">
                <div className="row d-flex align-content-center">
                  <div className="col-sm-12 order-first order-sm-last">
                    <h2>{state.campaign.name}</h2>
                  </div>
                  <div className="col-sm-12">
                    <div className="text-right order-last order-sm-first">
                      <Button
                        outline
                        color="secondary"
                        className="campaign-btn"
                        size="sm"
                        onClick={() => {
                          toggle();
                        }}
                      >
                        <SettingsIcon fontSize="small" />
                        <span>Campaign settings</span>
                      </Button>
                      <Button
                        outline
                        color="secondary"
                        className="campaign-btn"
                        size="sm"
                      >
                        <SettingsApplicationsIcon fontSize="small" />
                        <span>Connect with Zapier</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="dashboard">
                  <div className="row">
                    <div className="col-md-12 text-right">
                      <div className="mt-3">
                        <button
                          data-period="daily"
                          className="btn change-period"
                        >
                          Today
                        </button>
                        <button
                          data-period="weekly"
                          className="btn change-period"
                        >
                          This week
                        </button>
                        <button
                          data-period="monthly"
                          className="btn change-period"
                        >
                          Last month
                        </button>
                      </div>
                    </div>
                  </div>
                  {state.statistic ? (
                    <div className="row mt-2">
                      <div className="col-3">
                        <div
                          className="card campaign-card"
                          style={campaignCardStyle}
                        >
                          <div className="card-body">
                            <h5 className="card-title text-muted">
                              All prospects
                            </h5>

                            <div className="big-number">0</div>
                            <div className="small-number text-danger">
                              0 (0%)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div
                          className="card campaign-card"
                          style={campaignCardStyle}
                        >
                          <div className="card-body">
                            <h5 className="card-title text-muted">Messages</h5>

                            <div className="big-number">0</div>
                            <div className="small-number text-danger">
                              0 (0%)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div
                          className="card campaign-card"
                          style={campaignCardStyle}
                        >
                          <div className="card-body">
                            <h5 className="card-title text-muted">Responded</h5>

                            <div className="big-number">0</div>
                            <div className="small-number text-danger">
                              0 (0%)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div
                          className="card campaign-card"
                          style={campaignCardStyle}
                        >
                          <div className="card-body">
                            <h5 className="card-title text-muted">
                              Response rate
                            </h5>

                            <div className="big-number">
                              <span>0</span> <span>%</span>
                            </div>
                            <div className="small-number text-success">
                              0 (0%)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <Sequence
                  sequence={state.sequence}
                  createSequence={createSequence}
                  addDay={addDay}
                />
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Modal isOpen={state.modalOpen} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Edit Campaign</ModalHeader>
        <ModalBody>
          <div>
            <p>Campaign name</p>
            <input
              type="text"
              value={newCampaignName}
              className="form-control form-control-lg"
              onChange={e => {
                setNewCampaignName(e.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button className="btn-new-campaign" onClick={renameCampaign}>
              update
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CampaignEdit;
