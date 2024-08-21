import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário

export default function Utilizadores() {
    const [utilizadoresData, setUtilizadoresData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState({ id_user: '', nome: '', email: '', imagem: '', tipo: '' });
    const [newUsuario, setNewUsuario] = useState({ nome: '', email: '', imagem: '', palavrapasse: '', tipo: '' });

    useEffect(() => {
        const fetchUtilizadores = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'utilizador/');
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados dos utilizadores');
                }
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
        setShowEditModal(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(API_BASE_URL + `utilizador/update/${selectedUsuario.id_user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedUsuario)
            });

            if (response.ok) {
                const updatedUsuario = await response.json();
                setUtilizadoresData(utilizadoresData.map(usuario =>
                    usuario.id_user === selectedUsuario.id_user ? updatedUsuario : usuario
                ));
                setShowEditModal(false);
                Swal.fire('Sucesso!', 'Os dados do utilizador foram atualizados.', 'success');
            } else {
                Swal.fire('Erro!', 'Não foi possível atualizar os dados do utilizador.', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar o utilizador:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao tentar atualizar o utilizador.', 'error');
        }
    };

    const handleSaveAdd = async () => {
        try {
            const response = await fetch(API_BASE_URL + 'utilizador/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUsuario)
            });
            const responseBody = await response.json();
            console.log('Resposta da API:', responseBody);

            if (response.ok) {
                const createdUsuario = await response.json();
                setUtilizadoresData([...utilizadoresData, createdUsuario]);
                setShowAddModal(false);
                Swal.fire('Sucesso!', 'O novo utilizador foi adicionado.', 'success');
            } else {
                Swal.fire('Erro!', 'Não foi possível adicionar o novo utilizador.', 'error');
            }
        } catch (error) {
            console.error('Erro ao adicionar o utilizador:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao tentar adicionar o utilizador.', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUsuario({ ...selectedUsuario, [name]: value });
    };

    const handleNewInputChange = (e) => {
        const { name, value } = e.target;
        setNewUsuario({ ...newUsuario, [name]: value });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Utilizadores</h2>
            <button className="btn btn-primary mb-4" onClick={() => setShowAddModal(true)}>
                <FaPlus /> Adicionar Utilizador
            </button>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Email</th>
                            <th scope="col">Tipo</th>
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
                                <td>{usuario.TiposUtilizador ? usuario.TiposUtilizador.tipo : 'Desconhecido'}</td> {/* Correção aqui */}
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
            {showEditModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Utilizador</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
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
                                <div className="mb-3">
                                    <label htmlFor="tipo" className="form-label">Tipo</label>
                                    <select
                                        className="form-select"
                                        id="tipo"
                                        name="tipo"
                                        value={selectedUsuario.tipo}
                                        onChange={handleInputChange}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imagem" className="form-label">Imagem URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imagem"
                                        name="imagem"
                                        value={selectedUsuario.imagem}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Adição */}
            {showAddModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Adicionar Utilizador</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        name="nome"
                                        value={newUsuario.nome}
                                        onChange={handleNewInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={newUsuario.email}
                                        onChange={handleNewInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="palavrapasse" className="form-label">Palavra-passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="palavrapasse"
                                        name="palavrapasse"
                                        value={newUsuario.palavrapasse}
                                        onChange={handleNewInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tipo" className="form-label">Tipo</label>
                                    <select
                                        className="form-select"
                                        id="tipo"
                                        name="tipo"
                                        value={newUsuario.tipo}
                                        onChange={handleNewInputChange}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imagem" className="form-label">Imagem URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imagem"
                                        name="imagem"
                                        value={newUsuario.imagem}
                                        onChange={handleNewInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveAdd}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
