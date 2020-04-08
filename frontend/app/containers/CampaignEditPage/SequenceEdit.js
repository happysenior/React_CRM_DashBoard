import React, { useRef, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { Button, Popover, PopoverBody, ButtonGroup } from 'reactstrap';
import EmailIcon from '@material-ui/icons/Email';
import SmsIcon from '@material-ui/icons/Sms';
import CallIcon from '@material-ui/icons/Call';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import MicIcon from '@material-ui/icons/Mic';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import BackupIcon from '@material-ui/icons/Backup';
import StopIcon from '@material-ui/icons/Stop';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const SequenceEdit = props => {
  const classes = useStyles();

  const addEventRef = useRef();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  useEffect(() => {
    if (addEventRef.current) {
      setReady(true);
    }
  }, [addEventRef.current]);

  return (
    <div className="row pt-3">
      <div className="col-md-6 d-flex">
        <h2 data-sequence="1220" className="sequence sequence-title">
          Three
        </h2>
        <IOSSwitch checked={true} onChange={() => {}} name="checkedB" />
      </div>
      <div className="col-md-6">
        <div className="text-right pt-4">
          <Button outline color="secondary" className="campaign-btn" size="sm">
            <SettingsIcon fontSize="small" />
            <span>Sequence settings</span>
          </Button>
        </div>
      </div>
      <div className="col-md-12 mb-4">
        Sequence Time Zone: <strong>America/New York</strong> - Current time
        <em>Apr 6th 2020, 12:20 pm</em>
      </div>
      <div className="col-md-3">
        <div className="card p-4">
          <div>
            <h4 className="mb-4">
              Days
              <span className="pull-right"></span>
            </h4>
            <div className="sequence-add-day">+ Add Day</div>
            <div className="days-list">
              <div>
                <div>
                  <div
                    data-day="4151"
                    id="day-4151"
                    className="sequence-day sequence-day-4151 sequence-day-selected"
                  >
                    <span className="pull-right pt-3">
                      <DeleteIcon />
                    </span>
                    <div>
                      Day <span className="display-day-4151">1</span>
                    </div>
                    <small>
                      <span className="events-count">3</span> events
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-events p-4">
          <h4 className="mb-4">Events</h4>
          <form
            className="form-inline mb-4 event-settings"
            onSubmit={e => {
              e.preventDefault();
            }}
            onChange={e => {
              e.preventDefault();
            }}
          >
            <label htmlFor="run_on_day" className="mr-4">
              Run on day
            </label>
            <input
              type="text"
              id="run_on_day"
              name="run_on_day"
              className="form-control mb-2 mr-sm-4"
              style={{ width: '55px' }}
              onChange={e => {}}
            />
            <TextField
              id="time"
              label="at"
              type="time"
              defaultValue="07:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </form>
          <div className="add-new-event">
            <div
              data-toggle="popover"
              data-placement="bottom"
              data-html="true"
              data-content="<a href='#' id='email' className='btn btn-light btn-new-event'><i className='icon-email'></i> Email</a>
                    <a href='#' id='sms' className='btn btn-light btn-new-event'><i className='icon-sms'></i> SMS</a>
                    <a href='#' id='voicemail' className='btn btn-light btn-new-event'><i className='icon-phone-call'></i> Voicemail</a>
                    "
              className="sequence-add-day"
              ref={addEventRef}
              data-original-title=""
              title=""
            >
              + Add Event
            </div>

            {ready && (
              <Popover
                placement="bottom"
                isOpen={open}
                target={addEventRef.current}
                toggle={toggle}
              >
                <PopoverBody>
                  <ButtonGroup>
                    <Button size="sm">
                      <EmailIcon fontSize="small" />
                      Email
                    </Button>
                    <Button size="sm">
                      <SmsIcon fontSize="small" />
                      SMS
                    </Button>
                    <Button size="sm">
                      <CallIcon fontSize="small" />
                      Voicemail
                    </Button>
                  </ButtonGroup>
                </PopoverBody>
              </Popover>
            )}
            <div className="events-list">
              <div
                className="sequence-event sequence-event-selected jtk-endpoint-anchor jtk-connected"
                data-event-id="6226"
                id="event-6226"
              >
                <div className="row">
                  <div className="col-sm-1 d-flex align-items-center justify-content-center"></div>
                  <div className="col-sm-7 event-content">
                    <div className="event event-sms">
                      <span className="event-type">sms</span>
                      <br />
                      <small>DAS</small>
                      <br />
                      <small>Delay: 3h 02m</small>
                    </div>
                  </div>
                  <div className="col-sm-2 d-flex align-items-center justify-content-center">
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-5 d-none">
        <div className="missing-events d-none">
          When you create at least one event you will be able to set it up here.
        </div>
        <div className="card card-event-details p-4 jtk-managed jtk-endpoint-anchor jtk-connected">
          <h4>
            <CallIcon /> Voicemail Settings
          </h4>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="event_note">Notes</label>
                <textarea
                  name="event_note"
                  id="event_note"
                  rows="6"
                  className="form-control form-control-lg "
                  placeholder=""
                ></textarea>
              </div>
            </div>
          </div>
          <ul className="nav nav-tabs flex-column flex-sm-row">
            <li className="nav-item flex-sm-fill text-sm-center">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#voicemail-record"
                role="tab"
              >
                <MicIcon /> Record
              </a>
            </li>
            <li className="nav-item flex-sm-fill text-sm-center">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#voicemail-template"
                role="tab"
              >
                <FileCopyIcon /> Use template
              </a>
            </li>
            <li className="nav-item flex-sm-fill text-sm-center">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#voicemail-upload"
                role="tab"
              >
                <BackupIcon /> Upload
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade"
              id="voicemail-record"
              role="tabpanel"
              aria-labelledby="record-tab"
            >
              <h5>Record</h5>
              <p>
                You can record a voicemail message, save and re-use it later in
                any event.
              </p>

              <div className="p-3 text-center" id="recorder">
                <div
                  id="recorder-status"
                  className="mb-3 font-weight-bold text-center"
                >
                  Click the button to record.
                </div>
                <button className="btn-record" id="recordButton">
                  <MicIcon />
                </button>
                <button className="btn-stop-record d-none" id="stopButton">
                  <StopIcon />
                </button>
                <button className="btn-record d-none" id="pauseButton">
                  <MicIcon />
                </button>
                <span id="formats" className="d-none"></span>
              </div>

              <div className="p-3 d-none" id="recorder-list">
                <div className="form-group">
                  <label htmlFor="filename">Event name </label>
                  <input
                    type="text"
                    name="filename"
                    id="filename"
                    className="form-control form-control-lg"
                    placeholder=""
                    style={{ width: '50%' }}
                    onChange={e => {}}
                  />
                </div>
                <div id="recordingsList" className="mb-3"></div>
                <button
                  type="button"
                  id="saveRecord"
                  className="btn btn-primary btn-lg"
                >
                  <i className="icon-double-check"></i> Save Event
                </button>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="voicemail-template"
              role="tabpanel"
              aria-labelledby="template-tab"
            >
              <h5>Use Template</h5>
              <p>Use your previously saved recordings</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="audio_template">Select template</label>
                    <select
                      name="audio_template"
                      id="audio_template"
                      className="form-control form-control"
                    >
                      <option value=""></option>
                      <option value="1847">frist msg Kristina</option>
                      <option value="1851">kristina 2msg</option>
                      <option value="1852">Kristina 5</option>
                    </select>
                  </div>
                </div>
                <div
                  className="col-md-12 mt-2"
                  id="audio-template-preview"
                ></div>
                <div className="col-md-12 mt-2">
                  <button className="btn use-voice-template">
                    <DoneAllIcon /> Save Event
                  </button>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade active show"
              id="voicemail-upload"
              role="tabpanel"
              aria-labelledby="upload-tab"
            >
              <h5>Upload</h5>
              <div
                id="dropzone-voicemail-upload"
                className="dropzone dz-clickable"
              >
                <div className="dz-default dz-message">
                  <span>
                    <div className="text-center">
                      <button className="btn btn-sm upload-recording">
                        <BackupIcon /> Upload Recording
                      </button>
                      <p className="p-3">
                        Select voicemail recording from your computer, or drag
                        and drop it here.
                        <br />
                        <span className="text-muted">
                          only wav/mp3 files allowed
                        </span>
                      </p>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-5">
        <div className="card card-event-details p-4 jtk-managed jtk-endpoint-anchor jtk-connected">
          <h4 className="mb-4">
            <EmailIcon /> Email Settings
          </h4>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="event_note">Notes</label>
              <textarea
                name="event_note"
                id="event_note"
                rows="6"
                className="form-control form-control"
                placeholder=""
                spellCheck="false"
              ></textarea>
            </div>
          </div>
          <div className="col-md-7">
            <div className="form-group">
              <label htmlFor="event_name">Event name </label>
              <input
                type="text"
                name="event_name"
                id="event_name"
                className="form-control form-control"
                placeholder=""
                onChange={e => {}}
                value=""
              />
            </div>
          </div>
          <div className="col-md-12 pb-3">
            <label>Merge tag</label>
            <br />
            <button
              className="btn btn-tag-email"
              data-tag="prospect_first_name"
              data-title="Copied!"
              data-placement="bottom"
            >
              %prospect_first_name%
            </button>
            <button
              className="btn btn-tag-email"
              data-tag="my_name"
              title="Copied!"
              data-title="Copied!"
              data-placement="bottom"
            >
              %my_name%
            </button>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                rows="6"
                className="form-control form-control-lg "
                placeholder=""
                spellCheck="false"
              ></textarea>
              <small className="form-text text-muted">
                <button
                  className="btn btn-outline-primary load-message-library"
                  data-type="sms"
                >
                  Load template
                </button>
              </small>
            </div>
          </div>
          <div className="col-md-5">
            <TextField
              id="time"
              label="Delay (hh: mm)"
              type="time"
              defaultValue="07:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div>
          <div className="col-md-12">
            <label>Image</label>
            <br />
            <div id="dropzone-image-upload" className="dropzone dz-clickable">
              <div className="dz-default dz-message">
                <span>
                  <div className="text-center">
                    <button className="btn btn-primary upload-img">
                      <BackupIcon /> Upload Image
                    </button>
                    <p className="p-3">
                      Select image from your computer, or drag and drop it here.
                      <br />
                      <span className="text-muted">
                        only jpeg and png files allowed
                      </span>
                    </p>
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-12 pt-2">
            <button class="btn btn-primary btn-save-sms">
              <DoneAllIcon /> Save Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SequenceEdit;
