import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Sequence from './SequenceSetting';
import { Button } from 'reactstrap';
import classNames from 'classnames';
import './index.scss';

const CampaignEdit = props => {
  let campaignCardStyle = { height: props.sequence ? '230px' : '175px' };

  return (
    <main className="main">
      <div className="container">
        <div id="ui-view">
          <div className="animated fadeIn">
            <div className="row d-flex align-content-center">
              <div className="col-sm-12 order-first order-sm-last">
                <h2>test</h2>
              </div>
              <div className="col-sm-12">
                <div className="text-right order-last order-sm-first">
                  <Button
                    outline
                    color="secondary"
                    className="campaign-btn"
                    size="sm"
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
                    <button data-period="daily" className="btn change-period">
                      Today
                    </button>
                    <button data-period="weekly" className="btn change-period">
                      This week
                    </button>
                    <button data-period="monthly" className="btn change-period">
                      Last month
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  <div className="card campaign-card" style={campaignCardStyle}>
                    <div className="card-body">
                      <h5 className="card-title text-muted">All prospects</h5>

                      <div className="big-number">0</div>
                      <div className="small-number text-danger">0 (0%)</div>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card campaign-card" style={campaignCardStyle}>
                    <div className="card-body">
                      <h5 className="card-title text-muted">Messages</h5>

                      <div className="big-number">0</div>
                      <div className="small-number text-danger">0 (0%)</div>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card campaign-card" style={campaignCardStyle}>
                    <div className="card-body">
                      <h5 className="card-title text-muted">Responded</h5>

                      <div className="big-number">0</div>
                      <div className="small-number text-danger">0 (0%)</div>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card campaign-card" style={campaignCardStyle}>
                    <div className="card-body">
                      <h5 className="card-title text-muted">Response rate</h5>

                      <div className="big-number">
                        <span>0</span> <span>%</span>
                      </div>
                      <div className="small-number text-success">0 (0%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Sequence sequence={null} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CampaignEdit;
