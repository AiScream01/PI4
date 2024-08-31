import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário

export default function ViaturaPropria() {
    const [viaturaData, setViaturaData] = useState([]);

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

    const atualizarEstadoDespesa = async (idDespesa, novoEstado, confirmacao) => {
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
                const response = await axios.put(`${API_BASE_URL}despesasviatura/estado/${idDespesa}`, { id_estado: novoEstado });
                console.log('Estado atualizado com sucesso:', response.data);

                // Remove a despesa atualizada da lista local
                setViaturaData(viaturaData.filter(despesa => despesa.id_despesa !== idDespesa));

                Swal.fire('Sucesso!', 'A despesa foi atualizada.', 'success');
            } catch (error) {
                console.error('Erro ao atualizar estado:', error);
                Swal.fire('Erro!', 'Não foi possível atualizar a despesa.', 'error');
            }
        }
    };


    return (
        <div className="container mt-5">
            <h1 className="mb-4">Despesas de Viatura Própria</h1>
            <div className="table-responsive">
                <table className="table align-middle" style={{boxShadow: '10px 10px 15px grey'}}>
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Km</th>
                            <th scope="col">Ponto de Partida</th>
                            <th scope="col">Ponto de Chegada</th>
                            <th scope="col">Portagens</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viaturaData.map((viatura) => (
                            <tr key={viatura.id_despesa}>
                                <td>
                                    <img src={viatura.utilizador.foto} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{viatura.utilizador.nome}</td>
                                <td>{viatura.km}</td>
                                <td>{viatura.ponto_partida}</td>
                                <td>{viatura.ponto_chegada}</td>
                                <td>{viatura.preco_portagens}</td>
                                <td>
                                    <button 
                                        className="btn p-1" 
                                        style={{ color: 'green' }} 
                                        onClick={() => atualizarEstadoDespesa(viatura.id_despesa, 1)} // Aceitar
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                    <button 
                                        className="btn p-1" 
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
        </div>
    );
}
