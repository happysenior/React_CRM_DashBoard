import React, { useState, useCallback, Fragment } from 'react';
import CallIcon from '@material-ui/icons/Call';
import StopIcon from '@material-ui/icons/Stop';
import MicIcon from '@material-ui/icons/Mic';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import BackupIcon from '@material-ui/icons/Backup';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import ClearIcon from '@material-ui/icons/Clear';

import './index.scss';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const VoicemailEdit = props => {
  let audioTitle = '';
  if (props.event.attach) {
    audioTitle = audioTitle.substring(audioTitle.indexOf(audioTitle) + 1);
  }

  const classes = useStyles();
  const [audioFile, setAudioFile] = useState(null);
  const [tab, setTab] = useState('upload');
  const [uploading, setUploading] = useState(false);

  const cancelFileSelect = e => {
    setAudioFile(null);
    props.updateEventProperty('attach', '');
  };

  const onDrop = useCallback(acceptedFiles => {
    const selectedFile = acceptedFiles[0];
    const fileName = selectedFile.name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (!extension || (extension != 'wav' && extension != 'mp3')) {
      return;
    }
    setUploading(true);
    setAudioFile(selectedFile);
    props.setEventImage(selectedFile).then(res => {
      setUploading(false);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  let recordCls = 'nav-link ';
  let templateCls = 'nav-link ';
  let uploadCls = 'nav-link ';
  if (tab == 'upload') uploadCls += 'active';
  if (tab == 'record') recordCls += 'active';
  if (tab == 'template') templateCls += 'active';
  return (
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
              value={props.event.notes}
              onChange={e => {
                props.updateEventProperty('notes', e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="col-md-7">
        <div className="form-group">
          <label htmlFor="event_name">Event name </label>
          <input
            type="text"
            name="event_name"
            id="event_name"
            className="form-control form-control-lg"
            placeholder=""
            value={props.event.name}
            onChange={e => {
              props.updateEventProperty('name', e.target.value);
            }}
          />
        </div>
      </div>
      {props.event.attach != '' && props.event.attach != undefined ? (
        <div className="preview-voice-event my-4">
          <audio
            className="audio-preview"
            controls="controls"
            src={props.event.attach}
          ></audio>
          <div className="text-center">
            <span className="audio-title">{audioTitle}</span>
          </div>
          <div className="delay-picker">
            <div className="form-group">
              <label htmlFor="delay">Delay (hh:mm) </label>
              <input
                type="text"
                name="delay"
                id="delay"
                className="form-control form-control-lg"
                placeholder="00:00"
                value={props.event.delay}
                onChange={e => {
                  props.updateEventProperty('delay', e.target.value);
                }}
                style={{ width: '33%' }}
              />
            </div>
          </div>
          <button
            className="btn upload-recording"
            onClick={() => {
              setAudioFile(null);
              props.updateEventProperty('attach', '');
            }}
          >
            <DeleteIcon /> Delete recording
          </button>
        </div>
      ) : null}
      <ul className="nav nav-tabs flex-column flex-sm-row">
        <li className="nav-item flex-sm-fill text-sm-center invisible">
          <a
            className={recordCls}
            data-toggle="tab"
            href="#voicemail-record"
            role="tab"
            onClick={() => {
              setTab('record');
            }}
          >
            <MicIcon /> Record
          </a>
        </li>
        <li className="nav-item flex-sm-fill text-sm-center">
          <a
            className={templateCls}
            data-toggle="tab"
            href="#voicemail-template"
            role="tab"
            onClick={() => {
              setTab('template');
            }}
          >
            <FileCopyIcon /> Use template
          </a>
        </li>
        <li className="nav-item flex-sm-fill text-sm-center">
          <a
            className={uploadCls}
            data-toggle="tab"
            href="#voicemail-upload"
            role="tab"
            onClick={() => {
              setTab('upload');
            }}
          >
            <BackupIcon /> Upload
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {tab == 'record' ? (
          <div
            className="tab-pane fade active show"
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
            </div>
          </div>
        ) : null}

        {tab == 'template' ? (
          <div
            className="tab-pane fade show active"
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
              <div className="col-md-12 mt-2" id="audio-template-preview"></div>
            </div>
          </div>
        ) : null}
        {tab == 'upload' ? (
          <div
            className="tab-pane fade active show"
            id="voicemail-upload"
            role="tabpanel"
            aria-labelledby="upload-tab"
          >
            <h5>Upload</h5>
            <div className="drag-drop-area" {...getRootProps()}>
              <input
                {...getInputProps()}
                type="file"
                // accept="image/png, image/jpeg, image/jpg"
              />
              {!audioFile ? (
                <Fragment>
                  <div className="text-center">
                    <BackupIcon /> Upload Recording
                    <p className="p-3">
                      Select voicemail recording from your computer, or drag and
                      drop it here.
                      <br />
                      <span className="text-muted">
                        only wav/mp3 files allowed
                      </span>
                    </p>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  {!uploading ? (
                    <ClearIcon
                      className="file-select-cancel"
                      onClick={() => {
                        setAudioFile(null);
                        props.updateEventProperty('attach', '');
                      }}
                    />
                  ) : null}
                  {uploading ? (
                    <div className={classes.root}>
                      <LinearProgress />
                    </div>
                  ) : null}
                  <div>{audioFile.name}</div>
                </Fragment>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="col-md-12 pt-2">
        <button
          className="btn upload-recording"
          onClick={() => {
            props.saveSequence();
          }}
        >
          <DoneAllIcon /> Save Event
        </button>
        <button
          className="btn upload-recording ml-3"
          onClick={() => {
            props.loadCampaign();
          }}
        >
          <DoneAllIcon /> Clear Change
        </button>
      </div>
    </div>
  );
};

export default VoicemailEdit;
