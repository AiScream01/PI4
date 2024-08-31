import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotificacoesPush() {
    const notificacoesData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/50',
            nome: 'João Silva',
            movimento: 'Novo comentário em sua postagem',
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Maria Santos',
            movimento: 'Você foi mencionado em uma mensagem',
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/50',
            nome: 'Carlos Pereira',
            movimento: 'Seu relatório foi aprovado',
        }
    ];

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Notificações Push</h1>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Movimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notificacoesData.map((notificacao) => (
                            <tr key={notificacao.id}>
                                <td>
                                    <img src={notificacao.imagem} alt="User" className="rounded-circle" width="50" height="50" />
                                </td>
                                <td>{notificacao.nome}</td>
                                <td>{notificacao.movimento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
