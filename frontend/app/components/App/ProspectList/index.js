import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from './Toolbar';
import Status from './Status';
import Panel from './Panel';
import Paginator from './Paginator';
import { Container } from 'reactstrap';
import {
  loadProspectsAction,
  goConversationAction,
  selectProspectsAction,
  setCheckAllAction,
} from 'containers/ProspectPage/actions';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from 'containers/ProspectPage/reducer';
import saga from 'containers/ProspectPage/saga';

const key = 'prospectPage';

import {
  makeProspectsSelector,
  makeSelectedProspectIdsSelector,
  makeCheckAllSelector,
} from 'containers/ProspectPage/selectors';

const stateSelector = createStructuredSelector({
  prospects: makeProspectsSelector(),
  selectedProspectIds: makeSelectedProspectIdsSelector(),
  checkAll: makeCheckAllSelector(),
});

export default function ProspectList() {
  const dispatch = useDispatch();

  useInjectSaga({ key, saga });

  useInjectReducer({ key, reducer });

  const { prospects, selectedProspectIds, checkAll } = useSelector(
    stateSelector,
  );

  const clickProspect = id => {
    dispatch(goConversationAction(id));
  };

  const selectAllProspects = value => {
    if (value) {
      const ids = prospects.map(item => item._id);
      dispatch(selectProspectsAction(ids));
    } else {
      dispatch(selectProspectsAction([]));
    }
    dispatch(setCheckAllAction(value));
  };

  const selectProspect = (id, value) => {
    dispatch(setCheckAllAction(false));
    if (value) {
      dispatch(selectProspectsAction([...selectedProspectIds, id]));
    } else {
      const ids = selectedProspectIds.filter(item => item != id);
      dispatch(selectProspectsAction(ids));
    }
  };

  useEffect(() => {
    dispatch(loadProspectsAction());
  }, []);

  return (
    <Container>
      <Toolbar prospectCnt={prospects.length} />
      <Status />
      <Panel
        checkAll={checkAll}
        prospects={prospects}
        selectedProspectIds={selectedProspectIds}
        clickProspect={clickProspect}
        selectProspect={selectProspect}
        selectAllProspects={selectAllProspects}
      />
      <Paginator />
    </Container>
  );
}
