import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFileDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_BASE_URL from '../../config';
import '../../assets/CustomCSS.css';

export default function Faltas() {
    const [faltasData, setFaltasData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const itemsPerPage = 10; // Número de itens por página

    useEffect(() => {
        const fetchFaltas = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}faltas/pendentes`);
                setFaltasData(response.data);
            } catch (error) {
                console.error('Erro ao buscar as faltas:', error);
            }
        };

        fetchFaltas();
    }, []);

    const atualizarEstadoFaltas = async (idFalta, novoEstado) => {
        const result = await Swal.fire({
            title: 'Tem a certeza?',
            text: 'Deseja realmente atualizar o estado?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}faltas/estado/${idFalta}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_estado: novoEstado })
                });

                if (response.ok) {
                    setFaltasData(faltasData.filter(falta => falta.id_falta !== idFalta));
                    Swal.fire('Sucesso!', 'O pedido foi atualizado.', 'success');
                } else {
                    throw new Error('Erro ao atualizar o estado da falta.');
                }
            } catch (error) {
                Swal.fire('Erro!', 'Não foi possível atualizar o pedido. ' + error, 'error');
            }
        }
    };

    // Calcular os itens da página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = faltasData.slice(indexOfFirstItem, indexOfLastItem);

    // Função para mudar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Faltas Pendentes</h1>
            <div className="table-responsive">
                <table className="table align-middle" style={{ boxShadow: '5px 5px 15px grey' }}>
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Data</th>
                            <th scope="col">Justificação</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((falta) => (
                            <tr key={falta.id_falta}>
                                <td>
                                    <img src={API_BASE_URL + 'uploads/' + falta.utilizador.foto} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{falta.utilizador.nome}</td>
                                <td>{new Date(falta.data).toLocaleDateString()}</td>
                                <td>
                                    <a href={API_BASE_URL + 'uploads/' + falta.justificacao} download className="text-decoration-none">
                                        <FaFileDownload className="me-2" /> {falta.justificacao}
                                    </a>
                                </td>
                                <td>
                                    <button 
                                        className="btn p-1" 
                                        style={{ color: 'green' }} 
                                        onClick={() => atualizarEstadoFaltas(falta.id_falta, 1)} // Aceitar
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                    <button 
                                        className="btn p-1 ms-2" 
                                        style={{ color: 'red' }} 
                                        onClick={() => atualizarEstadoFaltas(falta.id_falta, 2)} // Recusar
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
                    {[...Array(Math.ceil(faltasData.length / itemsPerPage)).keys()].map(number => (
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
