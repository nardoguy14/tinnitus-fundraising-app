import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventComponent from './Event/EventComponent/EventComponent';
import reportWebVitals from './reportWebVitals';
import ProfileComponent from "./Profile/ProfileComponent/ProfileComponent";
import SearchComponent from "./Search/SearchComponent/SearchComponent";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import RegistrationComponent from "./Registration/RegistrationComponent/RegistrationComponent";
import DonationComponent from "./Donation/DonationComponent/DonationComponent";
import NavBarComponent from "./NavBar/NavBarComponent";


ReactDOM.render(
  <React.StrictMode>

      <Router>
          <NavBarComponent/>
          <Switch>
              <Route path="/register">
                  <RegistrationComponent />
              </Route>
              <Route path="/profile">
                  <ProfileComponent />
              </Route>
              <Route path="/event">
                  <EventComponent />
              </Route>
              <Route path="/search">
                  <SearchComponent />
              </Route>
              <Route path="/donation">
                  <DonationComponent />
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
