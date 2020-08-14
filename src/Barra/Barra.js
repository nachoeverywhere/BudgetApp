import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import './Barra.css';
import logo from './logo.png';
import user from './user.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserTie,
  faEnvelope,
  faKey,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import Salir from '../Salir/Salir'

const Barra = () => {
  const [usuario, elEmail] = useState('');
  const [password, elPassword] = useState('');

  function validateForm() {
    return usuario.length > 0 && password.length > 0;
  }


  // Esto tiene que estar en una clase Authenticator o algo por el estilo, es cualca que este en el navbar...
  let usuarioLogueado = () => {
    return localStorage.getItem('Token') !== null ? true : false;
  };

  function manejarEnvio(event) {
    event.preventDefault();
    fetch('http://xpense.develotion.com/login.php', {
      method: 'POST',
      body: usuario,
      password,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const items = data;
        console.log(items);
        localStorage.setItem('Token', JSON.stringify(items));
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log('Ha ocurrido un error', error.message);
      });
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        fluid="true"
        variant="dark"
        id="nav"
      >
        <Navbar.Brand href="#home">
          <img
            id="logo"
            src={logo}
            width="158"
            height="38"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/listar">Lista de gastos</Nav.Link>
            <Nav.Link href="/alta">Alta de gasto</Nav.Link>
            <Nav.Link>Estadísticas generales</Nav.Link>
            <Nav.Link>Gastos por rubro</Nav.Link>
          </Nav> 
          {!usuarioLogueado() ? (
            <Form inline id="collasible-nav-dropdown">
              <FontAwesomeIcon icon={faEnvelope} />
              <FormControl
                autoFocus
                className=" mr-sm-2 ml-2 mr-2"
                type="email"
                value={usuario}
                name="usuario"
                onChange={(e) => elEmail(e.target.value)}
              />
              <FontAwesomeIcon icon={faKey} />
              <FormControl
                inline
                className=" mr-sm-2 ml-2"
                value={password}
                onChange={(e) => elPassword(e.target.value)}
                type="password"
                name="password"
              />
              <Button
                className="mr-sm-2 ml-1"
                disabled={!validateForm()}
                type="submit"
                variant={!validateForm() ? 'outline-light' : 'primary'}
                onClick={manejarEnvio}
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Ingresar
              </Button>
            </Form>
          ) : (
            <NavDropdown
              className="float-right"
              title={
                <div className="d-inline align-top">
                  <span id="saludo">Bienvenido</span>  
                  <img
                    id="profile"
                    src={user}
                    width="40"
                    height="40"
                    alt="Foto perfil"
                  />
                </div>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>
                <FontAwesomeIcon className="icon" icon={faUserTie} /> Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <Salir/>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Barra;
