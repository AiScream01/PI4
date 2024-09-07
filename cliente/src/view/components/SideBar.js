import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Olisipo_LogoWhite.svg";
import { FaSignOutAlt } from "react-icons/fa"; // Importa o ícone de logout
import API_BASE_URL from "../../config";

export default function SideBar() {
  const location = useLocation(); // Hook para obter a localização atual
  const navigate = useNavigate(); // Hook para redirecionar

  // Função que retorna o estilo condicional
  const getLinkStyle = (path) => {
    return location.pathname === path
      ? { backgroundColor: "#1ED700", color: "white" }
      : { color: "white" };
  };

  // Função para tratar o logout
  const handleLogout = () => {
    // Aqui você pode adicionar a lógica para limpar o estado de autenticação
    // e redirecionar para a página inicial
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-olisipo"
      style={{ width: "230px", height: "100vh", backgroundColor: "#1F1F1F" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <img src={logo} alt="Navbar Image" width="100px" height="100px" />
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/pedido-ferias"
            className="nav-link"
            style={getLinkStyle("/pedido-ferias")}
          >
            Pedido Férias
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/horas" className="nav-link" style={getLinkStyle("/horas")}>
            Horas
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/ajudas"
            className="nav-link"
            style={getLinkStyle("/ajudas")}
          >
            Ajudas
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/viatura-propria"
            className="nav-link"
            style={getLinkStyle("/viatura-propria")}
          >
            Viatura Própria
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/faltas"
            className="nav-link"
            style={getLinkStyle("/faltas")}
          >
            Faltas
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/noticias"
            className="nav-link"
            style={getLinkStyle("/noticias")}
          >
            Noticias
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/parcerias"
            className="nav-link"
            style={getLinkStyle("/parcerias")}
          >
            Parcerias
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/reunioes"
            className="nav-link"
            style={getLinkStyle("/reunioes")}
          >
            Reuniões
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/utilizadores"
            className="nav-link"
            style={getLinkStyle("/utilizadores")}
          >
            Utilizadores
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/solicitacoes"
            className="nav-link"
            style={getLinkStyle("/solicitacoes")}
          >
            Solicitações
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/micro-site-editar"
            className="nav-link"
            style={getLinkStyle("/micro-site-editar")}
          >
            Micro-Site Editar
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/micro-site"
            className="nav-link"
            style={getLinkStyle("/micro-site")}
          >
            Micro-Site
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <div className="d-flex align-items-center text-white text-decoration-none">
          <img
            src={API_BASE_URL + 'uploads/' + window.localStorage.getItem("userPhoto")}
            alt="Admin Avatar"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong className="me-auto">{window.localStorage.getItem("userName")}</strong>
          <FaSignOutAlt
            onClick={handleLogout}
            style={{ cursor: "pointer", marginLeft: "10px" }}
            size={20}
            title="Logout"
          />
        </div>
      </div>
    </div>
  );
}
