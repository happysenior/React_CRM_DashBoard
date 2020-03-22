import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

import { PRIMARY_LIGHT, PRIMARY_BLUE_DARK } from 'utils/colors';

import AddIcon from '@material-ui/icons/Add';
import FilterDropdown from './FilterDropdown';

const FilterAreaDiv = styled.div`
  display: fex;
  flex-wrap: wrap;
  padding: 1rem;
`;

const styles = {
  menuHeader: {
    height: '70px',
    background: `${PRIMARY_LIGHT}`,
    color: `${PRIMARY_BLUE_DARK}`,
  },
  addFilter: {
    background: `${PRIMARY_BLUE_DARK}`,
    borderRadius: '0.7em',
  },
};

const filterType = [
  {
    key: 'firstName',
    value: '',
    rule: 'is',
    type: 'text',
    label: 'First name',
    open: true,
  },
  {
    key: 'lastName',
    value: '',
    rule: 'is',
    type: 'text',
    label: 'Last name',
    open: true,
  },
  {
    key: 'email',
    value: '',
    rule: 'is',
    type: 'text',
    label: 'Email',
    open: true,
  },
  {
    key: 'phone',
    value: '',
    rule: 'is',
    type: 'text',
    label: 'Phone number',
    open: true,
  },
  {
    key: 'status',
    value: '',
    rule: 'is',
    type: 'select',
    label: 'Status',
    open: true,
  },
  {
    key: 'tag',
    value: '',
    rule: 'is',
    type: 'dropdown',
    label: 'Tag',
    open: true,
  },
  {
    key: 'campaign',
    value: '',
    rule: 'contains',
    type: 'text3',
    label: 'Campaign',
    open: true,
  },
  {
    key: 'createdAt',
    value: '',
    rule: 'more than',
    type: 'createdAt',
    label: 'Created at',
    open: true,
  },
  {
    key: 'calls',
    value: '',
    rule: 'more than',
    type: 'calls',
    label: 'Calls Amount',
    open: true,
  },
  {
    key: 'doNotContact',
    value: true,
    rule: 'Show only do not contact',
    type: 'radio',
    label: 'Show only do not contact',
    open: true,
  },
];
const FilterArea = props => {
  const [state, setState] = useState({
    openFilterDropdown: false,
    filters: [],
    isNeedFetch: false,
  });

  const toggle = () =>
    setState(prevState => {
      return {
        ...prevState,
        openFilterDropdown: !prevState.openFilterDropdown,
      };
    });

  const addFilter = x => {
    setState(prevState => {
      return {
        ...prevState,
        filters: [...prevState.filters, x],
      };
    });
  };

  const deleteFilter = index => {
    setState(prevState => {
      return {
        ...prevState,
        filters: prevState.filters.filter((x, k) => k != index),
        isNeedFetch: true,
      };
    });
  };

  const handleOpen = index => {
    setState(prevState => {
      return {
        ...prevState,
        filters: prevState.filters.map((x, k) => {
          if (k != index) return x;
          return { ...x, open: !x.open };
        }),
      };
    });
  };

  useEffect(() => {
    if (state.isNeedFetch) {
      props.filterProspects(state.filters);
      setState(prevState => ({ ...prevState, isNeedFetch: false }));
    }
    return () => {};
  }, [state.isNeedFetch]);

  const setFilterProperty = (name, value, index) => {
    setState(prevState => {
      let isNeedFetch = true;
      let newFilters = prevState.filters.map((x, i) => {
        if (i != index) return x;
        if (x.value == '' && name == 'rule') isNeedFetch = false;
        return {
          ...x,
          [name]: value,
        };
      });
      return {
        ...prevState,
        filters: newFilters,
        isNeedFetch,
      };
    });
  };

  return (
    <FilterAreaDiv>
      <div className="d-flex justify-content-start flex-wrap">
        {state.filters.length > 0
          ? state.filters.map((filter, index) => {
              return (
                <FilterDropdown
                  filter={filter}
                  index={index}
                  setFilterProperty={setFilterProperty}
                  deleteFilter={deleteFilter}
                  handleOpen={handleOpen}
                  key={`selected_filter_${index}`}
                />
              );
            })
          : null}
        <Dropdown isOpen={state.openFilterDropdown} toggle={toggle}>
          <DropdownToggle style={styles.addFilter}>
            <AddIcon /> Add filter
          </DropdownToggle>
          <DropdownMenu>
            {filterType.map((x, index) => (
              <DropdownItem
                onClick={() => addFilter(x)}
                key={`filter_${x.key}`}
              >
                {x.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </FilterAreaDiv>
  );
};

export default FilterArea;
