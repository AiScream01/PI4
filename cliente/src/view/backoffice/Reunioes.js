import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
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

    const atualizarEstadoReuniao = async (idReuniao, novoEstado) => {
        try {
            const response = await axios.put(`${API_BASE_URL}reunioes/estado/update/${novoEstado}/${idReuniao}`);
            console.log('Estado atualizado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar estado:', error);
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
