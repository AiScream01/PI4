import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Olisipo_LogoWhite.svg';

export default function SideBar() {
    const location = useLocation();  // Hook para obter a localização atual

    // Função que retorna o estilo condicional
    const getLinkStyle = (path) => {
        return location.pathname === path
            ? { backgroundColor: '#1ED700', color: 'white' }
            : { color: 'white' };
    };

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-olisipo overflow-scroll" style={{ width: "230px", height: "100vh", backgroundColor: "#1F1F1F" }}>
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <img src={logo} alt="Navbar Image" width="100px" height="100px" />
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/pedido-ferias" className="nav-link" style={getLinkStyle('/pedido-ferias')}>
                        Pedido Férias
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/horas" className="nav-link" style={getLinkStyle('/horas')}>
                        Horas
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/ajudas" className="nav-link" style={getLinkStyle('/ajudas')}>
                        Ajudas
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/viatura-propria" className="nav-link" style={getLinkStyle('/viatura-propria')}>
                        Viatura Própria
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/faltas" className="nav-link" style={getLinkStyle('/faltas')}>
                        Faltas
                    </Link>
                </li>
                {/*<li className="nav-item">
                    <Link to="/dados-pessoais" className="nav-link" style={getLinkStyle('/dados-pessoais')}>
                        Dados Pessoais
                    </Link>
                </li>*/}
                <li className="nav-item">
                    <Link to="/noticias" className="nav-link" style={getLinkStyle('/noticias')}>
                        Noticias
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/parcerias" className="nav-link" style={getLinkStyle('/parcerias')}>
                        Parcerias
                    </Link>
                </li>
                {/*<li className="nav-item">
                    <Link to="/notificacao-push" className="nav-link" style={getLinkStyle('/notificacao-push')}>
                        Notificação Push
                    </Link>
                </li>*/}
                <li className="nav-item">
                    <Link to="/reunioes" className="nav-link" style={getLinkStyle('/reunioes')}>
                        Reuniões
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/utilizadores" className="nav-link" style={getLinkStyle('/utilizadores')}>
                        Utilizadores
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/micro-site-editar" className="nav-link" style={getLinkStyle('/micro-site-editar')}>
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
