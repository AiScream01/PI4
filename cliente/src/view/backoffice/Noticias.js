import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import API_BASE_URL from "../../config"; // Ajuste conforme necessário

export default function Noticias() {
  const [noticiasData, setNoticiasData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState({
    id_noticia: "",
    titulo: "",
    descricao: "",
    data: "",
    imagem: "",
  });
  const [newNoticia, setNewNoticia] = useState({
    titulo: "",
    descricao: "",
    data: "",
    imagem: "",
  });

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch(API_BASE_URL + "noticias/");
        if (!response.ok) {
          throw new Error("Erro ao buscar notícias");
        }
        const data = await response.json();
        setNoticiasData(data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };

    fetchNoticias();
  }, []);

  const handleDelete = async (id_noticia) => {
    const result = await Swal.fire({
      title: "Tem a certeza?",
      text: "Não poderá reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, apagar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          API_BASE_URL + `noticias/delete/${id_noticia}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire("Apagado!", "A notícia foi apagada.", "success");
          setNoticiasData(
            noticiasData.filter((noticia) => noticia.id_noticia !== id_noticia)
          );
        } else {
          Swal.fire("Erro!", "Não foi possível apagar a notícia.", "error");
        }
      } catch (error) {
        console.error("Erro ao apagar a notícia:", error);
        Swal.fire(
          "Erro!",
          "Ocorreu um erro ao tentar apagar a notícia.",
          "error"
        );
      }
    }
  };

  const handleEdit = (noticia) => {
    setSelectedNoticia(noticia);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        API_BASE_URL + `noticias/update/${selectedNoticia.id_noticia}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedNoticia),
        }
      );

      if (response.ok) {
        const updatedNoticia = await response.json();
        setNoticiasData(
          noticiasData.map((noticia) =>
            noticia.id_noticia === selectedNoticia.id_noticia
              ? updatedNoticia
              : noticia
          )
        );
        setShowEditModal(false);
        Swal.fire(
          "Sucesso!",
          "Os dados da notícia foram atualizados.",
          "success"
        );
      } else {
        Swal.fire(
          "Erro!",
          "Não foi possível atualizar os dados da notícia.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar a notícia:", error);
      Swal.fire(
        "Erro!",
        "Ocorreu um erro ao tentar atualizar a notícia.",
        "error"
      );
    }
  };

  const handleSaveAdd = async () => {
    try {
      const response = await fetch(API_BASE_URL + "noticias/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNoticia),
      });

      if (response.ok) {
        const createdNoticia = await response.json();
        setNoticiasData([...noticiasData, createdNoticia]);
        setShowAddModal(false);
        Swal.fire("Sucesso!", "A nova notícia foi adicionada.", "success");
      } else {
        Swal.fire(
          "Erro!",
          "Não foi possível adicionar a nova notícia.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar a notícia:", error);
      Swal.fire(
        "Erro!",
        "Ocorreu um erro ao tentar adicionar a notícia.",
        "error"
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedNoticia({ ...selectedNoticia, [name]: value });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewNoticia({ ...newNoticia, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Notícias</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
          style={{ backgroundColor: "#1ED700", borderColor: "#1ED700" }}
        >
          <FaPlus /> Adicionar Notícia
        </button>
      </div>
      <table className="table table-striped text-center align-middle">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {noticiasData.map((noticia) => (
            <tr key={noticia.id_noticia}>
              <td>
                <img
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  className="img-fluid"
                  style={{ maxHeight: "75px", objectFit: "cover" }}
                />
              </td>
              <td>{noticia.titulo}</td>
              <td>{noticia.descricao}</td>
              <td>{noticia.data}</td>
              <td>
                <FaEdit
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => handleEdit(noticia)}
                />
                <FaTrash
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(noticia.id_noticia)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edição */}
      {showEditModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Notícia</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowEditModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    value={selectedNoticia.titulo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea
                    className="form-control"
                    name="descricao"
                    value={selectedNoticia.descricao}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Data</label>
                  <input
                    type="date"
                    className="form-control"
                    name="data"
                    value={selectedNoticia.data}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Imagem</label>
                  <input
                    type="text"
                    className="form-control"
                    name="imagem"
                    value={selectedNoticia.imagem}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Adição */}
      {showAddModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Notícia</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowAddModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    value={newNoticia.titulo}
                    onChange={handleNewInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea
                    className="form-control"
                    name="descricao"
                    value={newNoticia.descricao}
                    onChange={handleNewInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Data</label>
                  <input
                    type="date"
                    className="form-control"
                    name="data"
                    value={newNoticia.data}
                    onChange={handleNewInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Imagem</label>
                  <input
                    type="text"
                    className="form-control"
                    name="imagem"
                    value={newNoticia.imagem}
                    onChange={handleNewInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveAdd}
                >
                  Adicionar Notícia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
