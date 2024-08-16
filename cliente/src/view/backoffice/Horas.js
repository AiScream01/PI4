import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';

export default function Horas() {
    const horasData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/50',
            nome: 'João Silva',
            comprovativo: 'horas1.pdf'
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Maria Santos',
            comprovativo: 'horas2.pdf'
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Carlos Pereira',
            comprovativo: 'horas3.pdf'
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Horas</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Comprovativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horasData.map((hora) => (
                            <tr key={hora.id}>
                                <td>
                                    <img src={hora.imagem} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{hora.nome}</td>
                                <td>
                                    <a href={`/path/to/comprovativos/${hora.comprovativo}`} download className="text-decoration-none">
                                        <FaFilePdf className="me-2" /> {hora.comprovativo}
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
