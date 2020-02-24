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

const ProspectProfile = props => {
  // const [name, setName] = useState('Alex');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [campaign, setCampaign] = useState('');
  // const [status, setStatus] = useState('');
  // const [donotcall, setDonotcall] = useState(false);

  const [state, setState] = React.useState({
    donotcall: false,
  });
  const _handleFocus = text => {};

  const _handleFocusOut = text => {};

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const profile = props.prospect ? props.prospect.profile : null;
  return profile ? (
    <ProspectProfileWrapper>
      <ProfileFieldWrapper>
        <ProfileFieldLabel>Name</ProfileFieldLabel>
        <EditableLabel
          text={`${profile.firstName} ${profile.lastName}`}
          labelClassName="profile-label"
          inputClassName="profile-input"
          inputMaxLength={50}
          onFocus={_handleFocus}
          onFocusOut={_handleFocusOut}
          className="profile-inline-editing"
        />
      </ProfileFieldWrapper>
      <ProfileFieldWrapper>
        <ProfileFieldLabel>Email</ProfileFieldLabel>
        <EditableLabel
          text={profile.email || ''}
          labelClassName="profile-label"
          inputClassName="profile-input"
          inputMaxLength={50}
          onFocus={_handleFocus}
          onFocusOut={_handleFocusOut}
          className="profile-inline-editing"
        />
      </ProfileFieldWrapper>
      <ProfileFieldWrapper>
        <ProfileFieldLabel>Phone</ProfileFieldLabel>
        <EditableLabel
          text={profile.phone || ''}
          labelClassName="profile-label"
          inputClassName="profile-input"
          inputMaxLength={50}
          onFocus={_handleFocus}
          onFocusOut={_handleFocusOut}
          className="profile-inline-editing"
        />
      </ProfileFieldWrapper>
      <ProfileFieldWrapper>
        <ProfileFieldLabel>Campaign</ProfileFieldLabel>
        <EditableLabel
          text={'welend'}
          labelClassName="profile-label"
          inputClassName="profile-input"
          inputMaxLength={50}
          onFocus={_handleFocus}
          onFocusOut={_handleFocusOut}
          className="profile-inline-editing"
        />
      </ProfileFieldWrapper>
      <ProfileFieldWrapper>
        <ProfileFieldLabel>Status</ProfileFieldLabel>
        <EditableLabel
          text={profile.status || ''}
          labelClassName="profile-label"
          inputClassName="profile-input"
          inputMaxLength={50}
          onFocus={_handleFocus}
          onFocusOut={_handleFocusOut}
          className="profile-inline-editing"
        />
      </ProfileFieldWrapper>
      <ProfileFieldWrapper>
        <ProfileFieldLabel>
          Do not call
          <InfoIcon fontSize="small" />
        </ProfileFieldLabel>
        <Switch
          value="checkedD"
          checked={state.donotcall}
          onChange={handleChange('donotcall')}
          value="checkedB"
          color="primary"
          inputProps={{ 'aria-label': 'disabled checkbox' }}
        />
      </ProfileFieldWrapper>
    </ProspectProfileWrapper>
  ) : null;
};

export default ProspectProfile;
