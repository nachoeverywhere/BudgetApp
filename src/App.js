import React, { useState } from 'react';
import './App.css';
import Barra from './Barra/Barra';
import Registro from './Registro/Registro';
import Alta from './Gastos/AltaGasto/Alta';
import ListarGasto from './Gastos/ListarGasto/ListarGasto';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{withRouter} from 'react-router-dom';


//<Route path="/" component={Login} exact />
//<Route component={PageNotFound} />
// {!usuarioLogueado() ? <Registro/> : ""}


const App = ()  => {
  toast.configure();
  const notify = () => toast.info("Holanga", toast.POSITION.BOTTOM_RIGHT);
  return (
    <>
    
      <Barra />
      <ToastContainer />
      <Switch>
      <Route path="/" component={Registro} exact />
      <Route path="/listar" component={ListarGasto} exact />
      <Route path="/alta" component={Alta} exact />
      </Switch>
    </>
  );
}

export default withRouter(App);
