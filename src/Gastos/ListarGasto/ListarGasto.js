import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListarGasto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import IconoRubro from './IconoRubro';
import {
  faHome,
  faCarSide,
  faGamepad,
  faPlane,
  faSoap,
  faUtensils,
  faCashRegister,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListarGastos = ({ history }) => {
  //Control de sesion
  const token = JSON.parse(sessionStorage.getItem('Token'));
  if (token === null) {
    history.push('/');
  }

  // Variables
  const [gastos, setGastos] = useState([]);
  const [gastosRubro, setGastosRubro] = useState([]);
  const [comprasRubro, setcomprasRubro] = useState([]);
  const [trigger, setTrigger] = useState('');
  const baseUrl = 'http://xpense.develotion.com/gastos.php';
  let url = 'http://xpense.develotion.com/gastos.php?id=';
  let callUrl = url.concat(token.id);
  toast.configure();

  // GET COMPRAS
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', apiKey: token.apiKey },
    };
    fetch(callUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        debugger;
        data.gastos.length > 10
          ? setGastos(data.gastos.slice(-10))
          : setGastos(data.gastos);
        comprasPorRubros(data.gastos);
      })
      .catch(function (error) {
        console.log('Ha ocurrido un error', error.message);
      });
  }, []);

  // DELETE COMPRA
  function borrarGasto(event, id) {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('apiKey', token.apiKey);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({ idGasto: id.id });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
    };

    fetch('http://xpense.develotion.com/gastos.php', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        debugger;
        if (data.codigo === 200) {
          toast.success(data.mensaje, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          let eliminado = gastos.filter((x) => x.id !== id);
          debugger;
          setGastos(eliminado);
        } else {
          toast.error(data.mensaje, { position: toast.POSITION.BOTTOM_RIGHT });
        }
        debugger;
      })
      .catch(function (error) {
        debugger;
        toast.error(error.mensaje, { position: toast.POSITION.BOTTOM_RIGHT });
        debugger;
      });
  }

  //FILTRAR GASTOS POR RUBRO OUT([{id, total, cantidad}])

  const comprasPorRubros = (array) => {
    let rubrosUnicos = [...new Set(array.map((gasto) => gasto.rubro))];
    debugger;
    rubrosUnicos = [
      ...new Set(
        rubrosUnicos.map((gasto) => ({ id: gasto, total: 0, cantidad: 0 }))
      ),
    ];
    debugger;

    rubrosUnicos.forEach(function (gasto) {
      //Filtro los gastos para ese rubro
      let gastosFiltrados = array.filter((x) => x.rubro === gasto.id);
      debugger;
      //Acumulo los totales y la cantidad
      var resultado = gastosFiltrados.reduce(
        function (accum, item) {
          return {
            total: parseInt(accum.total) + parseInt(item.monto),
            cantidad: parseInt(accum.cantidad) + 1,
          };
        },
        { total: 0, cantidad: 0 }
      );
      debugger;
      gasto.cantidad = resultado.cantidad;
      gasto.total = resultado.total;
      debugger;
    });
    // Pronto con fritas 🍟.
    setcomprasRubro(rubrosUnicos);
    return rubrosUnicos;
  };

  // ICONOS!
  function IconoRubro(id) {
    switch (id) {
      case '1':
        return faHome;
      case '2':
        return faCarSide;
      case '3':
        return faGamepad;
      case '4':
        return faPlane;
      case '5':
        return faSoap;
      case '6':
        return faUtensils;
      default:
        return faCashRegister;
    }
  }

  return gastos.length > 0 ? (
    <>
      <div class="row d-flex justify-content-center mt-4">
        <div class="col-12 d-flex justify-content-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th class="rubro">Rubro</th>
                <th>Descripcion</th>
                <th>Monto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {gastos.map(({ id, nombre, monto, rubro }, index) => (
                <tr key={index} value={id}>
                  <td class="rubro">
                    <FontAwesomeIcon icon={IconoRubro(rubro)} />
                  </td>
                  <td>{nombre}</td>
                  <td>$ {monto}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={(e) => borrarGasto(e, { id })}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div></div>
    </>
  ) : (
    <div class="site mt-5">
      <div class="sketch">
        <div class="bee-sketch red"></div>
        <div class="bee-sketch blue"></div>
      </div>

      <h1>
        No tienes gastos:
        <small>Has fallado el proposito de tu existencia</small>
      </h1>
    </div>
  );
};
export default withRouter(ListarGastos);
