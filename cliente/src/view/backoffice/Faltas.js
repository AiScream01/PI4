import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFileDownload } from 'react-icons/fa';
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

    const atualizarEstadoFaltas = async (idFalta, novoEstado) => {
        try {
            const response = await axios.put(`${API_BASE_URL}faltas/estado/update/${novoEstado}/${idFalta}`);
            console.log('Estado atualizado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar estado:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Faltas Pendentes</h2>
            <div className="table-responsive">
                <table className="table align-middle">
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
