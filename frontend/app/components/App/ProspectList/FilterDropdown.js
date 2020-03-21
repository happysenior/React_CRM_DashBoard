import React, { useState, useRef, useEffect, useCallback } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Select from 'react-select';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

const getLabel = filter => {
  const { key, type, label, rule, value } = filter;

  switch (key) {
    case 'firstName':
    case 'lastName':
    case 'email':
    case 'phone':
      return ` ${rule} ${value}`;
    case 'status':
      return ` is ${value}`;
    case 'createdAt':
      return ` ${rule} ${value} days ago`;
    case 'tag':
      return ` is ${value}`;
    case 'calls':
      return ` ${rule} ${value} calls`;
    case 'campaign':
      return ` ${rule} ${value}`;
    case 'doNotContact':
      return `${value}`;
  }
};

const makeDropdown = (filter, index, setFilterProperty, options) => {
  const { type, key, label, rule, value } = filter;

  const rulesForText = ['contains', 'is'];
  const rulesForDropdown = ['is', 'is not'];
  const rulesForSelect = ['is', 'is not'];
  const rulesForCampaign = ['contains', 'does not contains', 'is'];
  const rulesForCreatedAt = ['more than', 'less than', 'exactly'];
  const rulesForCalls = ['more than', 'less than', 'exactly'];
  const rulesForDoNotContact = [
    'Show only do not contact',
    'Hide do not contact',
  ];
  const status = ['', 'NEW', 'RESPONDED', 'WON', 'LOST'];

  if (type == 'text' || type == 'text3') {
    let rules = rulesForText;
    if (type == 'text3') rules = rulesForCampaign;
    return (
      <DropdownMenu className="filter-menu">
        {rules.map((x, k) => {
          return (
            <DropdownItem key={`${index}_${key}_${k}`}>
              <label className="d-block">
                <input
                  type="radio"
                  checked={rule == x}
                  name={`${key}_${index}`}
                  onChange={() => {
                    setFilterProperty('rule', x, index);
                  }}
                />
                {x}
              </label>
              {rule == x ? (
                <input
                  type="text"
                  value={value}
                  className="ml-3"
                  onChange={e => {
                    setFilterProperty('value', e.target.value, index);
                  }}
                />
              ) : null}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    );
  } else if (type == 'select') {
    return (
      <DropdownMenu className="filter-menu">
        {rulesForSelect.map((x, k) => {
          return (
            <DropdownItem key={`${index}_${key}_${k}`}>
              <label className="d-block">
                <input
                  type="radio"
                  checked={rule == x}
                  name={`${key}_${index}`}
                  onChange={() => {
                    setFilterProperty('rule', x, index);
                  }}
                />
                {x}
              </label>
              {rule == x ? (
                <select
                  name="status"
                  className="ml-3"
                  value={value}
                  onChange={e => {
                    setFilterProperty('value', e.target.value, index);
                  }}
                >
                  {status.map((x, k) => (
                    <option value={`${x}`} key={`${index}_status_k`}>
                      {x}
                    </option>
                  ))}
                </select>
              ) : null}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    );
  } else if (type == 'dropdown') {
    return (
      <DropdownMenu className="filter-menu">
        {rulesForDropdown.map((x, k) => {
          return (
            <DropdownItem key={`${index}_${key}_${k}`}>
              <label className="d-block">
                <input
                  type="radio"
                  checked={rule == x}
                  name={`${key}_${index}`}
                  onChange={() => {
                    setFilterProperty('rule', x, index);
                  }}
                />
                {x}
              </label>
              {rule == x ? (
                <Select
                  options={options}
                  isLoading={true}
                  value={value}
                  onChange={e => {
                    setFilterProperty('value', e.target.value, index);
                  }}
                />
              ) : null}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    );
  } else if (type == 'createdAt') {
    return (
      <DropdownMenu className="filter-menu">
        {rulesForCreatedAt.map((x, k) => {
          return (
            <DropdownItem key={`${index}_${key}_${k}`}>
              <label className="d-block">
                <input
                  type="radio"
                  checked={rule == x}
                  name={`${key}_${index}`}
                  onChange={() => {
                    setFilterProperty('rule', x, index);
                  }}
                />
                {x}
              </label>
              {rule == x ? (
                <label>
                  <input
                    type="number"
                    value={value}
                    onChange={e => {
                      setFilterProperty('value', e.target.value, index);
                    }}
                    className="mr-3 filter-number-input"
                  />
                  days a go
                </label>
              ) : null}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    );
  } else if (type == 'calls') {
    return (
      <DropdownMenu className="filter-menu">
        {rulesForCalls.map((x, k) => {
          return (
            <DropdownItem key={`${index}_${key}_${k}`}>
              <label className="d-block">
                <input
                  type="radio"
                  checked={rule == x}
                  name={`${key}_${index}`}
                  onChange={() => {
                    setFilterProperty('rule', x, index);
                  }}
                />
                {x}
              </label>
              {rule == x ? (
                <label>
                  <input
                    type="number"
                    value={value}
                    onChange={e => {
                      setFilterProperty('value', e.target.value, index);
                    }}
                    className="mr-3 filter-number-input"
                  />
                  calls
                </label>
              ) : null}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    );
  } else {
    return (
      <DropdownMenu className="filter-menu">
        {rulesForDoNotContact.map((x, k) => {
          return (
            <DropdownItem key={`${index}_${key}_${k}`}>
              <label className="d-block">
                <input
                  type="radio"
                  checked={rule == x}
                  name={`${key}_${index}`}
                  onChange={() => {
                    setFilterProperty('rule', x, index);
                    setFilterProperty('value', k < 1 ? true : false, index);
                  }}
                />
                {x}
              </label>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    );
  }
};

class FilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ],
    };
  }

  toggle = () => {
    this.props.handleOpen(this.props.index);
  };

  handleClick = event => {
    if (this.node) {
      if (this.node.containerRef.current.contains(event.target)) {
        return;
      } else {

        if (this.props.filter.open) this.toggle();
      }
    }
  };

  componentDidMount = () => {
    window.addEventListener('click', this.handleClick);
    if (this.props.filter.type == 'dropdown') {
      this.setState(prevState => {
        return { ...prevState, isLoading: true };
      });
      setTimeout(() => {
        this.setState(prevState => {
          return { ...prevState, isLoading: false };
        });
      }, 500);
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleClick);
  };

  render() {
    const { filter, index, setFilterProperty, handleOpen } = this.props;
    const toggleCls =
      filter.value == '' && !filter.open
        ? 'filter-toggle red-border'
        : 'filter-toggle';

    return (
      <Dropdown
        isOpen={filter.open}
        toggle={() => {}}
        ref={node => {
          if (node) this.node = node;
        }}
      >
        <DropdownToggle className={toggleCls} onClick={this.toggle}>
          <strong>{filter.label} </strong>
          <span className="pl-2"> {getLabel(filter)}</span>
          <CloseIcon
            onClick={e => {
              e.stopPropagation();

              this.props.deleteFilter(index);
            }}
            fontSize="small"
          />
        </DropdownToggle>
        {makeDropdown(filter, index, setFilterProperty, this.state.option)}
      </Dropdown>
    );
  }
}

export default FilterDropdown;
