import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Logout extends Component {
  state = {
    navigate: false,
  };

  logout = () => {
    sessionStorage.clear('Token');
    this.setState({ navigate: true });
  };

  render() {
    const { navigate } = this.state;

    if (navigate) {
      return  window.location.reload(true);;
    }

    return (
      <NavDropdown.Item onClick={this.logout}>
        <FontAwesomeIcon className="icon" icon={faSignOutAlt} /> Salir
      </NavDropdown.Item>
    );
  }
}

export default Logout;
