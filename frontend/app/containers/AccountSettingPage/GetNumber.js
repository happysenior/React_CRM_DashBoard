import React, { Fragment } from 'react';
import './index.scss';

import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import request from 'utils/request';

const auth = new AuthService();
const api = new ApiEndpoint();

const message = [
  'This field is required.',
  'Verifying phone number availability',
  'There are no phone numbers with this area code',
  'Great! We found numbers in this area code',
];

export default class GetNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaCode: '',
      stage: 0,
      apiCallConunt: 0,
    };
  }

  cancel = () => {
    this.props.history.goBack();
  };

  handleChange = async event => {
    let stage = 1;
    if (event.target.value == '') stage = 0;
    this.setState({ areaCode: event.target.value, stage });
    if (stage == 0) return;
    const url = api.getNumberAvailabilityPath();
    const token = auth.getToken();

    try {
      this.setState(prevState => {
        return {
          ...prevState,
          apiCallConunt: prevState.apiCallConunt + 1,
        };
      });

      const res = await request(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          areaCode: event.target.value,
        }),
      });
      if (this.state.apiCallConunt == 1) {
        if (res.count > 0) {
          this.setState({ stage: 3 });
        } else this.setState({ stage: 2 });
      }
      this.setState(prevState => {
        return {
          ...prevState,
          apiCallConunt: prevState.apiCallConunt - 1,
        };
      });
    } catch (err) {}
  };

  getNewNumber = async () => {
    if (this.state.areaCode == '' || this.state.stage != 3) return;
    const url = api.getNewNumberPath();
    const token = auth.getToken();

    try {
      const res = await request(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          areaCode: this.state.areaCode,
        }),
      });
      this.props.history.goBack();
    } catch (err) {}
  };

  render() {
    const inputCls = `area-code-input stage-${this.state.stage}`;

    return (
      <div className="get-number-panel">
        <div>
          <h5 className="text-center">Setup a phone number</h5>
          <div className="number-explain">
            This is the number the system will use to send out text messages to
            your leads. Call to this number will be forwarded to your account's
            phone number.
          </div>
        </div>
        <div>
          <div className="w-75">
            <label>
              <span className="area-code-label">Area code</span>
              <span className="area-code-explain">
                The area code you'd like a number from
              </span>
            </label>
            <div>
              <input
                maxLength="120"
                name="areaCode"
                className={inputCls}
                value={this.state.areaCode}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-explain">{message[this.state.stage]}</div>
          </div>
        </div>
        <div>
          <div className="m-5 text-center">
            <button className="getnumber-button" onClick={this.getNewNumber}>
              GET NUMBER
            </button>
          </div>
        </div>
      </div>
    );
  }
}
