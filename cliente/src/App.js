import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import SideBar from "./view/components/SideBar";

// Importar componentes para as diferentes páginas
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

export default function App() {
    return (
        <Router>
            <div className="d-flex">
                <SideBar />
                <div className="flex-grow-1 p-3">
                    <Routes>
                        <Route path="/pedido-ferias" element={<PedidoFerias />} />
                        <Route path="/horas" element={<Horas />} />
                        <Route path="/ajudas" element={<Ajudas />} />
                        <Route path="/viatura-propria" element={<ViaturaPropria />} />
                        <Route path="/faltas" element={<Faltas />} />
                        <Route path="/dados-pessoais" element={<DadosPessoais />} />
                        <Route path="/noticias" element={<Noticias />} />
                        <Route path="/parcerias" element={<Parcerias />} />
                        <Route path="/notificacao-push" element={<NotificacaoPush />} />
                        <Route path="/reunioes" element={<Reunioes />} />
                        <Route path="/utilizadores" element={<Utilizadores />} />
                        <Route path="/micro-site" element={<MicroSite />} />
                        {/* Rota padrão */}
                        <Route path="/" element={<PedidoFerias />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
