import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Container,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

import './index.scss';
import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import request from 'utils/request';

const auth = new AuthService();
const token = auth.getToken();
const api = new ApiEndpoint();

const headers = [
  { title: 'Name', width: '20%' },
  { title: 'Prospects', width: '10%' },
  { title: 'Sequences', width: '10%' },
  { title: 'Messages', width: '10%' },
  { title: 'Created at', width: '15%' },
  { title: 'Updated at', width: '15%' },
  { title: '', width: '20%' },
];

const CampaignList = props => {
  const [state, setState] = useState({
    isOpen: [],
  });

  const [campaigns, setCampaigns] = useState([]);

  const toggle = index => {
    setState(prevState => {
      let isOpen = prevState.isOpen.map((x, k) => {
        if (k == index) return !x;
        return x;
      });
      return {
        ...prevState,
        isOpen,
      };
    });
  };

  const loadCampaigns = async () => {
    const url = api.getCampaignsAggregationPath();
    try {
      const res = await request(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setCampaigns(res.campaigns);
    } catch (err) {}
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  const deleteCampaign = async campaignId => {
    const url = api.getDeleteCampaignPath(campaignId);
    try {
      const res = await request(url, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      loadCampaigns();
    } catch (err) {}
  }

  return (
    <Container>
      <div>
        <div className="d-flex justify-content-end pt-5">
          <Link to="/campaigns/create">
            <button type="button" className="btn btn-outline-secondary">
              Create campaign
            </button>
          </Link>
        </div>
        <div className="mt-3 d-flex flex-column">
          <div className="campaign-header">
            <div className="d-flex flex-row">
              {headers.map((x, k) => (
                <div
                  key={`list_header_${k}`}
                  className="campaign-column"
                  style={{ width: x.width }}
                >
                  {x.title}
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column">
            {campaigns.map((x, k) => {
              return (
                <div key={`campaign_${k}`} className="campaign">
                  <div
                    className="campaign-column font-weight-bold"
                    style={{ width: headers[0].width }}
                  >
                    {campaigns[k].name}
                  </div>
                  <div
                    className="campaign-column"
                    style={{ width: headers[1].width }}
                  >
                    <span className="badge badge-lg badge-tag-1">
                      {campaigns[k].prospects}
                    </span>
                  </div>
                  <div
                    className="campaign-column"
                    style={{ width: headers[2].width }}
                  >
                    <span className="badge badge-lg badge-tag-2">
                      {campaigns[k].sequences ? 1 : 0}
                    </span>
                  </div>
                  <div
                    className="campaign-column"
                    style={{ width: headers[3].width }}
                  >
                    <span className="badge badge-lg badge-tag-6">
                      {campaigns[k].messages}
                    </span>
                  </div>
                  <div
                    className="campaign-column date"
                    style={{ width: headers[4].width }}
                  >
                    {campaigns[k].createdAt.substring(0, 10)}
                  </div>
                  <div
                    className="campaign-column date"
                    style={{ width: headers[5].width }}
                  >
                    {campaigns[k].updatedAt
                      ? campaigns[k].updatedAt.substring(0, 10)
                      : ''}
                  </div>
                  <div
                    className="campaign-column d-flex"
                    style={{ width: headers[6].width }}
                  >
                    <div>
                      <Link
                        to={`/campaigns/edit/${x._id}`}
                        className="btn btn-outline-danger"
                      >
                        View Details
                      </Link>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          deleteCampaign(x._id);
                        }}
                        style={{ verticalAlign: 'middle' }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                    {/* <Dropdown isOpen={state.isOpen[k]} toggle={() => toggle(k)}>
                      <DropdownToggle className="toggle-more">
                        ...
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Duplicate</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CampaignList;
