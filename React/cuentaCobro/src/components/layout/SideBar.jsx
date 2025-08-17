import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./sidebar.css"
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";
import { FaLayerGroup } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import routeUrl from '../../config';
import AuthContext from "../../Context/contexAuth";
import { MdAssignmentAdd } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";

import { FaFileAlt } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

function SideBar({ isOpen }) {

  const { userAuth } = useContext(AuthContext);
  const [userSide, setUserSite] = useState({});

  useEffect(() => {
    setUserSite(userAuth);
  }, [userAuth])

  const [dropdownStates, setDropdownStates] = useState({
    contratista:false
  });

  const toggleDropdown = (dropdownName) => {
    setDropdownStates(prevStates => {
      const newState = {};
      for (const key in prevStates) {
        newState[key] = false;
      }
      newState[dropdownName] = !prevStates[dropdownName];
      return newState;
    });
  };
  
  return (
    <div style={{boxShadow: "0 2px 4px rgba(0, 0.01, 0, 0.1)", border: "1px solid rgba(0, 0, 0, 0.1)"}} className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className='side-group w-100 mb-5 h-auto'>

      
      {/* Nueva sección Contratista */}
      <li className='group-li'>
        <div className='side-li'>
          <button
            onClick={() => toggleDropdown('contratista')}
            className="side-li nav-link collapsed d-flex justify-content-between p-2 gap-2 align-items-center"
            style={{ backgroundColor: "var(--primary-color)", color: "var(--text-white)" }}
          >
            <div className='d-flex gap-2'>
              <FaUserTie style={{ color: 'var(--text-white)', fontSize: '18px' }} />
              Contratista
            </div>
            {dropdownStates.contratista ? <FaChevronDown style={{ width: "0.9rem", color: "var(--text-white)" }} /> : <FaChevronRight style={{ width: "0.5rem", color: "var(--text-white)" }} />}
          </button>
        </div>
        <div className={dropdownStates.contratista ? "cl-group" : "cl-group collapse"}>
          <div className="sb-sidenav-menu-nested nav">
            <Link className='nav-link' style={{ color: "var(--text-white)" }} to="/contratista/radicados">
              <FaFileAlt style={{ marginRight: '8px', fontSize: '14px' }} />
              Radicados
            </Link>
            <Link className='nav-link' style={{ color: "var(--text-white)" }} to="/contratista/pasar-cuenta">
              <FaMoneyBillWave style={{ marginRight: '8px', fontSize: '14px' }} />
              Contratos
            </Link>
            <Link className='nav-link' style={{ color: "var(--text-white)" }} to="/contratista/supervisor">
              <FaUserTie style={{ marginRight: '8px', fontSize: '14px' }} />
              Supervisor
            </Link>
            <Link className='nav-link' style={{ color: "var(--text-white)" }} to="/contratista/presupuesto">
              <FaCalculator style={{ marginRight: '8px', fontSize: '14px' }} />
              Presupuesto
            </Link>
            <Link className='nav-link' style={{ color: "var(--text-white)" }} to="/contratista/tesoreria">
              <FaUniversity style={{ marginRight: '8px', fontSize: '14px' }} />
              Tesorería
            </Link>
            <Link className='nav-link' style={{ color: "var(--text-white)" }} to="/contratista/perfil">
              <FaUser style={{ marginRight: '8px', fontSize: '14px' }} />
              Perfil
            </Link>
            <Link className='nav-link' style={{ color: "var(--text-white)" }} to="/contratista/cuentas-cobro">
              <FaMoneyBillWave style={{ marginRight: '8px', fontSize: '14px' }} />
              Cuentas de Cobro
            </Link>
          </div>
        </div>
      </li>
      </ul>
      {/* <div className='creditos'>
       <p style={{fontSize:"13px", color: "black"}}>E.S.E IMSALUD © SARA v4.0</p>
        <p style={{fontSize:"13px", color: "black"}}>Equipo de Desarrollo</p>
      </div> */}
    </div>
  )
}

export default SideBar