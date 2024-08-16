import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function Reunioes() {
    const reunioesData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/50',
            nome: 'João Silva',
            dia: '2024-08-20',
            hora: '10:00',
            assunto: 'Planejamento de Projeto',
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Maria Santos',
            dia: '2024-08-21',
            hora: '14:00',
            assunto: 'Revisão de Metas',
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Carlos Pereira',
            dia: '2024-08-22',
            hora: '09:00',
            assunto: 'Análise de Resultados',
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Reuniões</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Dia</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Assunto</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reunioesData.map((reuniao) => (
                            <tr key={reuniao.id}>
                                <td>
                                    <img src={reuniao.imagem} alt="User" className="rounded-circle" width="50" height="50" />
                                </td>
                                <td>{reuniao.nome}</td>
                                <td>{new Date(reuniao.dia).toLocaleDateString()}</td>
                                <td>{reuniao.hora}</td>
                                <td>{reuniao.assunto}</td>
                                <td>
                                    <button className="btn p-1 me-2" style={{ color: 'green' }}>
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
