import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import url from '../../config';

export default function PedidoFerias() {
    const [feriasData, setFeriasData] = useState([]);

    useEffect(() => {
        const fetchFerias = async () => {
            try {
                const response = await fetch(url + 'ferias'); // URL para listar todas as férias
                
                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }

                const texto = await response.text();
                console.log('Resposta do servidor:', texto);

                const data = JSON.parse(texto);
                console.log('Dados analisados:', data);

                // Filtrar apenas as férias com estado "Pendente" (id_estado === 3)
                const pendentes = data.filter(item => item.estado_ferias.id_estado === 3);
                setFeriasData(pendentes);
            } catch (error) {
                console.error('Erro ao buscar pedidos de férias:', error);
            }
        };

        fetchFerias();
    }, []);

    const handleUpdateStatus = async (id_ferias, newStatus) => {
        try {
            const response = await fetch(url + `estado_ferias/${id_ferias}/estado`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_estado: newStatus })
            });

            if (response.ok) {
                setFeriasData(feriasData.filter(ferias => ferias.ferias.id_ferias !== id_ferias));
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
            <h2 className="mb-4">Pedidos de Férias Pendentes</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Data Início</th>
                            <th scope="col">Data Fim</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feriasData.map((item) => (
                            <tr key={item.ferias.id_ferias}>
                                <td>{item.ferias.id_user}</td> {/* Aqui você deve substituir pelo nome do usuário, se disponível */}
                                <td>{item.ferias.data_inicio}</td>
                                <td>{item.ferias.data_fim}</td>
                                <td>
                                    <button
                                        className="btn p-1" style={{ color: 'green' }}
                                        onClick={() => handleUpdateStatus(item.ferias.id_ferias, 1)} // 1 = Aceite
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                    <button
                                        className="btn p-1" style={{ color: 'red' }}
                                        onClick={() => handleUpdateStatus(item.ferias.id_ferias, 2)} // 2 = Recusado
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
