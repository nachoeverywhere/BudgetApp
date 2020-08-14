import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Registro.css';
import './FrederickatheGreat-Regular.ttf';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faKey,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';


const Registro = () => {
  const [email, elEmail] = useState('');
  const [password, elPassword] = useState('');

  toast.configure();
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function manejarRegistro(event) {
    event.preventDefault();
    fetch('http://xpense.develotion.com/usuarios.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: email, password: password }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // const items = data;
        // console.log(items);
        // localStorage.setItem('Token', JSON.stringify(items));
        if(data.codigo === 200){toast.success("Registrado con exito. Ingresa!", {position: toast.POSITION.BOTTOM_RIGHT})}
        else{toast.error(data.mensaje, {position: toast.POSITION.BOTTOM_RIGHT})};
      })
      .catch(function (error) {
        console.log('Ha ocurrido un error', error.message);
        toast.error(error.mensaje, {position: toast.POSITION.BOTTOM_RIGHT})
      });
  }

  return (
    <>
      <div class="row d-flex justify-content-center mt-4">
        <div class="col-12 d-flex justify-content-center subContenedor">
          <Form id="loginForm">
            <Form.Group controlId="formBasicEmail">
              <h2>Únete!</h2>
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <Form.Control
                autoFocus
                type="email"
                placeholder="Correo"
                value={email}
                name="email"
                onChange={(e) => elEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                (Sera vendido a hackers rusos)
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <span>
                <FontAwesomeIcon icon={faKey} Clave />
              </span>
              <Form.Control
                type="password"
                placeholder="Clave"
                value={password}
                onChange={(e) => elPassword(e.target.value)}
                name="password"
              />
            </Form.Group>
            <div class="row d-flex justify-content-center">
              <Button
                disabled={!validateForm()}
                type="submit"
                variant={!validateForm() ? 'outline-light' : 'primary'}
                onClick={manejarRegistro}
              >
                <span>
                  <FontAwesomeIcon icon={faPaperPlane} /> Registrarse
                </span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Registro;
