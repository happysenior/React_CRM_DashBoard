import React from 'react';

export default function Status(props) {
  const {
    selectedIdsCnt,
    totalProspects,
    selectAllProspects,
    page,
    checkedPages,
    checkAll,
  } = props;
  return (
    <div className="prospect-status">
      <div>
        <div className="mr-5">
          <span className="pr-1">
            {checkAll ? `${totalProspects}` : `${selectedIdsCnt}`}
          </span>
          prospects on this page are selected.
        </div>
        <div
          className="select-all-prospects"
          onClick={() => {
            props.selectAllProspects(!checkAll);
          }}
        >
          {!checkAll
            ? `Select all ${totalProspects} prospects`
            : `clear selection`}
        </div>
      </div>
    </div>
  );
}
