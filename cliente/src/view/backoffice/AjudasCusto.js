import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';
import Swal from 'sweetalert2';
import url from '../../config'; // Certifique-se de ajustar o caminho conforme necessário

export default function Ajudas() {
    const [ajudasData, setAjudasData] = useState([]);

    useEffect(() => {
        const fetchAjudasPendentes = async () => {
            try {
                const response = await fetch(`${url}ajudascusto/pendentes`); // URL para listar ajudas pendentes

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

    const handleUpdateStatus = async (id_custo, novoEstado) => {
        try {
            const response = await fetch(`${url}ajudascusto/${id_custo}/estado`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_estado: novoEstado })
            });

            if (response.ok) {
                setAjudasData(ajudasData.filter(ajuda => ajuda.id_custo !== id_custo));
                Swal.fire('Sucesso!', 'O pedido foi atualizado.', 'success');
            } else {
                Swal.fire('Erro!', 'Não foi possível atualizar o pedido.', 'error');
            }
        } catch (error) {
            Swal.fire('Erro!', 'Ocorreu um erro ao tentar atualizar o pedido.', 'error');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Ajudas de Custo Pendentes</h2>
            <div className="table-responsive">
                <table className="table align-middle">
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
                                    <img src={ajuda.utilizador.foto || 'https://via.placeholder.com/50'} alt="User" className="rounded-circle" width="40" height="40" />
                                </td>
                                <td>{ajuda.utilizador.nome}</td>
                                <td>{ajuda.custo}</td>
                                <td>{ajuda.descricao}</td>
                                <td>
                                    <a href={`/path/to/comprovativos/${ajuda.comprovativo}`} download className="text-decoration-none">
                                        <FaFilePdf className="me-2" /> {ajuda.comprovativo}
                                    </a>
                                </td>
                                <td>
                                    <button
                                        className="btn p-1"
                                        style={{ color: 'green' }}
                                        onClick={() => handleUpdateStatus(ajuda.id_custo, 1)} // 1 = Aceite
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                    <button
                                        className="btn p-1"
                                        style={{ color: 'red' }}
                                        onClick={() => handleUpdateStatus(ajuda.id_custo, 2)} // 2 = Recusado
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
