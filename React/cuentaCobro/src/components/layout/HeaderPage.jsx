import React, { useState, useContext, useEffect } from "react";
import "./headerPage.css";
//usando CustomHook
import useModal from "../../hooks/useModal";
import FormCambioContraseña from "../../features/cambioContraseña/FormCambioPassword";
import CustomModal from "../ui/CustomModal";
import { FaBars } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import AuthContext from "../../Context/contexAuth";
import routeUrl from '../../config';
import Typed from 'typed.js';
import { MdOutlineLightMode } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { useApi } from "../../api/useApi";
import { ENDPOINTS } from "../../api/endpoints";


function HeaderPage({ toggleSidebar }) {

  const [estadoCaja, setEstadoCaja] = useState(false);
  const { userAuth } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [uimd, setUimd] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { get } = useApi();

  function mdivCambio() {
    setEstadoCaja(!estadoCaja);
  }

  const fetchUserInfo = async () => {
    try {
      const response = await get(ENDPOINTS.USUARIOSSARA);
      let usuarios = response;
      
      // Handle different response structures
      if (response && response.results) {
        usuarios = response.results;
      } else if (response && response.data) {
        usuarios = response.data;
      }
      
      if (Array.isArray(usuarios)) {
        const currentUser = usuarios.find(user => user.username === userAuth.username);
        if (currentUser) {
          setUserInfo(currentUser);
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    setNombreUsuario(userAuth.username);
    console.log(userAuth.username, "user dentro de header");
    if (userAuth.username) {
      fetchUserInfo();
    }
  }, [userAuth])

  const el = React.useRef(null);

  function changeModeUi() {
    setUimd(!uimd);
  }
  const htmlElement = document.documentElement;

  useEffect(() => {
    console.log("Uimode:", uimd)
    if (uimd) {
      htmlElement.setAttribute('data-bs-theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-bs-theme', 'dark');
      htmlElement.removeAttribute('data-bs-theme');
    }
  }, [uimd])

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'SARA',
        'E.S.E Imsalud',
        'Bienvenido'
      ],
      typeSpeed: 30,
      backSpeed: 20,
      showCursor: true,
      cursorChar: ',',
      loop: false
    });

    return () => {
      typed.destroy();
    };
  }, []);


  return (
    <>


      <nav
        className="navbar nb-nav"
        style={{ color: "var(--text-white)" }}
      >
        <div className="container-fluid" >
          <button
            className="hb"
            onClick={toggleSidebar}
            aria-label="Menú principal"
          >
            <span className="navbar-brand d-flex gap-3 p-10 w-20" style={{ color: "var(--text-white)", fontSize: "1rem" }}>
              <span aria-hidden="true">
                <FaBars style={{ width: "14px", color: "var(--text-white)" }} />
              </span>
              <span>Menú</span>
            </span>
          </button>
          <ul className="navbar-nav d-flex flex-row gap-3 justify-content-center align-items-center ">
            <li className="welcomeUser">
              <span ref={el}></span><span className="pl-2"> {nombreUsuario ? nombreUsuario : "User!"}</span>
            </li>
            <li className="uiMode" onClick={changeModeUi}>
              {uimd ? <MdOutlineLightMode /> : <MdModeNight />}
            </li>
            <li className="nav-item dropdown navbar-nav d-flex gap-1 justify-content-center align-items-center flex-row ">
              {userInfo && userInfo.imagen ? (
                <img 
                  src={userInfo.imagen} 
                  alt="Foto de perfil" 
                  className="user-avatar"
                  style={{ 
                    width: "30px", 
                    height: "30px", 
                    borderRadius: "50%", 
                    objectFit: "cover",
                    border: "2px solid var(--text-white)"
                  }}
                  onError={(e) => {
                    e.target.src = 'http://localhost:8000/imgs/sinfoto.jpeg';
                  }}
                />
              ) : (
                <FaUser className="navbarDropdown dropdown-toggle" style={{ color: "var(--text-white)", width: "15px" }} />
              )}
              {/* <IoMdArrowDropdown onClick={mdivCambio}  id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"/> */}
              <button
                onClick={mdivCambio}
                id="dropdownMenuButton"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Abrir menú de usuario"
                className="dropdown-toggle-button"
              >
                <IoMdArrowDropdown aria-hidden="true" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {estadoCaja === true ? (
        <ul
          className="menuNavdropdown-menu"
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <a className="dropdown-item" href={`${routeUrl}/login`}>
              Cerrar sesión
            </a>
          </li>
        </ul>
      ) : (
        ""
      )}
      <CustomModal
        title={`Actualizar Contraseña`}
        onClose={closeModal}
        show={showModal}
        size={"sm"}
      >
        <FormCambioContraseña cerrarModal={closeModal}></FormCambioContraseña>
      </CustomModal>
    </>
  );
}

export default HeaderPage;
