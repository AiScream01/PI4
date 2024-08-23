import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Olisipo_LogoWhite.svg'; 

export default function SideBar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-olisipo overflow-scroll" style={{ width: "230px", height: "100vh", backgroundColor: "#1F1F1F" }}>
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <img src={logo} alt="Navbar Image" width="100px" height="100px" />
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/pedido-ferias" className="nav-link text-white">
                        Pedido Férias
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/horas" className="nav-link text-white">
                        Horas
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/ajudas" className="nav-link text-white">
                        Ajudas
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/viatura-propria" className="nav-link text-white">
                        Viatura Própria
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/faltas" className="nav-link text-white">
                        Faltas
                    </Link>
                </li>
                {/*<li className="nav-item">
                    <Link to="/dados-pessoais" className="nav-link text-white">
                        Dados Pessoais
                    </Link>
                </li>*/}
                <li className="nav-item">
                    <Link to="/noticias" className="nav-link text-white">
                        Noticias
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/parcerias" className="nav-link text-white">
                        Parcerias
                    </Link>
                </li>
                {/*<li className="nav-item">
                    <Link to="/notificacao-push" className="nav-link text-white">
                        Notificação Push
                    </Link>
                </li>*/}
                <li className="nav-item">
                    <Link to="/reunioes" className="nav-link text-white">
                        Reuniões
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/utilizadores" className="nav-link text-white">
                        Utilizadores
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/micro-site" className="nav-link text-white">
                        Micro-Site
                    </Link>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <Link to="#" className="d-flex align-items-center text-white text-decoration-none">
                    <img src="https://github.com/caroll2.png" alt="Admin Avatar" width="32" height="32" className="rounded-circle me-2" />
                    <strong>Admin</strong>
                </Link>
            </div>
        </div>
    );
}
