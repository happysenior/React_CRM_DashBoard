import React from 'react';
import './index.scss';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheckAll = this.handleCheckAll.bind(this);
  }

  handleCheckAll(event) {
    const target = event.target;
    const value = target.checked;
    // this.props.selectAllProspects(value);
    this.props.selectAllProspectsInPage(value, this.props.page);
  }

  render() {
    return (
      <div className="p-3">
        <div className="prospect-table p-3">
          <div className="prospect-table-header d-flex flex-row">
            <div className="w-5">
              <input
                name="isGoing"
                type="checkbox"
                className="row-check"
                checked={this.props.checkAll}
                onChange={this.handleCheckAll}
              />
            </div>
            <div className="w-20">Name</div>
            <div className="w-33">Campaign</div>
            <div className="w-14">Status</div>
            <div className="w-14">Created at</div>
            <div className="w-6"></div>
          </div>
          {this.props.prospects
            ? this.props.prospects.map(prospect => {
                const className = `prospect-${prospect.status.toLowerCase()}`;
                let checked = this.props.selectedProspectIds.includes(
                  prospect._id,
                );
                return (
                  <div
                    className="prospect-table-row d-flex flex-row"
                    key={prospect._id}
                    onClick={() => this.props.clickProspect(prospect._id)}
                  >
                    <div
                      className="w-5"
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      <input
                        type="checkbox"
                        className="row-check"
                        checked={checked}
                        onChange={e => {
                          this.props.selectProspect(
                            prospect._id,
                            e.target.checked,
                          );
                        }}
                      />
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
}
