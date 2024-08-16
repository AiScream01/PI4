import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function PedidoFerias() {
    const feriasData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/50',
            nome: 'João Silva',
            dataInicio: '2024-09-01',
            dataFim: '2024-09-15',
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Maria Santos',
            dataInicio: '2024-09-05',
            dataFim: '2024-09-20',
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Carlos Pereira',
            dataInicio: '2024-10-01',
            dataFim: '2024-10-15',
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Pedido de Férias</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Data Início</th>
                            <th scope="col">Data Fim</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feriasData.map((ferias) => (
                            <tr key={ferias.id}>
                                <td>
                                    <img src={ferias.imagem} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{ferias.nome}</td>
                                <td>{ferias.dataInicio}</td>
                                <td>{ferias.dataFim}</td>
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
