import React, { Fragment } from 'react';
import './index.scss';

const SequenceSetting = props => {
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
                    action="https://app.getbonzo.com/sequence/1220/settings"
                    method="post"
                  >
                    <input
                      type="hidden"
                      name="_token"
                      value="LJ3wNKx7dSlh0AeMoaOl8k3xXoxzBOxbIFkB3Pxj"
                    />
                    <div className="form-group">
                      <label htmlFor="name">Sequence name </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder=""
                        value="Three"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reply_to_email">
                        Send email replies to
                      </label>
                      <input
                        type="text"
                        name="reply_to_email"
                        id="reply_to_email"
                        placeholder=""
                        value="test@mail.com"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reply_to_phone">
                        Send notifications and call-backs to
                      </label>
                      <input
                        type="text"
                        name="reply_to_phone"
                        id="reply_to_phone"
                        placeholder=""
                        value="test@mail.com"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-group">
                      <label for="campaign_my_name">
                        Name used in sequence
                      </label>
                      <input
                        type="text"
                        name="campaign_my_name"
                        id="campaign_my_name"
                        placeholder=""
                        value="adrian"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-group">
                      Forward text responses
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          name="forward_sms"
                          id="forward1"
                          value=""
                          checked="checked"
                          className="form-check-input"
                        />
                        <label for="forward1" className="form-check-label">
                          No
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          name="forward_sms"
                          id="forward2"
                          value="true"
                          className="form-check-input"
                        />
                        <label htmlFor="forward2" className="form-check-label">
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <h5>Stop sequence when prospect respond</h5>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          name="stop_on_response"
                          id="stoponresponse1"
                          value="0"
                          className="form-check-input"
                        />
                        <label
                          htmlFor="stoponresponse1"
                          className="form-check-label"
                        >
                          No
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          name="stop_on_response"
                          id="stoponresponse2"
                          value="1"
                          checked="checked"
                          className="form-check-input"
                        />
                        <label
                          htmlFor="stoponresponse2"
                          className="form-check-label"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-12 py-2">
                        <h5>Cutoff</h5>
                        Set cut-off times of when communication will be sent.
                        <br />
                        Time in <strong>America/New York</strong> timezone.
                        Current time: Apr 6th 2020, 8:49 am
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="cutoff_start">Start </label>
                          <input
                            type="text"
                            name="cutoff_start"
                            id="cutoff_start"
                            placeholder=""
                            value="09:00:00"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="cutoff_stop">Stop </label>
                          <input
                            type="text"
                            name="cutoff_stop"
                            id="cutoff_stop"
                            placeholder=""
                            value="18:00:00"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 my-4">
                      <div className="form-group">
                        <label htmlFor="weekend" className="form-check-label">
                          <input
                            type="checkbox"
                            id="weekend"
                            name="weekend"
                            value="send_on_weekend"
                            className="form-check-input "
                          />
                          Send messages on weekend?
                        </label>
                      </div>
                    </div>
                    <div className="form-group text-right">
                      <button className="btn create-sequence">Save</button>
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
};

export default SequenceSetting;
