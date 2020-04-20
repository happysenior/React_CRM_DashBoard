import React, { Fragment, useState } from 'react';
import './index.scss';

import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import request from 'utils/request';

const auth = new AuthService();
const api = new ApiEndpoint();

export default class SequenceSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      email: '',
      phone: '',
      name: '',
      isForwardText: false,
      stopAfterRespond: true,
      start: '09:00',
      end: '18:00',
      weekendMessage: false,
    };
  }

  emailValidate = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validCheck = () => {
    let errors = {};
    this.state.title == '' &&
      (errors = { ...errors, titleError: `This field can not be empty` });

    const validEmail = this.emailValidate(this.state.email);
    !validEmail && (errors = { ...errors, emailError: `Email is incorrect` });

    this.state.phone == '' &&
      (errors = { ...errors, phoneError: `This field can not be empty` });
    this.state.name == '' &&
      (errors = { ...errors, nameError: `This field can not be empty` });

    const valid =
      validEmail &&
      this.state.title != '' &&
      this.state.phone != '' &&
      this.state.name != '';
    this.setState({ ...errors });
    return valid;
  };

  submitSettings = async () => {
    if (this.validCheck()) {
      const sequenceId = this.props.match.params.id;

      const url = api.getSequenceSettingPath(sequenceId);
      const token = auth.getToken();

      try {
        const res = await request(url, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: this.state.title,
            email: this.state.email,
            phone: this.state.phone,
            name: this.state.name,
            isForwardText: this.state.isForwardText,
            stopAfterRespond: this.state.stopAfterRespond,
            start: this.state.start,
            end: this.state.end,
            weekendMessage: this.state.weekendMessage,
          }),
        });
        this.props.history.goBack();
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  cancel = () => {
    this.props.history.goBack();
  };

  componentDidMount = () => {
    this.loadSequence();
  };

  loadSequence = async () => {
    const sequenceId = this.props.match.params.id;

    const url = api.getSequenceSettingPath(sequenceId);
    const token = auth.getToken();

    try {
      const res = await request(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        title,
        email,
        phone,
        name,
        isForwardText,
        stopAfterRespond,
        start,
        end,
        weekendMessage,
      } = res.sequence;

      this.setState({
        title: title || '',
        email: email || '',
        phone: phone || '',
        name: name || '',
        isForwardText: isForwardText != undefined ? isForwardText : false,
        stopAfterRespond:
          stopAfterRespond != undefined ? stopAfterRespond : true,
        start: start || '09:00',
        end: end || '18:00',
        weekendMessage: weekendMessage != undefined ? weekendMessage : false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const validEmail = this.emailValidate(this.state.email);

    return (
      <main className="main">
        <div className="container">
          <div id="ui-view">
            <div className="animated fadeIn">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-8 bg-white py-4">
                    <h2 className="mb-5">Sequence settings</h2>
                    <form
                      onSubmit={e => {
                        e.preventDefault;
                      }}
                    >
                      <div className="form-group">
                        <label>Sequence name </label>
                        <input
                          type="text"
                          placeholder="New Sequence"
                          defaultValue={this.state.title}
                          className="form-control form-control-lg"
                          onChange={e => {
                            this.setState({
                              title: e.target.value,
                              titleError: null,
                            });
                          }}
                        />
                        {this.state.titleError ? (
                          <div className="alert alert-danger" role="alert">
                            {this.state.titleError}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>Send email replies to</label>
                        <input
                          type="text"
                          placeholder="john@gmail.com"
                          value={this.state.email}
                          className="form-control form-control-lg"
                          onChange={e => {
                            this.setState({
                              email: e.target.value,
                              emailError: null,
                            });
                          }}
                        />
                        {this.state.emailError ? (
                          <div className="alert alert-danger" role="alert">
                            {this.state.emailError}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>Send notifications and call-backs to</label>
                        <input
                          type="text"
                          placeholder="+1234567890"
                          className="form-control form-control-lg"
                          value={this.state.phone}
                          onChange={e =>
                            this.setState({
                              phone: e.target.value,
                              phoneError: null,
                            })
                          }
                        />
                        {this.state.phoneError ? (
                          <div className="alert alert-danger" role="alert">
                            {this.state.phoneError}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>Name used in sequence</label>
                        <input
                          type="text"
                          placeholder="Adrian"
                          className="form-control form-control-lg"
                          value={this.state.name}
                          onChange={e =>
                            this.setState({
                              name: e.target.value,
                              nameError: null,
                            })
                          }
                        />
                        {this.state.nameError ? (
                          <div className="alert alert-danger" role="alert">
                            {this.state.nameError}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        Forward text responses
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            id="isForwardTextNo"
                            name="isForwardText"
                            checked={!this.state.isForwardText}
                            className="form-check-input"
                            onChange={e => {
                              if (e.target.checked)
                                this.setState({ isForwardText: false });
                            }}
                          />
                          <label
                            htmlFor="isForwardTextNo"
                            className="form-check-label"
                          >
                            No
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            name="isForwardText"
                            id="isForwardTextYes"
                            className="form-check-input"
                            checked={this.state.isForwardText}
                            onChange={e => {
                              if (e.target.checked)
                                this.setState({ isForwardText: true });
                            }}
                          />
                          <label
                            htmlFor="isForwardTextYes"
                            className="form-check-label"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <h5>Stop sequence when prospect respond</h5>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            name="stopAfterRespond"
                            id="stopAfterRespondNo"
                            className="form-check-input"
                            checked={!this.state.stopAfterRespond}
                            onChange={e => {
                              if (e.target.checked)
                                this.setState({ stopAfterRespond: false });
                            }}
                          />
                          <label
                            htmlFor="stopAfterRespondNo"
                            className="form-check-label"
                          >
                            No
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            name="stopAfterRespond"
                            id="stopAfterRespondYes"
                            checked={this.state.stopAfterRespond}
                            className="form-check-input"
                            onChange={e => {
                              if (e.target.checked)
                                this.setState({ stopAfterRespond: true });
                            }}
                          />
                          <label
                            htmlFor="stopAfterRespondYes"
                            className="form-check-label"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-12 py-2">
                          <h5>Cutoff</h5>
                          {/* Set cut-off times of when communication will be sent.
                          <br />
                          Time in <strong>America/New York</strong> timezone.
                          Current time: Apr 6th 2020, 8:49 am */}
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Start </label>
                            <input
                              type="time"
                              placeholder=""
                              value={this.state.start}
                              className="form-control form-control-lg"
                              onChange={e => {
                                this.setState({ start: e.target.value });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Stop </label>
                            <input
                              type="time"
                              placeholder=""
                              value={this.state.end}
                              className="form-control form-control-lg"
                              onChange={e => {
                                this.setState({ end: e.target.value });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 my-4">
                        <div className="form-group">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              checked={this.state.weekendMessage}
                              className="form-check-input "
                              onChange={e => {
                                this.setState({
                                  weekendMessage: e.target.checked,
                                });
                              }}
                            />
                            Send messages on weekend?
                          </label>
                        </div>
                      </div>
                      <div className="form-group text-right">
                        <button
                          type="button"
                          className="btn create-sequence"
                          onClick={this.submitSettings}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn create-sequence ml-3"
                          onClick={this.cancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
