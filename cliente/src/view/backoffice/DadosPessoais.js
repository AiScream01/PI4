import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DadosPessoais() {
    const dadosPessoaisData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/50',
            nome: 'João Silva',
            pedido: 'Alteração de endereço',
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Maria Santos',
            pedido: 'Atualização de número de telefone',
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Carlos Pereira',
            pedido: 'Mudança de estado civil',
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Dados Pessoais</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Pedido</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosPessoaisData.map((dados) => (
                            <tr key={dados.id}>
                                <td>
                                    <img src={dados.imagem} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{dados.nome}</td>
                                <td>{dados.pedido}</td>
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
