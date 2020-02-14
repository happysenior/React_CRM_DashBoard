Full Stack Web Application using MERN stack

## Frontend

Technology stack:

1. **JavaScript** (ES6+)
2. **ReactJS** with **React-Router**
3. **Redux.js** with **Redux-Saga**
4. **Material UI** framework
5. **styled-components**
6. **Unit** & **Component Testing** using **Jest** and [**react-testing-library**](https://github.com/testing-library/react-testing-library)

## Backend

Technology stack:

1. **TypeScript**
2. **NodeJS** with **Express.js** framework
3. **MongoDB** database
4. **RESTful API** with **Basic** & **JWT Authentication**
5. **[Swagger](http://bank.pietrzakadrian.com/api-docs/)** Documentation
6. **Unit Testing** using **Mocha** and **Chai**

## Requirements

- **yarn** v1.17+
- **NodeJS** v8+
- **MongoDB** v3.6+

## Installation

for **Frontend**:

1. Clone this repository and enter the `frontend` directory
2. Change `BASE_URL` in `/app/utils/api.js` to your localhost server
3. Install the dependencies by running `yarn`
4. Start the project by running `yarn start` (remember to start the backend first)

for **Backend**:

1. Clone this repository and enter the `backend` directory
2. Copy the `env.example` and create a new `.env` file from it.
3. Set the configuration parameters there (App port, app host, database host, port, username, password etc)
4. Install the dependencies by running `yarn`
5. Start the project by running `yarn start`
