import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from "../../config";

export default function Solicitacoes() {
    const [solicitacoesData, setSolicitacoesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const itemsPerPage = 10; // Número de itens por página

    useEffect(() => {
        const fetchSolicitacoesPendentes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}solicitacoes/`);
                setSolicitacoesData(response.data);
            } catch (error) {
                console.error('Erro ao buscar solicitações de perfil:', error);
            }
        };
    
        fetchSolicitacoesPendentes();
    }, []);

    const handleUpdateStatus = async (id_solicitacao, novoEstado, confirmacao) => {
        const result = await Swal.fire({
            title: confirmacao ? 'Tem a certeza?' : 'Confirmação!',
            text: confirmacao ? 'Esta ação será confirmada.' : 'Deseja realmente atualizar o estado?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ED700',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmacao ? 'Sim, confirmar!' : 'Sim',
            cancelButtonText: 'Cancelar'
        });
    
        if (result.isConfirmed) {
            try {
                const url = `${API_BASE_URL}solicitacoes/${novoEstado}/${id_solicitacao}`;
                const response = await axios.put(url);

                if (response.status === 200) {
                    setSolicitacoesData(solicitacoesData.filter(solicitacao => solicitacao.id !== id_solicitacao));
                    Swal.fire('Sucesso!', 'O pedido foi atualizado.', 'success');
                } else {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
            } catch (error) {
                Swal.fire('Erro!', 'Ocorreu um erro ao tentar atualizar o pedido.', 'error');
            }
        }
    };

    const formatDados = (dados) => {
        if (!dados) return 'Sem dados';
        return Object.entries(dados).map(([key, value]) => (
            <div key={key}>
                <strong>{key}:</strong> {key === 'palavrapasse' ? '****' : value}
            </div>
        ));
    };

    // Calcular os itens da página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = solicitacoesData.slice(indexOfFirstItem, indexOfLastItem);

    // Função para mudar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Solicitações de Alteração de Perfil</h1>
            <div className="table-responsive">
                <table className="table align-middle" style={{ boxShadow: '5px 5px 15px grey' }}>
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Dados Alterados</th>
                            <th scope="col">Data da Solicitação</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((solicitacao) => (
                            <tr key={solicitacao.id}>
                                <td>
                                    <img 
                                        src={API_BASE_URL + 'uploads/' + solicitacao.Utilizadore.foto} 
                                        alt="User" 
                                        className="rounded-circle" 
                                        width="40" 
                                        height="40" 
                                    />
                                </td>
                                <td>{solicitacao.dados ? solicitacao.dados.nome : 'Nome não disponível'}</td>
                                <td>{formatDados(solicitacao.dados)}</td>
                                <td>{new Date(solicitacao.data_solicitacao).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn p-1 me-2"
                                        style={{ color: 'green' }}
                                        onClick={() => handleUpdateStatus(solicitacao.id, 'aceito', true)}
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        className="btn p-1"
                                        style={{ color: 'red' }}
                                        onClick={() => handleUpdateStatus(solicitacao.id, 'recusado', false)}
                                    >
                                        <FaTimes />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginação */}
                <nav>
                    <ul className="pagination justify-content-center">
                        {[...Array(Math.ceil(solicitacoesData.length / itemsPerPage)).keys()].map(number => (
                            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(number + 1)} className="page-link">
                                    {number + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
