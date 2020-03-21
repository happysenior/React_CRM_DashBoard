import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from './Toolbar';
import Status from './Status';
import Panel from './Panel';
import Paginator from './Paginator';
import FilterArea from './FilterArea';
import { Container } from 'reactstrap';
import {
  loadProspectsAction,
  goConversationAction,
  selectProspectsAction,
  setCheckAllAction,
  selectPageAction,
  setCheckedPageAction,
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
  makePageSelector,
  makeLastPageSelector,
  makeTotalProspectsSelector,
  makeCheckedPagesSelector,
} from 'containers/ProspectPage/selectors';

const stateSelector = createStructuredSelector({
  prospects: makeProspectsSelector(),
  selectedProspectIds: makeSelectedProspectIdsSelector(),
  checkAll: makeCheckAllSelector(),
  page: makePageSelector(),
  lastPage: makeLastPageSelector(),
  totalProspects: makeTotalProspectsSelector(),
  checkedPages: makeCheckedPagesSelector(),
});

export default function ProspectList() {
  const dispatch = useDispatch();

  useInjectSaga({ key, saga });

  useInjectReducer({ key, reducer });

  const {
    prospects,
    selectedProspectIds,
    checkAll,
    page,
    lastPage,
    totalProspects,
    checkedPages,
  } = useSelector(stateSelector);

  const clickProspect = id => {
    dispatch(goConversationAction(id));
  };

  const selectAllProspects = value => {
    if (value) {
      const newIds = prospects.map(x => x._id);
      dispatch(selectProspectsAction(newIds));
    } else {
      dispatch(selectProspectsAction([]));
    }
    dispatch(setCheckAllAction(value));
  };

  const selectAllProspectsInPage = (value, page) => {
    if (value) {
      const newIds = prospects
        .filter(item => {
          return selectedProspectIds && !selectedProspectIds.includes(item._id);
        })
        .map(x => x._id);

      const newCheckedPages = [...checkedPages, page];
      dispatch(setCheckedPageAction(newCheckedPages));
      dispatch(selectProspectsAction(selectedProspectIds.concat(newIds)));
    } else {
      const newCheckedPages = checkedPages.filter(x => {
        return !(x === page);
      });
      dispatch(setCheckedPageAction(newCheckedPages));
      const newIds = selectedProspectIds.filter(item => {
        return prospects && prospects.find(x => x._id === item) === undefined;
      });

      dispatch(selectProspectsAction(newIds));
    }
  };

  const selectProspect = (id, value) => {
    const newCheckedPages = checkedPages.filter(x => {
      return !(x === page);
    });
    dispatch(setCheckedPageAction(newCheckedPages));
    dispatch(setCheckAllAction(false));
    if (value) {
      dispatch(selectProspectsAction([...selectedProspectIds, id]));
    } else {
      const ids = selectedProspectIds.filter(item => item != id);
      dispatch(selectProspectsAction(ids));
    }
  };

  const goTo = page => {
    dispatch(selectPageAction(page));
  };

  const filterProspects = filters => {
    dispatch(loadProspectsAction(filters));
  }

  useEffect(() => {
    dispatch(loadProspectsAction([]));
  }, []);

  const isCheckedPaged = checkedPages && checkedPages.includes(page);
  return (
    <Container>
      <FilterArea filterProspects={filterProspects}/>
      <Toolbar totalProspects={totalProspects} />
      <Status
        selectedIdsCnt={selectedProspectIds.length}
        totalProspects={totalProspects}
        selectAllProspects={selectAllProspects}
        page={page}
        checkedPages={checkedPages}
        checkAll={checkAll}
      />
      <Panel
        checkAll={isCheckedPaged}
        prospects={prospects}
        selectedProspectIds={selectedProspectIds}
        clickProspect={clickProspect}
        selectProspect={selectProspect}
        selectAllProspects={selectAllProspects}
        selectAllProspectsInPage={selectAllProspectsInPage}
        page={page}
      />
      <Paginator goTo={goTo} page={page} lastPage={lastPage} />
    </Container>
  );
}
