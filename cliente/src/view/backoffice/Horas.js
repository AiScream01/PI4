import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';
import axios from 'axios';
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário

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

    const atualizarEstadoHoras = async (idHoras, novoEstado) => {
        try {
            const response = await axios.put(`${API_BASE_URL}horas/estado/update/${novoEstado}/${idHoras}`);
            console.log('Estado atualizado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar estado:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Horas Pendentes</h2>
            <div className="table-responsive">
                <table className="table align-middle">
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
                                        onClick={() => atualizarEstadoHoras(hora.id_horas, 1)} // Aceitar
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                    <button 
                                        className="btn p-1" 
                                        style={{ color: 'red' }} 
                                        onClick={() => atualizarEstadoHoras(hora.id_horas, 2)} // Recusar
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
