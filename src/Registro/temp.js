import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import './registro.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faKey,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';


const registro = () => {
    
    const [email, elEmail] = useState('');
    const [password, elPassword] = useState('');

    function validateForm() {
        return email.length > 0 && password.length > 0;
      }
    
    function manejarEnvio(event) {
      event.preventDefault();
      fetch('http://xpense.develotion.com/usuario.php', {
        method: 'POST',
        body: email,
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

  return (
      <>



    <div class="row d-flex justify-content-center mt-4">
      <div class="col-12 d-flex justify-content-center subContenedor">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <h4>Únete!</h4>
            <span>
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </span>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              name="usuario"
              onChange={(e) => elEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              (Sera vendido a hackers rusos)
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <span>
              <FontAwesomeIcon icon={faKey} Clave /> Clave
            </span>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => elPassword(e.target.value)}
              name="password"
            />
          </Form.Group>
          <div class="row d-flex justify-content-center">
            <Button disabled={!validateForm()}
                type="submit"
                variant={!validateForm() ? 'outline-light' : 'primary'}
                onClick={manejarEnvio}>
              <span>
                <FontAwesomeIcon icon={faPaperPlane} /> Despegar!{' '}
              </span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
    </>
  );
}

export default registro;