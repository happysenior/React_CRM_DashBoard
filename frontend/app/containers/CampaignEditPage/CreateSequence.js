import React, { Fragment } from 'react';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const CreateSequence = props => {
  return (
    <Fragment>
      <h2 className="campaign-sequence">Campaign Sequence</h2>
      <div className="row justify-content-center">
        <div className="col-md-5 card py-2">
          <div className="row">
            <div className="col-md-12 pt-3">
              <h4 className="mb-5">
                <HorizontalSplitIcon fontSize="large" />
                Sequence Setup
              </h4>
            </div>
            <div className="col-md-6 text-center border-right my-2">
              <h4>Start from scratch</h4>
              <p className="py-3">
                Create new sequence and save it for re-use in future.
              </p>
              <button
                className="btn create-sequence mt-5"
                onClick={props.createSequence}
              >
                <DoneAllIcon /> Create New
              </button>
            </div>
            <div className="col-md-6 text-center">
              <h4>Start with template</h4>
              <p>
                Use template you created before or adjust it and create new
                sequence.
                <br />
              </p>
              <p className="text-left">
                <strong>Select template</strong>
                <span
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  className="help-circle"
                  data-original-title="Help text"
                >
                  ?
                </span>
                <select
                  name="select_template"
                  id="select_template"
                  className="form-control mb-3"
                >
                  <option value=""></option>
                  <optgroup label="Yours sequences"></optgroup>
                </select>
                <button className="btn btn-primary btn-import-sequence create-sequence">
                  <HorizontalSplitIcon fontSize="small" /> Import Sequence
                </button>
              </p>
            </div>
            <div className="col-md-12">&nbsp;</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateSequence;
