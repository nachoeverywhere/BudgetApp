import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import IconoRubro from './IconoRubro';

const ListarGastos = (event) => {
  const [gastos, setGastos] = useState([]);
  const token = JSON.parse(localStorage.getItem('Token'));
  let url = 'http://xpense.develotion.com/gastos.php?id=';
  let callUrl = url.concat(token.id);
  debugger;
  
  // Con esto trate que se cargara una unica vez... 
  window.addEventListener('DOMContentLoaded', (event) => {if(gastos.length === 0){obtenerGatos(event)}});


    function obtenerGatos(event){
      event.preventDefault();
      debugger;
      fetch(callUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', apiKey: token.apiKey },
    })
      .then(function (response) {
        debugger;
        return response.json();
      })
      .then(function (data) {
        debugger;
        setGastos(data.gastos);
        debugger;
      })
      .catch(function (error) {
        console.log('Ha ocurrido un error', error.message);
      });
    }

  return (
    <>
      <div>
        <ListGroup variant="flush">
         
            {gastos.map(({ id, nombre, monto, rubro }, index) => (
              <ListGroup.Item key={index} value={id}>
                <IconoRubro Rubro={rubro}></IconoRubro>${monto} {nombre}
              </ListGroup.Item>
            ))}
          
        </ListGroup>
      </div>
    </>
  );
};
export default ListarGastos;
