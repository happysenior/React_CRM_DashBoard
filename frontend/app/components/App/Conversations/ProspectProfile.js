import React, { useState } from 'react';
import styled from 'styled-components';
import EditableLabel from 'react-inline-editing';
import PhoneInput from 'react-phone-number-input';
import InfoIcon from '@material-ui/icons/Info';
import Switch from '@material-ui/core/Switch';

import './index.scss';

import './phone.scss';
const ProspectProfileWrapper = styled.div`
  margin-bottom: 10px;
`;

const ProfileFieldWrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(53, 65, 71);
  font-size: 0.84375rem;
  height: 27px;
  padding: 3px 0px;
`;

const ProfileFieldLabel = styled.div`
  color: rgb(153, 153, 153);
  font-weight: 600;
  font-size: 0.84375rem;
  margin-right: 10px;
`;

export default class ProspectProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donotcall: false,
    };

    this._handleFocus = this._handleFocus.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
  }

  _handleFocus(text) {}

  _handleFocusOut(text) {}

  handleChange(name) {
    return event => {
      setState({ ...state, [name]: event.target.checked });
    };
  }

  render() {
    return this.props.prospect ? (
      <ProspectProfileWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Name</ProfileFieldLabel>
          <div>{`${this.props.prospect.profile.firstName} ${this.props.prospect.profile.lastName}`}</div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Email</ProfileFieldLabel>
          <div>{this.props.prospect.profile.email}</div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Phone</ProfileFieldLabel>
          <div>{this.props.prospect.profile.phone}</div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Campaign</ProfileFieldLabel>
          <div>welend</div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Status</ProfileFieldLabel>
          <div>{this.props.prospect.profile.status}</div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>
            Do not call
            <InfoIcon fontSize="small" />
          </ProfileFieldLabel>
          <Switch
            value="checkedD"
            checked={this.state.donotcall}
            onChange={this.handleChange('donotcall')}
            value="checkedB"
            color="primary"
            inputProps={{ 'aria-label': 'disabled checkbox' }}
          />
        </ProfileFieldWrapper>
      </ProspectProfileWrapper>
    ) : null;
  }
}
