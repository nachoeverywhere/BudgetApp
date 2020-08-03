import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import './Barra.css';


const Barra = () => {
  const handleSelect = (eventKey) => alert(`Selecciono: ${eventKey}`);
    return (
      <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="1" href="#/home">
            Lista de gastos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" title="Item">
            Alta de gasto
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" disabled>
            Estadísticas generales
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="4" disabled>
            Gastos por rubro
          </Nav.Link>
        </Nav.Item>
        
        <NavDropdown title="Bienvenido usuario" id="nav-dropdown">
          <Image src="../../fotos/user.png" roundedCircle />
          <NavDropdown.Item eventKey="4.1">Mi Perfil</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Salir</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  }

  export default Barra;