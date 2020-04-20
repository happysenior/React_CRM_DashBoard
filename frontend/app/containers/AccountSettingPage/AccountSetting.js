import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import request from 'utils/request';

const auth = new AuthService();
const api = new ApiEndpoint();

export default class AccountSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      systemPhone: '',
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
    this.state.firstName == '' &&
      (errors = { ...errors, firstNameError: `This field can not be empty` });

    const valid =
      this.state.title != '' &&
      validEmail &&
      this.state.phone != '' &&
      this.state.firstName != '';

    this.setState({ ...errors });
    return valid;
  };

  submit = async () => {
    if (this.validCheck()) {
      const token = auth.getToken();
      const url = api.getUsersDetailPath(auth.getUserId());

      try {
        const res = await request(url, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
          }),
        });
        this.props.history.push('/');
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  loadUserInfo = async () => {
    const url = api.getUsersDetailPath(auth.getUserId());
    const token = auth.getToken();

    console.log(url);
    console.log(token);
    try {
      const res = await request(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({
        firstName: res.user.firstName || '',
        lastName: res.user.lastName || '',
        email: res.user.email || '',
        phone: res.user.phone || '',
        systemPhone: res.user.systemPhone || '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = () => {
    this.loadUserInfo();
  };

  cancel = () => {
    this.props.history.goBack();
  };

  render() {
    const validEmail = this.emailValidate(this.state.email);

    return (
      <div className="setting-panel">
        <div id="ui-view">
          <div className="animated fadeIn">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 bg-white py-4">
                  <h4 className="mb-5">Account Setting</h4>
                  <form
                    onSubmit={e => {
                      e.preventDefault;
                    }}
                  >
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        defaultValue={this.state.firstName}
                        className="form-control form-control-lg"
                        onChange={e => {
                          this.setState({
                            firstName: e.target.value,
                            firstNameError: null,
                          });
                        }}
                      />
                      {this.state.firstNameError ? (
                        <div className="alert alert-danger" role="alert">
                          {this.state.firstNameError}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        defaultValue={this.state.lastName}
                        className="form-control form-control-lg"
                        onChange={e => {
                          this.setState({
                            lastName: e.target.value,
                          });
                        }}
                      />
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
                      <label>Forward phone number</label>
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
                      <label>Phone number</label>
                      <br />
                      <label>
                        <span className="notes">
                          The system number send messages from
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="+1234567890"
                        className="form-control form-control-lg"
                        value={this.state.systemPhone}
                        disabled
                        onChange={e => {}}
                      />
                      <Link to="/preferences/getnumber" className="getnumber">
                        CHANGE THIS NUMBER
                      </Link>
                    </div>

                    <div className="form-group text-right">
                      <button
                        type="button"
                        className="btn primary-color"
                        onClick={this.submit}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn primary-color ml-3"
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
    );
  }
}
