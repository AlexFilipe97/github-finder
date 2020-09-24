import React, { useContext, useState } from "react";
import GithubContext from "../../context/github/githubContext";
import PropTypes from "prop-types";

const Search = ({ showClear, clearUsers, insertAlert }) => {
  const githubContext = useContext(GithubContext);
  const [username, setUsername] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      insertAlert("Please enter a username.", "danger");
    } else {
      githubContext.searchUsers(username);
      setUsername("");
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Search users...'
          value={username}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  insertAlert: PropTypes.func.isRequired,
};

export default Search;
