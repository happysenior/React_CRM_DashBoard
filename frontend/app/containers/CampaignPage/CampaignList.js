import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

import './index.scss';

const headers = [
  { title: 'Name', width: '20%' },
  { title: 'Prospects', width: '10%' },
  { title: 'Sequences', width: '10%' },
  { title: 'Messages', width: '10%' },
  { title: 'Created at', width: '15%' },
  { title: 'Updated at', width: '15%' },
  { title: '', width: '20%' },
];

const campaigns = [
  {
    name: 'test',
    prospects: 202,
    sequences: 5,
    messages: 4,
    createdAt: 'Mar 26th 2020, 4:37 pm',
    updatedAt: 'Mar 26th 2020, 4:37 pm',
  },
  {
    name: 'stress',
    prospects: 22,
    sequences: 5,
    messages: 4,
    createdAt: 'Mar 26th 2020, 4:37 pm',
    updatedAt: 'Mar 26th 2020, 4:37 pm',
  },
];

const CampaignList = props => {
  const [state, setState] = useState({
    isOpen: [],
  });

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
                      {campaigns[k].sequences}
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
                    {campaigns[k].createdAt}
                  </div>
                  <div
                    className="campaign-column date"
                    style={{ width: headers[5].width }}
                  >
                    {campaigns[k].updatedAt}
                  </div>
                  <div
                    className="campaign-column d-flex"
                    style={{ width: headers[6].width }}
                  >
                    <div>
                      <button type="button" className="btn btn-outline-danger">
                        View Details
                      </button>
                    </div>
                    <Dropdown isOpen={state.isOpen[k]} toggle={() => toggle(k)}>
                      <DropdownToggle className="toggle-more">
                        ...
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Duplicate</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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
