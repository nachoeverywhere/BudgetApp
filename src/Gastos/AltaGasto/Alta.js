import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Col,
  Row,
} from 'react-bootstrap';
import './Alta.css';
import fondoTitulo from '../fondoTitulo.png';
import fondoFormulario from './fondoFormulario.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillAlt,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';


const Alta = () => {
  const [nombre, elNombre] = useState('');
  const [monto, elMonto] = useState('');
  const [rubro, setRubro] = useState('');
  const [rubros, setRubros] = useState([]);
  const token = JSON.parse(sessionStorage.getItem('Token'));
  let url = 'http://xpense.develotion.com/gastos.php?id=';
  let callUrl = url.concat(token.id);
  toast.configure();

  useEffect(() => { 
    fetch('http://xpense.develotion.com/rubros.php', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apiKey: token.apiKey,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {     
        setRubros(data.rubros);
        setRubro(rubros[0].id);  
    })
    .catch(function (error) {
      console.log('Ha ocurrido un error', error.message);
    })}, []);

  function validateForm() {
    return nombre.length > 0 && monto.length > 0 && parseInt(monto) > 0;
  }

  const handleRubro = ({ target: { value } }) => setRubro(value);

  function manejarAlta(event) {
    event.preventDefault();
    fetch(callUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apiKey: token.apiKey },
      body: JSON.stringify({ nombre: nombre, monto: monto, idUsuario: token.idUsuario,  rubro: rubro }),
    })
      .then(function (response) {
        toast.success("Agregado con exito!", {position: toast.POSITION.BOTTOM_RIGHT})
        return response.json();
      }).catch(function (error) {
        console.log('Ha ocurrido un error', error.message);
        if(error){
          toast.error(error.mensaje, {position: toast.POSITION.BOTTOM_RIGHT})
        }
      });
  }

  return (
    <>
      <div class="row d-flex justify-content-center mt-4">
        <div class="col-12 d-flex justify-content-center subContenedorTitulo">
          <h2>Agregar un nuevo gasto</h2>
        </div>
      </div>

      <div class="row d-flex justify-content-center mt-4">
        <div class="col-12 d-flex justify-content-center subContenedorAlta">
        
          <Form id="altaForm">
            <Form.Group as={Row} controlId="formHorizontalNombre">
              <Form.Label column sm={2}>
                Nombre del gasto
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  name="nombre"
                  onChange={(e) => elNombre(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalMonto">
              <Form.Label column sm={2}>
                Monto
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Monto"
                  value={monto}
                  name="monto"
                  onChange={(e) => elMonto(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formSelect">
              <Form.Label column sm={2}>
                Categoria
              </Form.Label>
              <Col sm={10}>
                <select as="select" value={rubro} onChange={handleRubro} class="form-control">
                {rubros.map(({ id, nombre}, index) => (
                  <option key={index} value={id}>
                  {nombre}
                  </option>
                ))}
                </select>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button
                  disabled={!validateForm()}
                  type="submit"
                  variant={!validateForm() ? 'outline-light' : 'primary'}
                  onClick={manejarAlta}
                >
                  <span>
                    <FontAwesomeIcon icon={faMoneyBillAlt} /> Alta
                  </span>
                </Button>
              </Col>
            </Form.Group>
          </Form>

        </div>
      </div>
    </>
  );
};

export default Alta;
