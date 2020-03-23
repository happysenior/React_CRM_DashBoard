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

const campaignOptions = [
  { value: 'welend', label: 'welend' },
  { value: 'labroker2', label: 'LABROKER2' },
];

const statusOptions = [
  { value: 'NEW', label: 'NEW' },
  { value: 'RESPONDED', label: 'RESPONDED' },
  { value: 'WIN', label: 'WIN' },
  { value: 'LOST', label: 'LOST' },
];

export default class ProspectProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donotcall: false,
      firstName: '',
    };

    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.emailRef = React.createRef();
    this.phoneRef = React.createRef();
    this._handleFocus = this._handleFocus.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
  }

  _handleFocus(text) {}

  _handleFocusOut(text) {}

  handleChange(name) {
    return event => {
      this.setState({ ...state, [name]: event.target.checked });
    };
  }

  changeFirstName = () => {
    if (this.firstNameRef) {
      const temp = this.firstNameRef.current.innerHTML;
      console.log(this.props.prospect.profile._id);
      if (this.props.firstName != temp) {
        this.props.changeProspectProperty(
          'firstName',
          this.firstNameRef.current.innerHTML,
          this.props.prospect.profile._id,
        );
      }
    }
  };

  changeLastName = () => {
    if (this.lastNameRef) {
      if (this.props.lastName != this.lastNameRef.current.innerHTML) {
        this.props.changeProspectProperty(
          'lastName',
          this.lastNameRef.current.innerHTML,
          this.props.prospect.profile._id,
        );
      }
    }
  };

  changeEmail = () => {
    if (this.emailRef) {
      if (this.props.email != this.emailRef.current.innerHTML) {
        this.props.changeProspectProperty(
          'email',
          this.emailRef.current.innerHTML,
          this.props.prospect.profile._id,
        );
      }
    }
  };

  changePhone = () => {
    if (this.phoneRef) {
      if (this.props.phone != this.phoneRef.current.innerHTML) {
        this.props.changeProspectProperty(
          'phone',
          this.emailRef.current.innerHTML,
          this.props.prospect.profile._id,
        );
      }
    }
  };

  changeStatus = event => {
    this.props.changeProspectProperty(
      'status',
      event.target.value,
      this.props.prospect.profile._id,
    );
  };

  changeCampaign = event => {
    this.props.changeProspectProperty(
      'campaign',
      event.target.value,
      this.props.prospect.profile._id,
    );
  };

  render() {
    return this.props.prospect ? (
      <ProspectProfileWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>First Name</ProfileFieldLabel>
          <div
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={this.firstNameRef}
            onBlur={this.changeFirstName}
          >
            {this.props.prospect.profile.firstName}
          </div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Last Name</ProfileFieldLabel>
          <div
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={this.lastNameRef}
            onBlur={this.changeLastName}
          >
            {this.props.prospect.profile.lastName}
          </div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Email</ProfileFieldLabel>
          <div
            contentEditable="true"
            ref={this.emailRef}
            suppressContentEditableWarning={true}
            onBlur={this.changeEmail}
          >
            {this.props.prospect.profile.email}
          </div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Phone</ProfileFieldLabel>
          <div
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={this.phoneRef}
            onBlur={this.changePhone}
          >
            {this.props.prospect.profile.phone}
          </div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Campaign</ProfileFieldLabel>
          <div>
            <select
              value={this.props.prospect.profile.campaign}
              onChange={this.changeCampaign}
            >
              {campaignOptions.map(x => {
                return (
                  <option
                    value={x.value}
                    key={`prospect_avatar_campaign_${x.value}`}
                  >
                    {x.label}
                  </option>
                );
              })}
            </select>
          </div>
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Status</ProfileFieldLabel>
          <div>
            <select
              value={this.props.prospect.profile.status}
              onChange={this.changeStatus}
            >
              {statusOptions.map(x => {
                return (
                  <option
                    value={x.value}
                    key={`prospect_avatar_status_${x.value}`}
                  >
                    {x.label}
                  </option>
                );
              })}
            </select>
          </div>
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
