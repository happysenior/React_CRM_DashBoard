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

  const selectedCnt = checkAll
    ? totalProspects - selectedIdsCnt
    : selectedIdsCnt;
  return selectedCnt > 0 ? (
    <div className="prospect-status">
      <div>
        <div className="mr-5">
          <span className="pr-1">{selectedCnt}</span>
          prospects are selected.
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
  ) : null;
}
