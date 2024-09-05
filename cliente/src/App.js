import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import SideBar from "./view/components/SideBar";

// Importar componentes para as diferentes páginas
import Login from './view/auth/login';
import PedidoFerias from "./view/backoffice/PedidoFerias";
import Horas from "./view/backoffice/Horas";
import Ajudas from "./view/backoffice/AjudasCusto"
import ViaturaPropria from "./view/backoffice/ViaturaPropria";
import Faltas from "./view/backoffice/Faltas";
import DadosPessoais from "./view/backoffice/DadosPessoais";
import Noticias from "./view/backoffice/Noticias";
import Parcerias from "./view/backoffice/Parcerias";
import NotificacaoPush from "./view/backoffice/NotificacaoPush";
import Reunioes from "./view/backoffice/Reunioes";
import Utilizadores from "./view/backoffice/Utilizadores";
import MicroSite from "./view/backoffice/MicroSite";
import EditarMicroSite from './view/backoffice/EditarMicroSite';


export default function App() {
    return (
        <Router>
            <Routes>
                {/* Rota padrão sem side bar*/}
                <Route path="/" element={(<Login />)} />

                <Route path="/pedido-ferias" element={addSidebar(<PedidoFerias />)} />
                <Route path="/horas" element={addSidebar(<Horas />)} />
                <Route path="/ajudas" element={addSidebar(<Ajudas />)} />
                <Route path="/viatura-propria" element={addSidebar(<ViaturaPropria />)} />
                <Route path="/faltas" element={addSidebar(<Faltas />)} />
                <Route path="/dados-pessoais" element={addSidebar(<DadosPessoais />)} />
                <Route path="/noticias" element={addSidebar(<Noticias />)} />
                <Route path="/parcerias" element={addSidebar(<Parcerias />)} />
                <Route path="/notificacao-push" element={addSidebar(<NotificacaoPush />)} />
                <Route path="/reunioes" element={addSidebar(<Reunioes />)} />
                <Route path="/utilizadores" element={addSidebar(<Utilizadores />)} />
                <Route path="/micro-site-editar" element={addSidebar(<EditarMicroSite />)} />
                <Route path="/micro-site" element={<MicroSite />} />
                <Route element={addSidebar(<Login/>)}/>
            </Routes>
        </Router>
    );

    function addSidebar(prop){
        return (
            <div className="d-flex">
                <SideBar />
                <div className="flex-grow-1 p-3">
                    {prop}
                </div>
            </div>
        );

    }

}
