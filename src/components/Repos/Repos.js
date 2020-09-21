import React from "react";
import RepoItem from "./RepoItem";
import PropTypes from "prop-types";

const Repos = ({ userRepos }) => {
  return userRepos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
  userRepos: PropTypes.array.isRequired,
};

export default Repos;
