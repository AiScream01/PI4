import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFileDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário

export default function Faltas() {
    const [faltasData, setFaltasData] = useState([]);

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

    const atualizarEstadoFaltas = async (idFalta, novoEstado, confirmacao) => {
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
                //try {
                    //const response = await axios.put(`${API_BASE_URL}faltas/estado/${idFalta}`, { id_estado: novoEstado });
                   // console.log('Estado atualizado com sucesso:', response.data);
                 
                    const response = await fetch(`${API_BASE_URL}faltas/estado/${idFalta}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id_estado: novoEstado })
                    });
                    setFaltasData(faltasData.filter(falta => falta.id_falta !== idFalta));

                    Swal.fire('Sucesso!', 'O pedido foi atualizado.', 'success');
                /*} catch (error) {
                    
                    Swal.fire('Erro!', 'Não foi possível atualizar o pedido.' + error, 'error');
                }*/
            }
        };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Faltas Pendentes</h1>
            <div className="table-responsive">
                <table className="table align-middle" style={{boxShadow: '5px 5px 15px grey'}}>
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
                        {faltasData.map((falta) => (
                            <tr key={falta.id_falta}>
                                <td>
                                    <img src={falta.utilizador.foto} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{falta.utilizador.nome}</td>
                                <td>{new Date(falta.data).toLocaleDateString()}</td>
                                <td>
                                    <a href={`/path/to/justificacoes/${falta.justificacao}`} download className="text-decoration-none">
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
                                        className="btn p-1" 
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
        </div>
    );
}
