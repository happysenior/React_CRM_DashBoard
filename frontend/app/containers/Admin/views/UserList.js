import React from 'react';
import { Link } from 'react-router-dom';
import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import request from 'utils/request';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from 'reactstrap';

import './index.scss';

const headers = [
  { title: 'First Name', width: '15%' },
  { title: 'Last Name', width: '15%' },
  { title: 'email', width: '15%' },
  { title: 'phone', width: '15%' },
  { title: 'system phone', width: '15%' },
  { width: '25%' },
];

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    const auth = new AuthService();
    this.token = auth.getToken();
    this.api = new ApiEndpoint();
  }

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = async () => {
    const url = this.api.getUsersPath();
    try {
      const res = await request(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      this.setState({ users: res.users });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div className="mt-3 d-flex flex-column user-list">
            <div>
              <Button
                className="primary-color border-0 mb-2"
                onClick={() => {
                  this.props.history.push('/admin/users/create');
                }}
              >
                Create User
              </Button>
            </div>
            <div className="campaign-header">
              <div className="d-flex flex-row">
                {headers.map((x, k) => (
                  <div
                    key={`list_header_${k}`}
                    className="campaign-column"
                    style={{ width: x.width }}
                  >
                    {x.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex flex-column">
              {this.state.users.map((x, k) => {
                return (
                  <div key={`users_${k}`} className="campaign">
                    <div
                      className="campaign-column"
                      style={{ width: headers[0].width }}
                    >
                      {x.firstName}
                    </div>
                    <div
                      className="campaign-column"
                      style={{ width: headers[1].width }}
                    >
                      {x.lastName}
                    </div>
                    <div
                      className="campaign-column "
                      style={{ width: headers[2].width }}
                    >
                      {x.email}
                    </div>
                    <div
                      className="campaign-column"
                      style={{ width: headers[3].width }}
                    >
                      {x.phone}
                    </div>
                    <div
                      className="campaign-column"
                      style={{ width: headers[4].width }}
                    >
                      {x.systemPhone}
                    </div>
                    <div
                      className="campaign-column d-flex"
                      style={{ width: headers[5].width }}
                    >
                      <div>
                        <Link to={`/admin/users/edit/${x._id}`}>
                          <EditIcon />
                        </Link>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            // deleteUser(x._id);
                          }}
                          className="ml-3"
                          style={{ verticalAlign: 'middle' }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserList;
