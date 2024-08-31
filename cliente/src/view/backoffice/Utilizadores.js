import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import API_BASE_URL from "../../config";

export default function Utilizadores() {
  const [utilizadoresData, setUtilizadoresData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState({
    id_user: "",
    nome: "",
    email: "",
    imagem: "",
    role: "",
  });
  const [newUsuario, setNewUsuario] = useState({
    nome: "",
    email: "",
    imagem: "",
    palavrapasse: "",
    role: "",
  });

  useEffect(() => {
    const fetchUtilizadores = async () => {
      try {
        const response = await fetch(API_BASE_URL + "utilizador/");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados dos utilizadores");
        }
        const data = await response.json();
        setUtilizadoresData(data);
      } catch (error) {
        console.error("Erro ao buscar dados dos utilizadores:", error);
      }
    };

    fetchUtilizadores();
  }, []);

  const handleDelete = async (id_user) => {
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
          API_BASE_URL + `utilizador/delete/${id_user}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire("Apagado!", "O utilizador foi apagado.", "success");
          setUtilizadoresData(
            utilizadoresData.filter((usuario) => usuario.id_user !== id_user)
          );
        } else {
          Swal.fire("Erro!", "Não foi possível apagar o utilizador.", "error");
        }
      } catch (error) {
        console.error("Erro ao apagar o utilizador:", error);
        Swal.fire(
          "Erro!",
          "Ocorreu um erro ao tentar apagar o utilizador.",
          "error"
        );
      }
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    const updatedUsuario = {
      ...selectedUsuario,
      role: selectedUsuario.role, // Role diretamente
    };
    try {
      const response = await fetch(
        API_BASE_URL + `utilizador/update/${selectedUsuario.id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUsuario),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setUtilizadoresData(
          utilizadoresData.map((usuario) =>
            usuario.id_user === selectedUsuario.id_user ? result : usuario
          )
        );
        setShowEditModal(false);
        Swal.fire(
          "Sucesso!",
          "Os dados do utilizador foram atualizados.",
          "success"
        );
      } else {
        Swal.fire(
          "Erro!",
          "Não foi possível atualizar os dados do utilizador.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar o utilizador:", error);
      Swal.fire(
        "Erro!",
        "Ocorreu um erro ao tentar atualizar o utilizador.",
        "error"
      );
    }
  };

  const handleSaveAdd = async () => {
    const newUsuarioWithRole = {
      nome: newUsuario.nome,
      email: newUsuario.email,
      imagem: newUsuario.imagem,
      palavrapasse: newUsuario.palavrapasse,
      role: newUsuario.role, // Role diretamente
    };

    console.log("Dados enviados para criação:", newUsuarioWithRole);

    try {
      const response = await fetch(API_BASE_URL + "utilizador/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUsuarioWithRole),
      });

      if (response.ok) {
        const result = await response.json();
        setUtilizadoresData([...utilizadoresData, result]);
        setShowAddModal(false);
        Swal.fire("Sucesso!", "O novo utilizador foi adicionado.", "success");
      } else {
        const errorText = await response.text(); // Obtenha a mensagem de erro do servidor
        console.error("Erro ao adicionar o utilizador:", errorText);
        Swal.fire(
          "Erro!",
          "Não foi possível adicionar o novo utilizador.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar o utilizador:", error);
      Swal.fire(
        "Erro!",
        "Ocorreu um erro ao tentar adicionar o utilizador.",
        "error"
      );
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Utilizadores</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
          style={{ backgroundColor: "#1ED700", borderColor: "#1ED700" }}
        >
          <FaPlus /> Adicionar Utilizador
        </button>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col"></th>
              <th scope="col">Colaborador</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {utilizadoresData.map((usuario) => (
              <tr key={usuario.id_user}>
                <td>
                  <img
                    src={usuario.imagem}
                    alt="User"
                    className="rounded-circle"
                    width="50"
                    height="50"
                  />
                </td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.role}</td> {/* Mostra o role diretamente */}
                <td>
                  <button
                    className="btn p-1 me-2"
                    style={{ color: "#008000" }}
                    onClick={() => handleEdit(usuario)}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="btn p-1"
                    style={{ color: "#d33" }}
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
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Utilizador</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
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
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
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
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={selectedUsuario.role}
                    onChange={handleInputChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Utilizador">Utilizador</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="imagem" className="form-label">
                    Imagem URL
                  </label>
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
                  Salvar
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
                <h5 className="modal-title">Adicionar Utilizador</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
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
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
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
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={newUsuario.role}
                    onChange={handleNewInputChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Utilizador">Utilizador</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="imagem" className="form-label">
                    Imagem URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imagem"
                    name="imagem"
                    value={newUsuario.imagem}
                    onChange={handleNewInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="palavrapasse" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="palavrapasse"
                    name="palavrapasse"
                    value={newUsuario.palavrapasse}
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
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
