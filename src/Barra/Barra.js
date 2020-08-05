import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
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

const Barra = () => {
  const [usuario, elEmail] = useState('');
  const [password, elPassword] = useState('');

  function validateForm() {
    return usuario.length > 0 && password.length > 0;
  }

  // AL REFRESCAR SE EJECUTA. CONSULTAR
  // function salir() {
  //   //
  //   localStorage.removeItem('Token');
  //   // Agregar el routing, sino no se van a ver actualizado los cambios.
  // }

  // Esto tiene que estar en una clase Authenticator o algo por el estilo, no es prolijo que este en el navbar...
  const usuarioLogueado = () => {
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
      })
      .catch(function (error) {
        console.log('Ha ocurrido un error', error.message);
      });
  }

  const manejarSelect = (eventKey) => alert(`Selecciono: ${eventKey}`);
  return (
    <Navbar bg="dark" fluid="true" variant="dark" id="nav">
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
      <Nav className="mr-auto" onSelect={manejarSelect}>
        <Nav.Item>
          <Nav.Link eventKey="1">Lista de gastos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2">Alta de gasto</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3">Estadísticas generales</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="4">Gastos por rubro</Nav.Link>
        </Nav.Item>
      </Nav>

      {!usuarioLogueado() ? (
        <Form inline>
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
        <Dropdown>
          <Dropdown.Toggle id="dropdown">
            Bienvenido
            <img
              id="profile"
              src={user}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Foto perfil"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="5">
              <FontAwesomeIcon class="icon" icon={faUserTie} /> Mi Perfil
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="6">
              <FontAwesomeIcon class="icon" icon={faSignOutAlt} /> Salir
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Navbar>
  );
};

export default Barra;
