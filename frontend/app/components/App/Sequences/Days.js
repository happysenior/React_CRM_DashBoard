import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

const Days = props => {
  return (
    <div className="col-md-3">
      <div className="card p-4">
        <div>
          <h4 className="mb-4">
            Days
            <span className="pull-right"></span>
          </h4>
          <div className="sequence-add-day" onClick={props.addDay}>
            + Add Day
          </div>
          <div className="days-list">
            {props.days
              ? props.days.map((x, k) => {
                  let cls =
                    k == props.selectedDay
                      ? 'sequence-day sequence-day-selected'
                      : 'sequence-day';
                  return (
                    <div
                      key={`day_list_item_${k}`}
                      className={cls}
                      onClick={() => {
                        props.selectDay(k);
                      }}
                    >
                      {k == props.selectedDay ? (
                        <span
                          className="pull-right pt-3"
                          onClick={() => {
                            props.deleteDay(k);
                          }}
                        >
                          <DeleteIcon />
                        </span>
                      ) : null}
                      <div>
                        Day <span>{x.runDay}</span>
                      </div>
                      <small>
                        <span className="events-count">{x.events.length} </span>
                        events
                      </small>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Days;
