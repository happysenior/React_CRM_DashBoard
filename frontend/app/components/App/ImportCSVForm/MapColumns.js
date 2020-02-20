import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { PRIMARY_BORDER_GREY, PRIMARY_BLUE_DARK } from 'utils/colors';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    color: `${PRIMARY_BORDER_GREY}`,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const GreenRoundCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
    borderRadius: '50%',
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

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

export default function MapColumns() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  return (
    <Card className="border-0">
      <CardHeader className="primary-background border-0">
        <div className="font-weight-bold form-title">
          Map columns in your file to prospects properties
        </div>
        <div className="help-text">
          Each column header below should be mapped to a prospect property. Some
          of these have already been mapped based on their names. Anything that
          hasn't been mapped yet can be manually mapped to a prospect property
          with the dropdown menu. You can always choose "Don't import column".
        </div>
      </CardHeader>
      <CardBody className="rounded">
        <Form onSubmit={e => e.preventDefault()}>
          <FormGroup>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={state.checkedG}
                  onChange={handleChange('checkedG')}
                  value="checkedG"
                />
              }
              className={classes.root}
              label="Don't import data in unmatched columns"
            />
          </FormGroup>
          <FormGroup>
            <div className="d-flex flex-row match-table-header">
              <div className="w-15">Matched</div>
              <div className="w-30">Column Header From File</div>
              <div className="w-30">Preview Information</div>
              <div className="w-30">Property</div>
            </div>

            <div className="d-flex flex-row match-table-row">
              <div className="w-15">
                <GreenRoundCheckbox />
              </div>
              <div className="w-30">FirstName</div>
              <div className="w-30">
                <div>Shannon</div>
                <div>Joey</div>
                <div>Lydia</div>
              </div>
              <div className="w-30">
                <Input type="select" name="selectProperty" id="selectProperty">
                  <option>Select property</option>
                  <option>First Name</option>
                  <option>Last Name</option>
                  <option>Email</option>
                  <option>Phone Number</option>
                  <option>Notes</option>
                </Input>
              </div>
            </div>
            <div className="d-flex flex-row match-table-row">
              <div className="w-15">
                <GreenRoundCheckbox />
              </div>
              <div className="w-30">LastName</div>
              <div className="w-30">
                <div>BELL</div>
                <div>BELL</div>
                <div>BELL</div>
              </div>
              <div className="w-30">
                <Input type="select" name="selectProperty" id="selectProperty">
                  <option>Select property</option>
                  <option>First Name</option>
                  <option>Last Name</option>
                  <option>Email</option>
                  <option>Phone Number</option>
                  <option>Notes</option>
                </Input>
              </div>
            </div>
            <div className="d-flex flex-row match-table-row">
              <div className="w-15">
              </div>
              <div className="w-30">Phone</div>
              <div className="w-30">
                <div>(718)499-0183</div>
                <div>(585)394-447</div>
                <div>(718)596-7265</div>
              </div>
              <div className="w-30">
                <Input type="select" name="selectProperty" id="selectProperty">
                  <option>Select property</option>
                  <option>First Name</option>
                  <option>Last Name</option>
                  <option>Email</option>
                  <option>Phone Number</option>
                  <option>Notes</option>
                </Input>
              </div>
            </div>

          </FormGroup>
          <Button className="float-right" style={styles.controlButton}>
            Continue
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
