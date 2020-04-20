import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { Popover, PopoverBody } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';
import EmailIcon from '@material-ui/icons/Email';
import SmsIcon from '@material-ui/icons/Sms';
import CallIcon from '@material-ui/icons/Call';

import './index.scss';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Events = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return (
    <div className="col-md-4">
      <div className="card card-events p-4">
        <h4 className="mb-4">Events</h4>
        {props.sequence.days.length > 0 && props.selectedDay == null ? (
          <div className="missing-days">Select day to manage events</div>
        ) : null}
        {props.sequence.days.length == 0 ? (
          <div className="missing-days">
            Add at least one day to manage events.
          </div>
        ) : null}
        {props.sequence.days.length > 0 && props.selectedDay != null ? (
          <React.Fragment>
            {props.selectedDay > 0 ? (
              <form
                className="form-inline mb-4 event-settings"
                onSubmit={e => {
                  e.preventDefault();
                }}
              >
                <label htmlFor="run_on_day" className="mr-4">
                  Run on day
                </label>
                <input
                  type="number"
                  id="run_on_day"
                  name="run_on_day"
                  className="form-control mb-2 mr-sm-4"
                  style={{ width: '55px' }}
                  min={1}
                  value={props.sequence.days[props.selectedDay].runDay}
                  onChange={e => {
                    props.changeRunDay(props.selectedDay, e.target.value);
                  }}
                />
                <TextField
                  id="time"
                  label="at"
                  type="time"
                  defaultValue={props.sequence.days[props.selectedDay].runTime}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={e => {
                    props.changeRunTime(props.selectedDay, e.target.value);
                  }}
                />
              </form>
            ) : null}
            <div className="add-new-event">
              <div
                id="popover"
                className="sequence-add-day"
                onClick={() => {
                  setOpen(open => !open);
                }}
              >
                + Add Event
              </div>

              <Popover
                placement="bottom"
                isOpen={open}
                target="popover"
                toggle={toggle}
              >
                <PopoverBody>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      onClick={() => {
                        // props.addEvent(props.selectedDay, 'email');
                        // toggle();
                      }}
                    >
                      <EmailIcon fontSize="small" />
                      Email
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        props.addEvent(props.selectedDay, 'sms');
                        toggle();
                      }}
                    >
                      <SmsIcon fontSize="small" />
                      SMS
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        props.addEvent(props.selectedDay, 'voicemail');
                        toggle();
                      }}
                    >
                      <CallIcon fontSize="small" />
                      Voicemail
                    </Button>
                  </ButtonGroup>
                </PopoverBody>
              </Popover>
              <div className="events-list">
                {props.sequence.days[props.selectedDay].events
                  ? props.sequence.days[props.selectedDay].events.map(
                      (x, k) => {
                        const cls =
                          k == props.selectedEvent
                            ? 'sequence-event  sequence-event-selected'
                            : 'sequence-event';
                        return (
                          <div
                            key={`event_list_item_${k}`}
                            className={cls}
                            onClick={() => {
                              props.selectEvent(k);
                            }}
                          >
                            <div className="row">
                              <div className="col-sm-1 d-flex align-items-center justify-content-center"></div>
                              <div className="col-sm-7 event-content">
                                <div className="event event-sms">
                                  <span className="event-type">{x.type}</span>
                                  <br />
                                  <small>{x.name}</small>
                                  <br />
                                  <small>Delay: {x.delay}mm</small>
                                </div>
                              </div>
                              {k == props.selectedEvent ? (
                                <div
                                  className="col-sm-2 d-flex align-items-center justify-content-center"
                                  onClick={event => {
                                    event.stopPropagation();
                                    props.deleteEvent(
                                      props.selectedDay,
                                      props.selectedEvent,
                                    );
                                  }}
                                >
                                  <DeleteIcon />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      },
                    )
                  : null}
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default Events;
