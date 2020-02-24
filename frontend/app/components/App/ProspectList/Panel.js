import React from 'react';
import { PRIMARY_LIGHT, PRIMARY_DARK } from 'utils/colors';
import { Input, Button } from 'reactstrap';
import './index.scss';

export default function Panel(props) {
  return (
    <div className="p-3">
      <div className="prospect-table p-3">
        <div className="prospect-table-header d-flex flex-row">
          <div className="w-5">
            <Input type="checkbox" className="row-check" />
          </div>
          <div className="w-20">Name</div>
          <div className="w-33">Campaign</div>
          <div className="w-14">Status</div>
          <div className="w-14">Created at</div>
          <div className="w-6"></div>
        </div>
        {props.prospects
          ? props.prospects.map(prospect => {
              const className = `prospect-${prospect.status.toLowerCase()}`;
              return (
                <div
                  className="prospect-table-row d-flex flex-row"
                  key={prospect._id}
                  onClick={() => props.clickProspect(prospect._id)}
                >
                  <div className="w-5">
                    <Input type="checkbox" className="row-check" />
                  </div>
                  <div className="w-20">{`${prospect.firstName} ${prospect.lastName}`}</div>
                  <div className="w-33">LABROKER2</div>
                  <div className="w-14">
                    <span className={className}>{prospect.status}</span>
                  </div>
                  <div className="w-14">1 day ago</div>
                  <div className="w-6"></div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
