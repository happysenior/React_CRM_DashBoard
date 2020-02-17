import React from 'react';
import { PRIMARY_LIGHT, PRIMARY_DARK } from 'utils/colors';
import { Input, Button } from 'reactstrap';
import './index.scss';

export default function Panel() {
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
        <div className="prospect-table-row d-flex flex-row">
          <div className="w-5">
            <Input type="checkbox" className="row-check" />
          </div>
          <div className="w-20">Byron Stephens</div>
          <div className="w-33">LABROKER2</div>
          <div className="w-14">
            <span className="prospect-cancel">CANCEL</span>
          </div>
          <div className="w-14">10 days ago</div>
          <div className="w-6"></div>
        </div>
        <div className="prospect-table-row d-flex flex-row prospect-table-row-selected">
          <div className="w-5">
            <Input type="checkbox" className="row-check" />
          </div>
          <div className="w-20">Byron Stephens</div>
          <div className="w-33">LABROKER2</div>
          <div className="w-14">
            <span className="prospect-new">NEW</span>
          </div>
          <div className="w-14">10 days ago</div>
          <div className="w-6"></div>
        </div>
        <div className="prospect-table-row d-flex flex-row">
          <div className="w-5">
            <Input type="checkbox" className="row-check" />
          </div>
          <div className="w-20">Byron Stephens</div>
          <div className="w-33">LABROKER2</div>
          <div className="w-14">
            <span className="prospect-pending">pending</span>
          </div>
          <div className="w-14">10 days ago</div>
          <div className="w-6"></div>
        </div>
      </div>
    </div>
  );
}
