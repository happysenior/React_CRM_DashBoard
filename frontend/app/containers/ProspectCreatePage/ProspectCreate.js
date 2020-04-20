import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import { Button } from 'reactstrap';
import './index.scss';
import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import request from 'utils/request';

const Explanation = styled.span`
  color: rgb(153, 153, 153);
  font-size: 1rem;
  font-stretch: normal;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-height: 1.5rem;
  display: block;
`;

const ProspectCreate = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  let history = useHistory();

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    campaign: null,
    autoSequence: true,
    address: '',
  });

  const auth = new AuthService();
  const token = auth.getToken();
  const api = new ApiEndpoint();

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

  const emailValidate = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validCheck = () => {
    let errors = {};

    const validEmail = emailValidate(state.email);

    !validEmail && (errors = { ...errors, emailError: `Email is incorrect` });

    state.phone == '' &&
      (errors = { ...errors, phoneError: `This field can not be empty` });
    state.firstName == '' &&
      (errors = { ...errors, firstNameError: `This field can not be empty` });

    const valid = validEmail && state.phone != '' && state.firstName != '';

    setState(prevState => {
      return { ...prevState, ...errors };
    });
    return valid;
  };

  const submitProspect = async () => {
    if (validCheck()) {
      const url = api.getCreateProspectPath();

      try {
        const res = await request(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: state.firstName,
            lastName: state.lastName,
            phone: state.phone,
            email: state.email,
            campaign: state.campaign,
            autoSequence: state.autoSequence,
            address: state.address,
          }),
        });
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  const cancel = () => {
    history.goBack();
  };

  const changeState = (key, value) => {
    setState(prevState => {
      return { ...prevState, [key]: value };
    });
  };

  return (
    <div className="prospect-create">
      <h4>Create Prospect</h4>
      <div className="form-group">
        <label>First name</label>
        <input
          type="text"
          placeholder="John"
          className="form-control"
          onChange={e => {
            changeState('firstName', e.target.value);
          }}
        />
        {state.firstNameError ? (
          <div className="alert alert-danger" role="alert">
            {state.firstNameError}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Doe"
          onChange={e => {
            changeState('lastName', e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="www@example.com"
          onChange={e => {
            changeState('email', e.target.value);
          }}
        />
        {state.emailError ? (
          <div className="alert alert-danger" role="alert">
            {state.emailError}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label>Phone number</label>
        <input
          type="text"
          className="form-control"
          placeholder="+18234134344"
          onChange={e => {
            changeState('phone', e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          onChange={e => {
            changeState('address', e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Select Campaign</label>
        <Select
          options={options}
          isLoading={isLoading}
          onSelect={option => changeState('campaign', option.value)}
        />
      </div>
      <div className="form-group">
        <label>Schedule automatic sequence</label>
        <div className="d-flex flex-row">
          <Explanation>
            Turn on if you'd like prospect to enter the campaign's automated
            sequence
          </Explanation>
          <Switch
            checked={state.autoSequence}
            onChange={event => {
              event.persist();
              changeState('autoSequence', event.target.checked);
            }}
            name="autoSequence"
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>
      </div>
      <div className="form-group d-flex flex-row justify-content-end">
        <Button className="create-button" onClick={submitProspect}>
          Create
        </Button>
        <Button className="create-button ml-2" onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProspectCreate;
