import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_BASE_URL from '../../config';
import '../../assets/CustomCSS.css';

export default function PedidoFerias() {
    const [feriasData, setFeriasData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const itemsPerPage = 10; // Número de itens por página

    useEffect(() => {
        const fetchFerias = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}ferias/pendentes`);
                setFeriasData(response.data);
            } catch (error) {
                console.error('Erro ao buscar os pedidos de férias:', error);
            }
        };

        fetchFerias();
    }, []);

    const atualizarEstadoFerias = async (idFerias, novoEstado, confirmacao) => {
        const result = await Swal.fire({
            title: confirmacao ? 'Tem a certeza?' : 'Confirmação!',
            text: confirmacao ? 'Esta ação será confirmada.' : 'Deseja realmente atualizar o estado?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmacao ? 'Sim, confirmar!' : 'Sim',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const response = await fetch(`${API_BASE_URL}ferias/estado/${idFerias}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_estado: novoEstado })
            });
            setFeriasData(feriasData.filter(feria => feria.id_ferias !== idFerias));

            Swal.fire('Sucesso!', 'O pedido foi atualizado.', 'success');
        }
    };

    // Calcular itens da página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = feriasData.slice(indexOfFirstItem, indexOfLastItem);

    // Função para alterar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Pedidos de Férias Pendentes</h1>
            <div className="table-responsive">
                <table className="table align-middle" style={{ boxShadow: '5px 5px 15px grey' }}>
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
                        {currentItems.map((item) => (
                            <tr key={item.id_ferias}>
                                <td>
                                    <img src={API_BASE_URL + 'uploads/' + item.utilizador.foto} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{item.utilizador?.nome || 'N/A'}</td>
                                <td>{item.data_inicio}</td>
                                <td>{item.data_fim}</td>
                                <td>
                                    <button
                                        className="btn p-1" style={{ color: 'green' }}
                                        onClick={() => atualizarEstadoFerias(item.id_ferias, 1, true)} // 1 = Aceito
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                    <button
                                        className="btn p-1" style={{ color: 'red' }}
                                        onClick={() => atualizarEstadoFerias(item.id_ferias, 2, false)} // 2 = Recusado
                                    >
                                        <FaTimes size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(feriasData.length / itemsPerPage)).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(number + 1)} className="page-link">
                                {number + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
