import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário

export default function Reunioes() {
    const [reunioesData, setReunioesData] = useState([]);

    useEffect(() => {
        const fetchReunioes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}reunioes/pendentes`);
                setReunioesData(response.data);
            } catch (error) {
                console.error('Erro ao buscar as reuniões:', error);
            }
        };

        fetchReunioes();
    }, []);

    const atualizarEstadoReuniao = async (idReuniao, novoEstado, confirmacao) => {
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
            try {
                const response = await axios.put(`${API_BASE_URL}reunioes/estado/${idReuniao}`, { id_estado: novoEstado });
                console.log('Estado atualizado com sucesso:', response.data);

                setReunioesData(reunioesData.filter(reuniao => reuniao.id_reuniao !== idReuniao));

                Swal.fire('Sucesso!', 'O pedido foi atualizado.', 'success');
            } catch (error) {
                console.error('Erro ao atualizar estado:', error);
                Swal.fire('Erro!', 'Não foi possível atualizar o pedido.', 'error');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Reuniões Pendentes</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Dia</th>
                            <th scope="col">Assunto</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reunioesData.map((reuniao) => (
                            <tr key={reuniao.id_reuniao}>
                                <td>
                                    <img src={reuniao.utilizador.foto} alt="User" className="rounded-circle" width="50" height="50" />
                                </td>
                                <td>{reuniao.utilizador.nome}</td>
                                <td>{new Date(reuniao.data).toLocaleDateString()}</td>
                                <td>{reuniao.titulo}</td>
                                <td>
                                    <button 
                                        className="btn p-1 me-2" 
                                        style={{ color: 'green' }} 
                                        onClick={() => atualizarEstadoReuniao(reuniao.id_reuniao, 1)} // Aceitar
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                    <button 
                                        className="btn p-1" 
                                        style={{ color: 'red' }} 
                                        onClick={() => atualizarEstadoReuniao(reuniao.id_reuniao, 2)} // Recusar
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
