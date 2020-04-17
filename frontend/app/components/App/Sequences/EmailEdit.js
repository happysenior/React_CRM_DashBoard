import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import BackupIcon from '@material-ui/icons/Backup';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const EmailEdit = props => {
  return (
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
      <div className="col-md-12 pt-2">
        <button className="btn btn-primary btn-save-sms">
          <DoneAllIcon /> Save Event
        </button>
      </div>
    </div>
  );
};

export default EmailEdit;
