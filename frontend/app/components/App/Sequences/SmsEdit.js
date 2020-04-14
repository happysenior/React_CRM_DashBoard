import React, { useCallback, useState, useRef, Fragment } from 'react';
import SmsIcon from '@material-ui/icons/Sms';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const preservedWords = [
  '{{prospectFirstName}}',
  '{{campaign}}',
  '{{myName}}',
  '{{campaignPhone}}',
];

const SmsEdit = props => {
  const classes = useStyles();

  const concatWord = index => {
    props.updateEventProperty(
      'content',
      `${props.event.content}${preservedWords[index]}`,
    );
  };

  const [imageFile, setImage] = useState(null);
  const [uploading, setUploading] = useState(true);
  const imageRef = useRef(null);
  const uploadedImageRef = useRef(null);

  const cancelFileSelect = e => {
    setImage(null);
    props.updateEventProperty('attach', '');
  };

  const onDrop = useCallback(acceptedFiles => {
    const selectedFile = acceptedFiles[0];
    const fileName = selectedFile.name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (
      !extension ||
      (extension != 'jpg' && extension != 'jpeg' && extension != 'png')
    ) {
      return;
    }
    imageRef.current.src = URL.createObjectURL(selectedFile);
    setUploading(true);
    setImage(selectedFile);

    props.setEventImage(selectedFile).then(res => {
      setUploading(false);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  let imageCls = 'image-wrapper ';
  let uploadedImageCls = 'image-wrapper ';
  if (
    imageFile ||
    props.event.attach == undefined ||
    props.event.attach == '' ||
    props.event.attach == null
  ) {
    uploadedImageCls = uploadedImageCls + 'd-none';
  }
  if (!imageFile) {
    imageCls = imageCls + 'd-none';
  }

  return (
    <div className="card card-event-details p-4 jtk-managed jtk-endpoint-anchor jtk-connected">
      <h4 className="mb-4">
        <SmsIcon />
        SMS Settings
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
              spellCheck={false}
              value={props.event.notes}
              onChange={e => {
                props.updateEventProperty('notes', e.target.value);
              }}
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
              className="form-control form-control-lg"
              placeholder=""
              value={props.event.name}
              onChange={e => {
                props.updateEventProperty('name', e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-md-12 pb-3">
          <label>Merge tag</label>
          <br />
          <button
            className="btn btn-tag"
            onClick={() => {
              concatWord(0);
            }}
          >
            {preservedWords[0]}
          </button>
          <button
            className="btn btn-tag"
            onClick={() => {
              concatWord(1);
            }}
          >
            {preservedWords[1]}
          </button>
          <button
            className="btn btn-tag"
            onClick={() => {
              concatWord(2);
            }}
          >
            {preservedWords[2]}
          </button>
          <button
            className="btn btn-tag"
            onClick={() => {
              concatWord(3);
            }}
          >
            {preservedWords[3]}
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
              spellCheck={false}
              value={props.event.content}
              onChange={e =>
                props.updateEventProperty('content', e.target.value)
              }
            ></textarea>
            <small className="form-text text-muted">
              <button
                className="btn upload-recording"
                data-type="sms"
                onClick={() => {
                  props.toggleTemplateModal();
                }}
              >
                Load template
              </button>
            </small>
          </div>
        </div>
        <div className="col-md-5">
          <div className="delay-picker">
            <div className="form-group">
              <label htmlFor="delay">Delay (hh:mm) </label>
              <input
                type="text"
                name="delay"
                format="yy:mm"
                id="delay"
                className="form-control form-control-lg"
                placeholder=""
                value={props.event.delay}
                onChange={e => {
                  props.updateEventProperty('delay', e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <label>Image</label>
          <br />
          <div className={uploadedImageCls}>
            <img
              ref={uploadedImageRef}
              className="img-thumbnail preview-image"
              src={props.event.attach}
              style={{ width: '40%', height: 'auto' }}
            />
            <DeleteIcon
              className="image-clear"
              onClick={() => cancelFileSelect('attach', '')}
            />
          </div>
          <div className={imageCls}>
            <img
              ref={imageRef}
              className="img-thumbnail preview-image"
              style={{ width: '40%', height: 'auto' }}
            />
            <DeleteIcon className="image-clear" onClick={cancelFileSelect} />
          </div>
          <div className="drag-drop-area" {...getRootProps()}>
            <input
              {...getInputProps()}
              type="file"
              // accept="image/png, image/jpeg, image/jpg"
            />
            {!imageFile ? (
              <Fragment>
                <CloudUploadIcon fontSize="large"></CloudUploadIcon>
                <br />
                <div className="help-text">
                  Drag and drop or choose a file to upload image.
                </div>
                <div className="help-text">
                  Acceptable file types: jpg, jpeg, png
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {!uploading ? (
                  <ClearIcon
                    className="file-select-cancel"
                    onClick={cancelFileSelect}
                  />
                ) : null}
                {uploading ? (
                  <div className={classes.root}>
                    <LinearProgress />
                  </div>
                ) : null}
                <div>{imageFile.name}</div>
              </Fragment>
            )}
          </div>
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
    </div>
  );
};

export default SmsEdit;
