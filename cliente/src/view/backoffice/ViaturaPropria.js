import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function ViaturaPropria() {
    const viaturaData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/50',
            nome: 'João Silva',
            km: '50 km',
            partida: 'Lisboa',
            chegada: 'Porto',
            portagens: '5.50€'
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Maria Santos',
            km: '100 km',
            partida: 'Coimbra',
            chegada: 'Lisboa',
            portagens: '10.00€'
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Carlos Pereira',
            km: '200 km',
            partida: 'Faro',
            chegada: 'Lisboa',
            portagens: '20.00€'
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Viatura Própria</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Km</th>
                            <th scope="col">Ponto de Partida</th>
                            <th scope="col">Ponto de Chegada</th>
                            <th scope="col">Portagens</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viaturaData.map((viatura) => (
                            <tr key={viatura.id}>
                                <td>
                                    <img src={viatura.imagem} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{viatura.nome}</td>
                                <td>{viatura.km}</td>
                                <td>{viatura.partida}</td>
                                <td>{viatura.chegada}</td>
                                <td>{viatura.portagens}</td>
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
