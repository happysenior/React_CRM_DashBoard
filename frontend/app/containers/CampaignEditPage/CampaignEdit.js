import React, { useEffect, useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Sequence from './Sequence';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import './index.scss';

import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import request from 'utils/request';

const CampaignEdit = props => {
  let campaignCardStyle = { height: props.sequence ? '230px' : '175px' };
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const history = useHistory();
  const { campaignId } = useParams();

  const [statistic, setStatistic] = useState(null);
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

  const loadStatistic = async () => {
    const url = api.getLoadCampaignStatisticPath(campaignId);
    try {
      const res = await request(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        setStatistic(res);
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
    let sequence = { ...state.sequence };

    let days = sequence.days;
    let newDay = days.length > 0 ? days[days.length - 1].runDay + 1 : 1;

    sequence.days.push({
      runDay: newDay,
      runTime: '09:00',
      events: [],
    });
    setState(prevState => {
      return {
        ...prevState,
        sequence: sequence,
      };
    });
  };

  const deleteDay = index => {
    let sequence = state.sequence;
    sequence.days = sequence.days.filter((x, k) => {
      return k != index;
    });
    setState(prevState => {
      return {
        ...prevState,
        sequence,
      };
    });
  };

  const selectDay = index => {
    setSelectedEvent(null);
    setSelectedDay(index);
  };

  const changeRunDay = (day, value) => {
    let sequence = state.sequence;
    sequence.days = sequence.days.map((x, k) => {
      if (k != day) return x;
      return {
        ...x,
        runDay: value,
      };
    });
    setState(prevState => {
      return {
        ...prevState,
        sequence,
      };
    });
  };

  const changeRunTime = (day, value) => {
    let sequence = state.sequence;
    sequence.days = sequence.days.map((x, k) => {
      if (k != day) return x;
      return {
        ...x,
        runTime: value,
      };
    });
    setState(prevState => {
      return {
        ...prevState,
        sequence,
      };
    });
  };

  const addEvent = (day, type) => {
    let sequence = state.sequence;
    sequence.days = sequence.days.map((x, k) => {
      if (k != day) return x;
      let events = x.events;
      events.push({
        type,
        delay: '00:00',
        notes: '',
        name: '',
        subject: '',
        content: '',
      });
      return {
        ...x,
        events,
      };
    });

    setState(prevState => {
      return {
        ...prevState,
        sequence,
      };
    });
  };

  const deleteEvent = (day, index) => {
    let sequence = state.sequence;
    sequence.days = sequence.days.map((x, k) => {
      if (k != day) return x;
      let events = x.events;
      events = events.filter((y, l) => l != index);
      return {
        ...x,
        events,
      };
    });
    setState(prevState => {
      return {
        ...prevState,
        sequence,
      };
    });
  };

  const selectEvent = index => {
    setSelectedEvent(index);
  };

  const updateEventProperty = (key, value) => {
    let sequence = state.sequence;
    sequence.days = sequence.days.map((x, k) => {
      if (k != selectedDay) return x;
      let events = x.events;
      events = events.map((y, l) => {
        if (l != selectedEvent) return y;
        return {
          ...y,
          [key]: value,
        };
      });
      return {
        ...x,
        events,
      };
    });
    setState(prevState => {
      return {
        ...prevState,
        sequence,
      };
    });
  };

  const fileUpload = file => {
    const url = api.getUploadFilePath();
    const formData = new FormData();
    formData.append('uploadFile', file);

    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const setImage = imageFile => {
    return fileUpload(imageFile).then(res => {
      updateEventProperty('attach', res.data.url);
    });
  };

  const saveSequence = async () => {
    const url = api.getUpdateSequencePath(state.sequence._id);
    try {
      const res = await request(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(state.sequence),
      });
      loadCampaign();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCampaign();
    loadStatistic();
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
                  {statistic ? (
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

                            <div className="big-number">
                              {statistic.allProspects}
                            </div>
                            <div className="small-number text-danger">
                              <span>{statistic.subProspects}</span>
                              <span>{`(${statistic.prospectPercent}%)`}</span>
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

                            <div className="big-number">
                              {statistic.allConversations}
                            </div>
                            <div className="small-number text-danger">
                              <span>{statistic.subConversations}</span>
                              <span>{` (${statistic.conversationPercent}%)`}</span>
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

                            <div className="big-number">
                              {statistic.allConversations}
                            </div>
                            <div className="small-number text-danger">
                              <span>{statistic.subConversations}</span>
                              <span>{` (${statistic.respondedPercent}%)`}</span>
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
                              <span>{statistic.responseRate}</span>
                              <span>%</span>
                            </div>
                            <div className="small-number text-success">
                              {`${statistic.responseRate} (${statistic.responseRate}%)`}
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
                  deleteDay={deleteDay}
                  selectDay={selectDay}
                  selectedDay={selectedDay}
                  changeRunDay={changeRunDay}
                  changeRunTime={changeRunTime}
                  addEvent={addEvent}
                  deleteEvent={deleteEvent}
                  selectEvent={selectEvent}
                  selectedEvent={selectedEvent}
                  updateEventProperty={updateEventProperty}
                  setImage={setImage}
                  saveSequence={saveSequence}
                  loadCampaign={loadCampaign}
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
