import React, { useContext, useState } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/AlertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { clearUsers, userList } = githubContext;
  const [username, setUsername] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      alertContext.setAlert("Please enter a username.", "danger");
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
      {userList.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
