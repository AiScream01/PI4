import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function Noticias() {
    const noticiasData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/100x100',
            titulo: 'Novo Projeto em Desenvolvimento',
            descricao: 'A nossa equipe está a desenvolver um novo projeto para a plataforma interna.'
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/100x100',
            titulo: 'Conferência Anual',
            descricao: 'A conferência anual será realizada na próxima semana com todos os colaboradores.'
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/100x100',
            titulo: 'Nova Parceria Fechada',
            descricao: 'Firmamos uma nova parceria com uma empresa de tecnologia inovadora.'
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Noticias</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticiasData.map((noticia) => (
                            <tr key={noticia.id}>
                                <td>
                                    <img src={noticia.imagem} alt="Imagem da Notícia" className="img-thumbnail" width="100" height="100" />
                                </td>
                                <td>{noticia.titulo}</td>
                                <td>{noticia.descricao}</td>
                                <td>
                                    <button className="btn p-1 me-2" style={{ color: 'blue' }}>
                                        <FaEdit size={20} />
                                    </button>
                                    <button className="btn p-1" style={{ color: 'red' }}>
                                        <FaTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
