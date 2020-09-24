import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/Pages/About";
import axios from "axios";
import GithubState from "./context/github/githubState";
import "./App.css";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});
  const [userRepos, setUserRepos] = useState([]);

  //get a specific user
  const getUser = async (userTarget) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userTarget}
      ?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  //get a specific user's repos
  const getuserRepos = async (userTarget) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userTarget}/repos?per_page=5&sort=created:asc&
      ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUserRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUserList([]);
    setLoading(false);
  };

  const insertAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      clearUsers={clearUsers}
                      showClear={userList.length > 0 ? true : false}
                      insertAlert={insertAlert}
                    />
                    <Users loading={loading} userList={userList} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getuserRepos}
                    user={user}
                    userRepos={userRepos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
