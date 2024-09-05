import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário

export default function PedidoFerias() {
    const [feriasData, setFeriasData] = useState([]);

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

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Pedidos de Férias Pendentes</h1>
            <div className="table-responsive" >
                <table className="table align-middle" style={{boxShadow: '5px 5px 15px grey'}}>
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
                        {feriasData.map((item) => (
                            <tr key={item.id_ferias}>
                                <td>
                                    <img src={item.utilizador.foto} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{item.utilizador?.nome || 'N/A'}</td> {/* Supondo que 'utilizador' é um objeto com o nome */}
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
        </div>
    );
}
