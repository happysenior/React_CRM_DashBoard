import React from 'react';
import { PRIMARY_BLUE_DARK } from 'utils/colors';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
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
            <div className="drag-drop-area">
              <NoteAddIcon fontSize="large"></NoteAddIcon>
              <br />
              <div className="help-text">
                Drag and drop or choose a file to upload your contacts.
              </div>
              <div className="help-text">Acceptable file types: CSV</div>
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
                <Input id="termCheck" type="checkbox" /> I agree to the terms
                and conditions
              </Label>
            </FormGroup>
          </FormGroup>

          <Button
            className="float-right"
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
