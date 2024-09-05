import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';
import axios from 'axios';
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário
import Swal from 'sweetalert2';

export default function Horas() {
    const [horasData, setHorasData] = useState([]);

    useEffect(() => {
        const fetchHoras = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}horas/pendentes`);
                setHorasData(response.data);
            } catch (error) {
                console.error('Erro ao buscar as horas:', error);
            }
        };

        fetchHoras();
    }, []);

    const atualizarEstadoHoras = async (idHoras, novoEstado, confirmacao) => {
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

            const response = await fetch(`${API_BASE_URL}horas/estado/${idHoras}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_estado: novoEstado })
            });
            setHorasData(horasData.filter(hora => hora.id_horas !== idHoras));

            Swal.fire('Sucesso!', 'O pedido foi atualizado.', 'success');
            
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Horas Pendentes</h1>
            <div className="table-responsive">
                <table className="table align-middle" style={{boxShadow: '5px 5px 15px grey'}}>
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Número de Horas</th>
                            <th scope="col">Comprovativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horasData.map((hora) => (
                            <tr key={hora.id_horas}>
                                <td>
                                    <img src={hora.utilizador.foto} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{hora.utilizador.nome}</td>
                                <td>{hora.horas}</td>
                                <td>
                                    <a href={`/path/to/comprovativos/${hora.comprovativo}`} download className="text-decoration-none">
                                        <FaFilePdf className="me-2" /> {hora.comprovativo}
                                    </a>
                                </td>
                                <td>
                                    <button
                                        className="btn p-1"
                                        style={{ color: 'green' }}
                                        onClick={() => atualizarEstadoHoras(hora.id_horas, 1, 'Tem certeza de que deseja aceitar esta solicitação de horas?')}
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                    <button
                                        className="btn p-1"
                                        style={{ color: 'red' }}
                                        onClick={() => atualizarEstadoHoras(hora.id_horas, 2, 'Tem certeza de que deseja recusar esta solicitação de horas?')}
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
