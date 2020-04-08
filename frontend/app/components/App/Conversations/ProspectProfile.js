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
      donotcall: '',
    };
  }

  componentDidMount = () => {
    this.state = {
      donotcall: '',
      isChanged_donotcall: false,
      isChanged_firstName: false,
      isChanged_lastName: false,
      isChanged_email: false,
      isChanged_phone: false,
      isChanged_address: false,
      isChanged_compaign: false,
      isChanged_status: false,
    };
  };

  changeLocalProspect = (field, value) => {
    this.setState({ [`isChanged_${field}`]: true });
    this.props.changeLocalProspectProperty({ [field]: value });
  };
  updateProspect = field => {
    if (this.state[`isChanged_${field}`] == true) {
      this.props.changeProspectProperty(
        field,
        this.props.prospect.profile[field],
        this.props.prospect.profile._id,
      );
    }
  };

  handleChange = property => {};
  handleCampaignSelectChange = async event => {
    await this.changeLocalProspect('campaign', event.target.value);
    this.updateProspect('campaign');
  };

  handleStatusSelectChange = async event => {
    await this.changeLocalProspect('status', event.target.value);
    this.updateProspect('status');
  };

  render() {
    return this.props.prospect ? (
      <ProspectProfileWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>First Name</ProfileFieldLabel>
          <input
            className="prospect-info-input"
            defaultValue={this.props.prospect.profile.firstName}
            onChange={e =>
              this.changeLocalProspect('firstName', e.target.value)
            }
            onBlur={e => this.updateProspect('firstName')}
          />
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Last Name</ProfileFieldLabel>
          <input
            className="prospect-info-input"
            defaultValue={this.props.prospect.profile.lastName}
            onChange={e => this.changeLocalProspect('lastName', e.target.value)}
            onBlur={e => this.updateProspect('lastName')}
          />
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Phone</ProfileFieldLabel>
          <input
            className="prospect-info-input"
            defaultValue={this.props.prospect.profile.phone}
            onChange={e => this.changeLocalProspect('phone', e.target.value)}
            onBlur={e => this.updateProspect('phone')}
          />
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Address</ProfileFieldLabel>
          <input
            className="prospect-info-input"
            defaultValue={this.props.prospect.profile.address}
            onChange={e => this.changeLocalProspect('address', e.target.value)}
            onBlur={e => this.updateProspect('address')}
          />
        </ProfileFieldWrapper>
        <ProfileFieldWrapper>
          <ProfileFieldLabel>Campaign</ProfileFieldLabel>
          <div>
            <select
              value={this.props.prospect.profile.campaign}
              onChange={this.handleCampaignSelectChange}
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
              onChange={this.handleStatusSelectChange}
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
        {/* <ProfileFieldWrapper>
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
        </ProfileFieldWrapper> */}
      </ProspectProfileWrapper>
    ) : null;
  }
}
