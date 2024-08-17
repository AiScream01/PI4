import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import API_BASE_URL from '../../config';

export default function Utilizadores() {
    const [utilizadoresData, setUtilizadoresData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState({ nome: '', email: '' });

    useEffect(() => {
        const fetchUtilizadores = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'utilizador/');
                const data = await response.json();
                setUtilizadoresData(data);
            } catch (error) {
                console.error('Erro ao buscar dados dos utilizadores:', error);
            }
        };

        fetchUtilizadores();
    }, []);

    const handleDelete = async (id_user) => {
        const result = await Swal.fire({
            title: 'Tem a certeza?',
            text: 'Não poderá reverter esta ação!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(API_BASE_URL + `utilizador/delete/${id_user}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    Swal.fire('Apagado!', 'O utilizador foi apagado.', 'success');
                    setUtilizadoresData(utilizadoresData.filter(usuario => usuario.id_user !== id_user));
                } else {
                    Swal.fire('Erro!', 'Não foi possível apagar o utilizador.', 'error');
                }
            } catch (error) {
                console.error('Erro ao apagar o utilizador:', error);
                Swal.fire('Erro!', 'Ocorreu um erro ao tentar apagar o utilizador.', 'error');
            }
        }
    };

    const handleEdit = (usuario) => {
        setSelectedUsuario(usuario);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(API_BASE_URL + `utilizador/update/${selectedUsuario.id_user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedUsuario)
            });

            if (response.ok) {
                setUtilizadoresData(utilizadoresData.map(usuario =>
                    usuario.id_user === selectedUsuario.id_user ? selectedUsuario : usuario
                ));
                setShowModal(false);
                Swal.fire('Sucesso!', 'Os dados do utilizador foram atualizados.', 'success');
            } else {
                Swal.fire('Erro!', 'Não foi possível atualizar os dados do utilizador.', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar o utilizador:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao tentar atualizar o utilizador.', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUsuario({ ...selectedUsuario, [name]: value });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Utilizadores</h2>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Email</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilizadoresData.map((usuario) => (
                            <tr key={usuario.id_user}>
                                <td>
                                    <img src={usuario.imagem || 'https://via.placeholder.com/50'} alt="User" className="rounded-circle" width="50" height="50" />
                                </td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <button
                                        className="btn p-1 me-2" style={{ color: '#008000' }}
                                        onClick={() => handleEdit(usuario)}
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                    <button
                                        className="btn p-1" style={{ color: '#d33' }}
                                        onClick={() => handleDelete(usuario.id_user)}
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Edição */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Utilizador</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        name="nome"
                                        value={selectedUsuario.nome}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={selectedUsuario.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSave}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
