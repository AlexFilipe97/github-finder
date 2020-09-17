import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    userList: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ userList: res.data, loading: false });
  }

  searchUsers = async (userTarget) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${userTarget}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ userList: res.data.items, loading: false });
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
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { userList, loading } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={userList.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} userList={userList} />
        </div>
      </div>
    );
  }
}

export default App;
