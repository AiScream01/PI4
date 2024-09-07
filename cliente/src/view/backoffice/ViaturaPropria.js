import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário
import '../../assets/CustomCSS.css';

export default function ViaturaPropria() {
    const [viaturaData, setViaturaData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const itemsPerPage = 10; // Número de itens por página

    useEffect(() => {
        const fetchViaturaData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}despesasviatura/pendentes`);
                setViaturaData(response.data);
            } catch (error) {
                console.error('Erro ao buscar as despesas de viatura pessoal:', error);
            }
        };

        fetchViaturaData();
    }, []);

    const atualizarEstadoDespesa = async (idDespesa, novoEstado) => {
        const result = await Swal.fire({
            title: 'Confirmação!',
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
                const response = await fetch(`${API_BASE_URL}despesasviatura/estado/${idDespesa}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_estado: novoEstado })
                });

                if (response.ok) {
                    setViaturaData(viaturaData.filter(despesa => despesa.id_despesa !== idDespesa));
                    Swal.fire('Sucesso!', 'A despesa foi atualizada.', 'success');
                } else {
                    throw new Error('Erro ao atualizar o estado');
                }
            } catch (error) {
                Swal.fire('Erro!', 'Ocorreu um erro ao tentar atualizar o pedido.', 'error');
            }
        }
    };

    // Calcular os itens da página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = viaturaData.slice(indexOfFirstItem, indexOfLastItem);

    // Função para mudar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Despesas de Viatura Própria</h1>
            <div className="table-responsive">
                <table className="table align-middle" style={{ boxShadow: '5px 5px 15px grey' }}>
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Km</th>
                            <th scope="col">Ponto de Partida</th>
                            <th scope="col">Ponto de Chegada</th>
                            <th scope="col">Portagens</th>
                            <th scope="col">Comprovativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((viatura) => (
                            <tr key={viatura.id_despesa}>
                                <td>
                                    <img src={API_BASE_URL + 'uploads/' + viatura.utilizador.foto} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{viatura.utilizador.nome}</td>
                                <td>{viatura.km}</td>
                                <td>{viatura.ponto_partida}</td>
                                <td>{viatura.ponto_chegada}</td>
                                <td>{viatura.preco_portagens}</td>
                                <td>{viatura.comprovativo}</td>
                                <td>
                                    <button 
                                        className="btn p-1" 
                                        style={{ color: 'green' }} 
                                        onClick={() => atualizarEstadoDespesa(viatura.id_despesa, 1)} // Aceitar
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                    <button 
                                        className="btn p-1 ms-2" 
                                        style={{ color: 'red' }} 
                                        onClick={() => atualizarEstadoDespesa(viatura.id_despesa, 2)} // Recusar
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
                    {[...Array(Math.ceil(viaturaData.length / itemsPerPage)).keys()].map(number => (
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
