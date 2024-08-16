import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';

export default function Ajudas() {
    const ajudasData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/50',
            nome: 'João Silva',
            custo: '50€',
            descricao: 'Compra de material de escritório',
            comprovativo: 'comprovativo1.pdf'
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Maria Santos',
            custo: '100€',
            descricao: 'Reembolso de viagem',
            comprovativo: 'comprovativo2.pdf'
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Carlos Pereira',
            custo: '75€',
            descricao: 'Refeição com cliente',
            comprovativo: 'comprovativo3.pdf'
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Ajudas</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Custo</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Comprovativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ajudasData.map((ajuda) => (
                            <tr key={ajuda.id}>
                                <td>
                                    <img src={ajuda.imagem} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{ajuda.nome}</td>
                                <td>{ajuda.custo}</td>
                                <td>{ajuda.descricao}</td>
                                <td>
                                    <a href={`/path/to/comprovativos/${ajuda.comprovativo}`} download className="text-decoration-none">
                                        <FaFilePdf className="me-2" /> {ajuda.comprovativo}
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
