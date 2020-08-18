import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ToastContainer, toast } from 'react-toastify';

function Graph() {
  // Variables
  const token = JSON.parse(sessionStorage.getItem('Token'));
  const [gastos, setGastos] = useState([]);
  const [rubrosUni, setRubrosUni] = useState([]);
  const [comprasRubro, setcomprasRubro] = useState([]);
  let url = 'http://xpense.develotion.com/gastos.php?id=';
  let callUrl = url.concat(token.id);
  toast.configure();

  // Por problemas de indentacion misteriosos no me permite hacer un segundo fetch para obtener los rubros, asi que uso el resultado hardcodeado...
  const losRubros = [
    {
      id: '1',
      nombre: 'Hogar',
    },
    {
      id: '2',
      nombre: 'Auto',
    },
    {
      id: '3',
      nombre: 'Entretenimiento',
    },
    {
      id: '4',
      nombre: 'Viajes',
    },
    {
      id: '5',
      nombre: 'Limpieza',
    },
    {
      id: '6',
      nombre: 'Alimentación',
    },
    {
      id: '0',
      nombre: 'Otro',
    },
    {
        id: '7',
        nombre: 'Otro',
      }
  ];

  // GET COMPRAS
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', apiKey: token.apiKey },
    };

    fetch(callUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setGastos(data.gastos);
        comprasPorRubros(data.gastos);
        if(data.gastos.length === 0){ toast.error("No tienes gastos ingresados aun!", {position: toast.POSITION.TOP_CENTER}) }
      })
      .catch(function (error) {
        console.log('Ha ocurrido un error', error.message);
      });
  }, []);

  // FILTRAR GASTOS POR RUBRO OUT([{id, total, cantidad}])
  const comprasPorRubros = (array) => {

    let rubrosUnicos = [...new Set(array.map((gasto) => gasto.rubro))];

    setRubrosUni(rubrosUnicos);

    rubrosUnicos = [
      ...new Set(
        rubrosUnicos.map((gasto) => ({ id: gasto, total: 0, cantidad: 0 }))
      ),
    ];

    rubrosUnicos.forEach(function (gasto) {
      //Filtro los gastos para ese rubro

      let gastosFiltrados = array.filter((x) => x.rubro === gasto.id);

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

      gasto.cantidad = resultado.cantidad;
      gasto.total = resultado.total;
    });

    // Asigno el nombre a las IDs
    rubrosUnicos.filter(function (x) {
      
      losRubros.forEach(function (y) {
        if (y.id === x.id) {
          x.id = y.nombre;
        }
      });

    });
    debugger;

    // Pronto con fritas 🍟.
    setcomprasRubro(rubrosUnicos);
    return rubrosUnicos;
  };

  // Podria hacer mas graficas
  const montos = comprasRubro.map((y) => y.total);
  const cantidades = comprasRubro.map((y) => y.cantidad);
  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: comprasRubro.map((x) => x.id),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div style={{ backgroundColor: 'white', textAlign: 'center', alignContent: 'center' }}>
      <br />

     

      <div>
      <h2>Totales por rubros (Gastos por rubro)</h2>
      <ReactApexChart
        options={options}
        series={montos}
        type="donut"
        height="250px"
      />
      </div>
      <br />
      <br />
      <div>
      <h2>Cantidades por rubros (Compras por rubro)</h2>
      <ReactApexChart
        options={options}
        series={cantidades}
        type="donut"
        height="250px"
      />
      </div>
      <br />

     
     
    </div>
  );
}

export default Graph;
