import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { PRIMARY_BORDER_GREY, PRIMARY_BLUE_DARK } from 'utils/colors';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import csv from 'csv';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from 'containers/ImportCSVPage/reducer';
import saga from 'containers/ImportCSVPage/saga';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { csvSubmitAction } from 'containers/ImportCSVPage/actions';
import { makeIsSubmittingSelector } from 'containers/ImportCSVPage/selectors';

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
})(props => <Checkbox checked color="default" {...props} />);

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

const HeaderRows = props => {
  return props.headers.map((item, index) => {
    return (
      <div className="d-flex flex-row match-table-row" key={item.name}>
        <div className="w-15">{item.match ? <GreenRoundCheckbox /> : null}</div>
        <div className="w-30">{item.name}</div>
        <div className="w-30">
          {item.preview
            ? item.preview.map((x, y) => (
                <div key={`${item.name}-${x}-${y}`}>{x}</div>
              ))
            : null}
        </div>
        <div className="w-30">
          <Input
            type="select"
            value={item.match}
            onChange={e => {
              props.selectMatch(index, e.target.value);
            }}
          >
            <option value="">Select property</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone Number</option>
            <option value="address">Address</option>
            <option value="notes">Notes</option>
            <option value="dontmatch">Don't match</option>
          </Input>
        </div>
      </div>
    );
  });
};

const key = 'importCSVPage';

const stateSelector = createStructuredSelector({
  isSubmitting: makeIsSubmittingSelector(),
});

const prospectAttr = ['firstName', 'lastName', 'email', 'phone', 'notes'];

export default function MapColumns(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    dontImport: false,
    headers: [],
    readCSV: false,
    match: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
    },
  });

  const dispatch = useDispatch();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const reader = new FileReader();

  reader.onload = () => {
    csv.parse(reader.result, (err, data) => {
      let hdata = [];
      let headerLen = data[0].length;
      for (let i = 0; i < data.length && i < 4; i++) {
        if (i === 0) {
          for (let j = 0; j < headerLen; j++) {
            hdata.push({ name: data[0][j], preview: [], match: '' });
          }
        } else {
          for (let j = 0; j < data[i].length && j < headerLen; j++) {
            hdata[j].preview.push(data[i][j]);
          }
        }
      }
      setState({ ...state, headers: hdata, readCSV: true });
    });
  };

  if (!state.readCSV) reader.readAsBinaryString(props.csvFile);

  const selectMatch = (index, value) => {
    let newHeaders = state.headers;
    let match = state.match;
    let oldMatch = newHeaders[index].match;
    newHeaders[index] = { ...newHeaders[index], match: value };

    if (prospectAttr.includes(value)) {
      const headerIndex = newHeaders.findIndex(
        item => item.name === match[value],
      );
      newHeaders[headerIndex] = { ...newHeaders[headerIndex], match: '' };
    }

    let newMatch = { ...state.match, [value]: newHeaders[index].name };

    if (prospectAttr.includes(oldMatch)) {
      newMatch = { ...newMatch, [oldMatch]: '' };
    }
    setState({ ...state, headers: newHeaders, match: newMatch });
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const submitCSV = e => {
    dispatch(
      csvSubmitAction({
        csvFile: props.csvFile,
        match: state.match,
        campaign: props.campaign,
      }),
    );
  };

  const { isSubmitting } = useSelector(stateSelector);

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
                  checked={state.dontImport}
                  onChange={handleChange('dontImport')}
                  value="dontImport"
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
            <Fragment>
              {state.headers ? (
                <HeaderRows headers={state.headers} selectMatch={selectMatch} />
              ) : null}
            </Fragment>
          </FormGroup>
          <Button
            disabled={!state.dontImport || isSubmitting}
            className="float-right"
            style={styles.controlButton}
            onClick={submitCSV}
          >
            Continue
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
