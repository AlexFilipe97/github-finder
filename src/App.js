import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/Pages/About";
import axios from "axios";
import "./App.css";
import Repos from "./components/Repos/Repos";

class App extends Component {
  state = {
    userList: [],
    loading: false,
    alert: null,
    user: {},
    userRepos: [],
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ userList: res.data, loading: false });
  // }

  //search for a user
  searchUsers = async (userTarget) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${userTarget}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ userList: res.data.items, loading: false });
  };

  //get a specific user
  getUser = async (userTarget) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${userTarget}
      ?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  //get a specific user's repos
  getuserRepos = async (userTarget) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${userTarget}/repos?per_page=5&sort=created:asc&
      ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ userRepos: res.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ userList: [], loading: false });
  };

  setAlert = (message, type) => {
    this.setState({
      alert: {
        message: message,
        type: type,
      },
    });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { userList, loading, user, userRepos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={userList.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getUserRepos={this.getuserRepos}
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
    );
  }
}

export default App;
