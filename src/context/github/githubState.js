import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    userList: [],
    loading: false,
    user: {},
    userRepos: [],
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search user
  const searchUsers = async (userTarget) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${userTarget}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  //get specific user
  const getUser = async (userTarget) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userTarget}
      ?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //get user's repos
  const getUserRepos = async (userTarget) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userTarget}/repos?per_page=5&sort=created:asc&
      ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  //clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        userList: state.userList,
        user: state.user,
        userRepos: state.userRepos,
        loading: state.loading,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
