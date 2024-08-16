import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Utilizadores() {
    const utilizadoresData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/50',
            nome: 'João Silva',
            email: 'joao.silva@example.com',
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Maria Santos',
            email: 'maria.santos@example.com',
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Carlos Pereira',
            email: 'carlos.pereira@example.com',
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Utilizadores</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Email</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilizadoresData.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>
                                    <img src={usuario.imagem} alt="User" className="rounded-circle" width="50" height="50" />
                                </td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
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
