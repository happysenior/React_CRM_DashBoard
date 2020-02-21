import React, { Fragment, useCallback, useState } from 'react';
import { PRIMARY_BLUE_DARK } from 'utils/colors';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonIcon from '@material-ui/icons/Person';
import ClearIcon from '@material-ui/icons/Clear';
import { useDropzone } from 'react-dropzone';
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  Input,
  FormGroup,
  Form,
  Label,
} from 'reactstrap';
import './index.scss';

const styles = {
  controlButton: {
    background: `${PRIMARY_BLUE_DARK}`,
  },
};

const SelectCSV = props => {
  const [csvFile, setCsvFile] = useState(null);
  const [step, setStep] = useState(0);

  const onDrop = useCallback(acceptedFiles => {
    const selectedFile = acceptedFiles[0];
    const fileName = selectedFile.name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (!extension || extension !== 'csv') {
      return;
    }
    props.setCsvFile(selectedFile);
    setCsvFile(selectedFile);
    setStep(prevState => prevState + 1);
  }, []);

  const cancelFileSelect = e => {
    setCsvFile(null);
    setStep(prevState => prevState - 1);
    e.stopPropagation();
  };

  const clickTerm = e => {
    const checked = e.target.checked;
    if (checked) setStep(prevState => prevState + 1);
    else setStep(prevState => prevState - 1);
    return true;
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Card className="border-0">
      <CardHeader className="primary-background border-0">
        <div className="font-weight-bold form-title">Import from CSV file</div>
        <div className="help-text">
          Before you upload your file below, make sure your file is ready to be
          imported
        </div>
      </CardHeader>
      <CardBody className="rounded">
        <Form onSubmit={e => e.preventDefault()}>
          <FormGroup>
            <Label for="selectCSV" className="font-weight-bold">
              Prospects
            </Label>
            <div className="drag-drop-area" {...getRootProps()}>
              <input {...getInputProps()} type="file" accept=".csv" />
              {!csvFile ? (
                <Fragment>
                  <NoteAddIcon fontSize="large"></NoteAddIcon>
                  <br />
                  <div className="help-text">
                    Drag and drop or choose a file to upload your contacts.
                  </div>
                  <div className="help-text">Acceptable file types: CSV</div>
                </Fragment>
              ) : (
                <Fragment>
                  <ClearIcon
                    className="file-select-cancel"
                    onClick={cancelFileSelect}
                  />
                  <PersonIcon fontSize="large"></PersonIcon>
                  <div>{csvFile.name}</div>
                </Fragment>
              )}
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="selectCampaign">
              <div className="font-weight-bold">Campaign</div>
              <div className="help-text">
                With supporting text below as a natural lead-in to additional
                content.
              </div>
            </Label>

            <Input
              type="select"
              name="selectCampaign"
              id="exampleSelectMulti"
              placeholder="Select campaign"
            >
              <option>Select campaign</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>
              <div className="font-weight-bold">Tags</div>
              <div className="help-text">
                Select a tag to add to the list of prospects
              </div>
            </Label>
            <FormGroup>
              <Button size="sm" style={styles.controlButton}>
                + Add tag
              </Button>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label>
              <div className="font-weight-bold">Disclaimer</div>
            </Label>
            <FormGroup check>
              <Label for="termCheck">
                <Input id="termCheck" type="checkbox" onClick={clickTerm} /> I
                agree to the terms and conditions
              </Label>
            </FormGroup>
          </FormGroup>

          <Button
            className="float-right"
            disabled={(() => step < 2)()}
            style={styles.controlButton}
            onClick={e => {
              props.goNextStep();
            }}
          >
            Continue
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default SelectCSV;
