import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Parcerias() {
    const parceriasData = [
        {
            id: 1,
            imagem: 'https://via.placeholder.com/150',
            nome: 'Parceria A',
        },
        {
            id: 2,
            imagem: 'https://via.placeholder.com/150',
            nome: 'Parceria B',
        },
        {
            id: 3,
            imagem: 'https://via.placeholder.com/150',
            nome: 'Parceria C',
        },
        {
            id: 4,
            imagem: 'https://via.placeholder.com/150',
            nome: 'Parceria D',
        },
        {
            id: 5,
            imagem: 'https://via.placeholder.com/150',
            nome: 'Parceria E',
        },
        {
            id: 6,
            imagem: 'https://via.placeholder.com/150',
            nome: 'Parceria F',
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Parcerias</h2>
            <div className="row">
                {parceriasData.map((parceria) => (
                    <div className="col-6 col-md-3 mb-4" key={parceria.id}>
                        <div className="text-center">
                            <img
                                src={parceria.imagem}
                                alt={parceria.nome}
                                className="img-fluid mb-2"
                                style={{ maxHeight: '150px', objectFit: 'cover' }}
                            />
                            <div>
                                <button className="btn p-1 me-2" style={{ color: 'blue' }}>
                                    <FaEdit size={20} />
                                </button>
                                <button className="btn p-1" style={{ color: 'red' }}>
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
