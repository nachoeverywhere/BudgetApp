import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCarSide,
  faGamepad,
  faPlane,
  faSoap,
  faUtensils,
  faCashRegister,
} from '@fortawesome/free-solid-svg-icons';

const IconoRubro = (Rubro) => {

  const [icono, setIcono] = useState('');

  switch (Rubro) {
    case 1:
      setIcono(faHome);
      break;
    case 2:
        setIcono(faCarSide);
      break;
    case 3:
        setIcono(faGamepad);
      break;
    case 4:
        setIcono(faPlane);
      break;
    case 5:
        setIcono(faSoap);
      break;
    case 6:
        setIcono(faUtensils);
      break;

    default:
      setIcono(faCashRegister);
      break;
  }

  return (<FontAwesomeIcon icon={icono} />);
};

export default IconoRubro;