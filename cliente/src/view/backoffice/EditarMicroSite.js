import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CustomCSSMicroSite.css';
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário

export default function EditarMicroSite() {
    const [microsite, setMicrosite] = useState({
        titulo: '',
        texto: '',
        link_google_play: '',
        link_app_store: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Substitua '1' pelo ID do microsite que você deseja editar
        axios.get(API_BASE_URL + 'microsite/1')
            .then(response => {
                setMicrosite(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do microsite:', error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMicrosite(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Deseja salvar as alterações?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, salvar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(API_BASE_URL + 'microsite/update/1', microsite)
                    .then(response => {
                        Swal.fire(
                            'Salvo!',
                            'Os dados foram atualizados com sucesso.',
                            'success'
                        );
                    })
                    .catch(error => {
                        Swal.fire(
                            'Erro!',
                            'Ocorreu um erro ao atualizar os dados.',
                            'error'
                        );
                        console.error('Erro ao atualizar dados do microsite:', error);
                    });
            }
        });
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="segunda">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        className="form-control"
                        name="titulo"
                        value={microsite.titulo}
                        onChange={handleChange}
                    />
                    <div id="emailHelp" className="form-text">Este vai ser o título presente no micro-site.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Texto</label>
                    <textarea
                        className="form-control"
                        name="texto"
                        rows="4" // Define a altura do textarea
                        value={microsite.texto}
                        onChange={handleChange}
                    />
                    <div id="emailHelp" className="form-text">Este vai ser o texto que vai ficar por baixo do título.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Link Google Play</label>
                    <input
                        className="form-control"
                        name="link_google_play"
                        value={microsite.link_google_play}
                        onChange={handleChange}
                    />
                    <div id="emailHelp" className="form-text">Este é o link que vai ser guardado no botão "Google Play".</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Link App Store</label>
                    <input
                        className="form-control"
                        name="link_app_store"
                        value={microsite.link_app_store}
                        onChange={handleChange}
                    />
                    <div id="emailHelp" className="form-text">Este é o link que vai ser guardado no botão "App Store".</div>
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
}
