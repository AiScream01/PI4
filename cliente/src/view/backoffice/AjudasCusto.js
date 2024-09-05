import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';
import Swal from 'sweetalert2';
import API_BASE_URL from "../../config";

export default function Ajudas() {
    const [ajudasData, setAjudasData] = useState([]);

    useEffect(() => {
        const fetchAjudasPendentes = async () => {
            try {
                const response = await fetch(API_BASE_URL + "ajudascusto/pendentes");

                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }

                const data = await response.json();
                
                setAjudasData(data);
            } catch (error) {
                console.error('Erro ao buscar ajudas de custo:', error);
            }
        };

        fetchAjudasPendentes();
    }, []);

    const handleUpdateStatus = async (id_custo, novoEstado, confirmacao) => {
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
            const response = await fetch(API_BASE_URL + `ajudascusto/estado/${id_custo}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_estado: novoEstado })
            });

            
                setAjudasData(ajudasData.filter(ajuda => ajuda.id_custo !== id_custo));
                Swal.fire('Sucesso!', 'O pedido foi atualizado.', 'success');
           
        } catch (error) {
            alert("erro2");
            Swal.fire('Erro!', 'Ocorreu um erro ao tentar atualizar o pedido.', 'error');
        }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Ajudas de Custo Pendentes</h1>
            <div className="table-responsive">
                <table className="table align-middle" style={{boxShadow: '5px 5px 15px grey'}}>
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Custo</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Comprovativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ajudasData.map((ajuda) => (
                            <tr key={ajuda.id_custo}>
                                <td>
                                    <img src={API_BASE_URL + 'uploads/'+ ajuda.utilizador.foto} alt="User"  className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{ajuda.utilizador.nome}</td>
                                <td>{ajuda.custo}</td>
                                <td>{ajuda.descricao}</td>
                                <td>
                                    <a href={API_BASE_URL + 'uploads'+ ajuda.comprovativo} download className="text-decoration-none">
                                        <FaFilePdf className="me-2" /> {ajuda.comprovativo}
                                    </a>
                                </td>
                                <td>
                                    <button
                                        className="btn p-1"
                                        style={{ color: 'green' }}
                                        onClick={() => handleUpdateStatus(ajuda.id_custo, 1)} // 1 = Aceite
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        className="btn p-1 ms-2"
                                        style={{ color: 'red' }}
                                        onClick={() => handleUpdateStatus(ajuda.id_custo, 2)} // 2 = Rejeitado
                                    >
                                        <FaTimes />
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
