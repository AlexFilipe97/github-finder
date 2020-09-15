import React, { Component } from "react";
import PropTypes from "prop-types";

class UsersItem extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const { login, avatar_url, html_url } = this.props.user;
    return (
      <div className='card text-center'>
        <img
          src={avatar_url}
          alt=''
          className='round-img'
          style={{ width: "60px" }}
        />
        <h3>{login}</h3>
        <div>
          <a href={html_url} className='btn btn-dark btn-sm my-1'>
            Profile
          </a>
        </div>
      </div>
    );
  }
}

export default UsersItem;
