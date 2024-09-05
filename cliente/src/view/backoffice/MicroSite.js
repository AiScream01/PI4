import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Para fazer requisições HTTP
import logo from '../../assets/Olisipo_LogoWhite.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CustomCSSMicroSite.css';
import API_BASE_URL from "../../config"; // Ajuste conforme necessário

export default function MicroSite() {
    const [microsite, setMicrosite] = useState({
        titulo: '',
        texto: '',
        link_google_play: '',
        link_app_store: ''
    });

    useEffect(() => {
        // Substitua o URL abaixo pela URL da sua API
        axios.get(`${API_BASE_URL}microsite/1`) // Supondo que o ID do registro desejado seja 1
            .then(response => {
                setMicrosite(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do microsite:', error);
            });
    }, []);

    return (
        <div>
            <header>
                <img className="logootipo" src={logo} alt="Logotipo Olisipo" />
            </header>
            <div className="container d-flex">
                <div className="texto">
                    <h1 className="title">{microsite.titulo}</h1>
                    <h2 className="texto-content">{microsite.texto}</h2>
                </div>
                <div className="instalar">
                    <h1>Instala-me</h1>
                    <a href={microsite.link_google_play || '#'} target="_blank" rel="noopener noreferrer">
                        <button className="gp">Google Play</button>
                    </a>
                    <a href={microsite.link_app_store || '#'} target="_blank" rel="noopener noreferrer">
                        <button className="as">App Store</button>
                    </a>
                </div>
            </div>
            <footer>
                <div className="rodape">
                    <img className="logo" src={logo} alt="Logotipo Olisipo" />
                    <div className="column">
                        <h3>Download</h3>
                        <p>Instala-me</p>
                    </div>

                    <div className="column">
                        <h3>Suporte</h3>
                        <p>FAQ</p>
                        <p>Telefones</p>
                        <p>Chat</p>
                    </div>

                    <div className="column">
                        <h3>Contactos</h3>
                        <p>+351 931 231 231</p>
                        <p>+351 931 231 231</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
