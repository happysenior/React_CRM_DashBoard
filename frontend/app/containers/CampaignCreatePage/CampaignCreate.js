import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.scss';

import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';

const CampaignCreate = props => {
  const [campaign, setCampaign] = useState(campaign);

  let history = useHistory();

  const auth = new AuthService();
  const token = auth.getToken();
  const api = new ApiEndpoint();

  const createCampaign = async () => {
    if (state.campaign == '') return;
    const url = api.getCampaignCreatePath();
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      history.push(`/campaign/edit/${res.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="main">
      <div className="container-fluid">
        <div id="ui-view">
          <div className="animated fadeIn">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 bg-white py-4">
                  <h2>Create new campaign</h2>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="name">Campaign name </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder=""
                        value={state.campaign}
                        className="form-control form-control"
                        onChange={e => {
                          setCampaign(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group text-right">
                      <button
                        className="btn btn-new-campaign"
                        onClick={createCampaign}
                      >
                        Save
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
};

export default CampaignCreate;
