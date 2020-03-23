import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from './Toolbar';
import Status from './Status';
import Panel from './Panel';
import Paginator from './Paginator';
import FilterArea from './FilterArea';
import { Container } from 'reactstrap';
import {
  goConversationAction,
  selectProspectsAction,
  setCheckAllAction,
  selectPageAction,
  setCheckedPageAction,
  filterSelectAction,
  assignCampaignAction,
  assignStatusAction,
  deleteProspectsAction,
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
  makeModalStateSelector,
} from 'containers/ProspectPage/selectors';

const stateSelector = createStructuredSelector({
  prospects: makeProspectsSelector(),
  selectedProspectIds: makeSelectedProspectIdsSelector(),
  checkAll: makeCheckAllSelector(),
  page: makePageSelector(),
  lastPage: makeLastPageSelector(),
  totalProspects: makeTotalProspectsSelector(),
  checkedPages: makeCheckedPagesSelector(),
  modalState: makeModalStateSelector(),
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
    modalState,
  } = useSelector(stateSelector);

  const clickProspect = id => {
    dispatch(goConversationAction(id));
  };

  const selectAllProspects = value => {
    dispatch(selectProspectsAction([]));
    if (value) {
      let newCheckedPages = [];
      for (let i = 1; i <= lastPage; i++) {
        newCheckedPages.push(i);
      }
      dispatch(setCheckedPageAction(newCheckedPages));
    } else {
      dispatch(setCheckedPageAction([]));
    }
    dispatch(setCheckAllAction(value));
  };

  const selectAllProspectsInPage = (value, page) => {
    if (value) {
      const newCheckedPages = [...checkedPages, page];

      if (!checkAll) {
        const newIds = prospects
          .filter(item => {
            return (
              selectedProspectIds && !selectedProspectIds.includes(item._id)
            );
          })
          .map(x => x._id);
        dispatch(setCheckedPageAction(newCheckedPages));
        dispatch(selectProspectsAction(selectedProspectIds.concat(newIds)));
      } else {
        const newIds = selectedProspectIds.filter(item => {
          return prospects && prospects.find(x => x._id === item) === undefined;
        });

        dispatch(setCheckedPageAction(newCheckedPages));
        dispatch(selectProspectsAction(newIds));
      }
    } else {
      const newCheckedPages = checkedPages.filter(x => {
        return !(x === page);
      });
      if (!checkAll) {
        dispatch(setCheckedPageAction(newCheckedPages));
        const newIds = selectedProspectIds.filter(item => {
          return prospects && prospects.find(x => x._id === item) === undefined;
        });

        dispatch(selectProspectsAction(newIds));
      } else {
        dispatch(setCheckedPageAction(newCheckedPages));

        const newIds = prospects
          .filter(item => {
            return (
              selectedProspectIds && !selectedProspectIds.includes(item._id)
            );
          })
          .map(x => x._id);
        dispatch(selectProspectsAction(selectedProspectIds.concat(newIds)));
      }
    }
  };

  const selectProspect = (id, value) => {
    const selectedIdsOnThePage = prospects.filter(x => {
      let result = selectedProspectIds.find(prospectId => prospectId == x._id);
      if (result == undefined) return false;
      return true;
    });

    if (value) {
      if (!checkAll) {
        if (prospects.length - 1 == selectedIdsOnThePage.length) {
          const newCheckedPages = [...checkedPages, page];
          dispatch(setCheckedPageAction(newCheckedPages));
        }
        dispatch(selectProspectsAction([...selectedProspectIds, id]));
      } else {
        if (selectedIdsOnThePage.length == 1) {
          const newCheckedPages = [...checkedPages, page];
          dispatch(setCheckedPageAction(newCheckedPages));
        }
        const ids = selectedProspectIds.filter(item => item != id);
        dispatch(selectProspectsAction(ids));
      }
    } else {
      if (!checkAll) {
        if (selectedIdsOnThePage.length == prospects.length) {
          const newCheckedPages = checkedPages.filter(x => x != page);
          dispatch(setCheckedPageAction(newCheckedPages));
        }
        const ids = selectedProspectIds.filter(item => item != id);
        dispatch(selectProspectsAction(ids));
      } else {
        if (selectedIdsOnThePage.length == 0) {
          const newCheckedPages = checkedPages.filter(x => x != page);
          dispatch(setCheckedPageAction(newCheckedPages));
        }
        dispatch(selectProspectsAction([...selectedProspectIds, id]));
      }
    }
  };

  const goTo = page => {
    dispatch(selectPageAction(page));
  };

  const filterProspects = filters => {
    dispatch(filterSelectAction(filters));
  };

  const assignCampaign = (campaign, autoSequence) => {
    dispatch(assignCampaignAction(campaign, autoSequence));
  };

  const assignStatus = status => {
    dispatch(assignStatusAction(status));
  };

  const deleteProspects = () => {
    dispatch(deleteProspectsAction());
  };

  useEffect(() => {
    dispatch(filterSelectAction([]));
  }, []);

  const checkedPage = checkedPages && checkedPages.includes(page);

  return (
    <Container>
      <FilterArea filterProspects={filterProspects} />
      <Toolbar
        checkAll={checkAll}
        totalProspects={totalProspects}
        selectedIdsCnt={selectedProspectIds.length}
        assignCampaign={assignCampaign}
        assignStatus={assignStatus}
        deleteProspects={deleteProspects}
        modalState={modalState}
      />
      <Status
        selectedIdsCnt={selectedProspectIds.length}
        totalProspects={totalProspects}
        selectAllProspects={selectAllProspects}
        page={page}
        checkedPages={checkedPages}
        checkAll={checkAll}
      />
      <Panel
        checkedPage={checkedPage}
        checkAll={checkAll}
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
