import UserList from './views/UserList.js';
import Dashboard from './views/Dashboard.js';

var routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/users/list',
    name: 'User List',
    icon: 'person',
    component: UserList,
    layout: '/admin',
  },
];
export default routes;
