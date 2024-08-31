import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import API_BASE_URL from '../../config'; // Ajuste o caminho conforme necessário

export default function Parcerias() {
    const [parceriasData, setParceriasData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedParceria, setSelectedParceria] = useState({ id_parceria: '', titulo: '', descricao: '', categoria: '', logotipo: '' });
    const [newParceria, setNewParceria] = useState({ titulo: '', descricao: '', categoria: '', logotipo: '' });

    useEffect(() => {
        const fetchParcerias = async () => {
            try {
                const response = await fetch(API_BASE_URL + 'protocolosparceria/'); // Ajuste a URL conforme necessário
                if (!response.ok) {
                    throw new Error('Erro ao buscar parcerias');
                }
                const data = await response.json();
                setParceriasData(data);
            } catch (error) {
                console.error('Erro ao buscar parcerias:', error);
            }
        };

        fetchParcerias();
    }, []);

    const handleDelete = async (id_parceria) => {
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
                const response = await fetch(API_BASE_URL + `protocolosparceria/delete/${id_parceria}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    Swal.fire('Apagado!', 'A parceria foi apagada.', 'success');
                    setParceriasData(parceriasData.filter(parceria => parceria.id_parceria !== id_parceria));
                } else {
                    Swal.fire('Erro!', 'Não foi possível apagar a parceria.', 'error');
                }
            } catch (error) {
                console.error('Erro ao apagar a parceria:', error);
                Swal.fire('Erro!', 'Ocorreu um erro ao tentar apagar a parceria.', 'error');
            }
        }
    };

    const handleEdit = (parceria) => {
        setSelectedParceria(parceria);
        setShowEditModal(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(API_BASE_URL + `protocolosparceria/update/${selectedParceria.id_parceria}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedParceria)
            });

            if (response.ok) {
                const updatedParceria = await response.json();
                setParceriasData(parceriasData.map(parceria =>
                    parceria.id_parceria === selectedParceria.id_parceria ? updatedParceria : parceria
                ));
                setShowEditModal(false);
                Swal.fire('Sucesso!', 'Os dados da parceria foram atualizados.', 'success');
            } else {
                Swal.fire('Erro!', 'Não foi possível atualizar os dados da parceria.', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar a parceria:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao tentar atualizar a parceria.', 'error');
        }
    };

    const handleSaveAdd = async () => {
        try {
            const response = await fetch(API_BASE_URL + 'protocolosparceria/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newParceria)
            });

            if (response.ok) {
                const createdParceria = await response.json();
                setParceriasData([...parceriasData, createdParceria]);
                setShowAddModal(false);
                Swal.fire('Sucesso!', 'A nova parceria foi adicionada.', 'success');
            } else {
                Swal.fire('Erro!', 'Não foi possível adicionar a nova parceria.', 'error');
            }
        } catch (error) {
            console.error('Erro ao adicionar a parceria:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao tentar adicionar a parceria.', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedParceria({ ...selectedParceria, [name]: value });
    };

    const handleNewInputChange = (e) => {
        const { name, value } = e.target;
        setNewParceria({ ...newParceria, [name]: value });
    };

    return (
        <div className="container mt-5">
<div className="d-flex justify-content-between align-items-center mb-4">
    <h1 className="mb-0">Parcerias</h1>
    <button
        className="btn btn-primary"
        onClick={() => setShowAddModal(true)}
        style={{ backgroundColor: "#1ED700", borderColor: "#1ED700" }}
    >
        <FaPlus /> Adicionar Parceria
    </button>
</div>
<div className='justify-content-top align-items-center border rounded-2 d-flex flex-column ' style={{width: "80%", backgroundColor: '#FFFFFF'}}>

            <div className="row">
                {parceriasData.map((parceria) => (
                    <div className="col-6 col-md-3 mb-4" key={parceria.id_parceria}>
                        <div className="text-center">
                            <img
                                src={parceria.logotipo} // Adicione uma imagem padrão se necessário
                                alt={parceria.titulo}
                                className="img-fluid mb-2"
                                style={{ maxHeight: '150px', objectFit: 'cover' }}
                            />
                            <div className="mb-2">
                                <strong>{parceria.titulo}</strong> {/* Nome da parceria */}
                            </div>
                            <div>
                                <button className="btn p-1 me-2" style={{ color: 'blue' }} onClick={() => handleEdit(parceria)}>
                                    <FaEdit size={20} />
                                </button>
                                <button className="btn p-1" style={{ color: 'red' }} onClick={() => handleDelete(parceria.id_parceria)}>
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            {/* Modal de Edição */}
            {showEditModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Parceria</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="titulo" className="form-label">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titulo"
                                        name="titulo"
                                        value={selectedParceria.titulo}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label">Descrição</label>
                                    <textarea
                                        className="form-control"
                                        id="descricao"
                                        name="descricao"
                                        value={selectedParceria.descricao}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoria" className="form-label">Categoria</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="categoria"
                                        name="categoria"
                                        value={selectedParceria.categoria}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="logotipo" className="form-label">Logotipo URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="logotipo"
                                        name="logotipo"
                                        value={selectedParceria.logotipo}
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
                                <h5 className="modal-title">Adicionar Nova Parceria</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="titulo" className="form-label">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titulo"
                                        name="titulo"
                                        value={newParceria.titulo}
                                        onChange={handleNewInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label">Descrição</label>
                                    <textarea
                                        className="form-control"
                                        id="descricao"
                                        name="descricao"
                                        value={newParceria.descricao}
                                        onChange={handleNewInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoria" className="form-label">Categoria</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="categoria"
                                        name="categoria"
                                        value={newParceria.categoria}
                                        onChange={handleNewInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="logotipo" className="form-label">Logotipo URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="logotipo"
                                        name="logotipo"
                                        value={newParceria.logotipo}
                                        onChange={handleNewInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveAdd}>Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
