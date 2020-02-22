import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Toolbar from './Toolbar';
import Status from './Status';
import Panel from './Panel';
import Paginator from './Paginator';
import { Container } from 'reactstrap';
import {
  loadProspectsAction,
  goConversationAction,
} from 'containers/ProspectPage/actions';
import axios from 'axios';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import AuthService from 'services/auth.service';
export default function ProspectList() {
  const dispatch = useDispatch();

  // const loadProspects = () => dispatch(loadProspectsAction());
  const loadProspects = async () => {
    const api = new ApiEndpoint();
    const auth = new AuthService();
    const token = auth.getToken();
    const requestURL = api.getLoadProspectsPath();

    axios
      .post(
        requestURL,
        { filter: [], searchKey: '' },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => response.data)
      .then(res => res.prospects)
      .then(prospects => setProspects(prospects));
  };

  const clickProspect = id => {
    dispatch(goConversationAction(id));
  };

  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    loadProspects();
  }, []);

  return (
    <Container>
      <Toolbar />
      <Status />
      <Panel prospects={prospects} clickProspect={clickProspect} />
      <Paginator />
    </Container>
  );
}
