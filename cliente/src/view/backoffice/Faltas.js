import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFileDownload } from 'react-icons/fa';

export default function Faltas() {
    const faltasData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/50',
            nome: 'João Silva',
            data: '2024-08-10',
            justificacao: 'justificacao1.pdf'
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Maria Santos',
            data: '2024-08-11',
            justificacao: 'justificacao2.pdf'
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Carlos Pereira',
            data: '2024-08-12',
            justificacao: 'justificacao3.pdf'
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Faltas</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Data</th>
                            <th scope="col">Justificação</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faltasData.map((falta) => (
                            <tr key={falta.id}>
                                <td>
                                    <img src={falta.imagem} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{falta.nome}</td>
                                <td>{falta.data}</td>
                                <td>
                                    <a href={`/path/to/justificacoes/${falta.justificacao}`} download className="text-decoration-none">
                                        <FaFileDownload className="me-2" /> {falta.justificacao}
                                    </a>
                                </td>
                                <td>
                                    <button className="btn p-1" style={{ color: 'green' }}>
                                        <FaCheck size={20} />
                                    </button>
                                    <button className="btn p-1" style={{ color: 'red' }}>
                                        <FaTimes size={20} />
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
