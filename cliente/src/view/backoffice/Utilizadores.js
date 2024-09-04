import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import API_BASE_URL from "../../config";
import axios from "axios";

export default function Utilizadores() {
  const [utilizadoresData, setUtilizadoresData] = useState([]);

  // Estados para o modal de edição
  const [showEditModal, setShowEditModal] = useState(false);
  const [id_user, setId_user] = useState("");
  const [nomeEdit, setNomeEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [fotoEdit, setFotoEdit] = useState(null);
  const [roleEdit, setRoleEdit] = useState("");
  const [palavrapasseEdit, setPalavrapasseEdit] = useState("");

  // Estados para o modal de adição
  const [showAddModal, setShowAddModal] = useState(false);
  const [nomeAdd, setNomeAdd] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [fotoAdd, setFotoAdd] = useState(null);
  const [roleAdd, setRoleAdd] = useState("");
  const [palavrapasseAdd, setPalavrapasseAdd] = useState("");


  useEffect(() => {
    const fetchUtilizadores = async () => {
      try {
        const response = await fetch(API_BASE_URL + "utilizador/");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados dos utilizadores");
        }
        const data = await response.json();
        console.log(data)
        setUtilizadoresData(data);
      } catch (error) {
        console.error("Erro ao buscar dados dos utilizadores:", error);
      }
    };

    fetchUtilizadores();
  }, []);

  // Função para lidar com a mudança de arquivos
  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (isEdit) {
      setFotoEdit(file);
    } else {
      setFotoAdd(file);
    }
  };

// Função para enviar os dados do formulário
  const handleSubmit = async (e, isEdit = false) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      if (isEdit) {
        formData.append("nome", nomeEdit);
        formData.append("email", emailEdit);
        formData.append("role", roleEdit);

        console.log("fotoEdit",fotoEdit);
        console.log("fotoAdd",fotoAdd);

        if (fotoEdit) {
          formData.append("foto", fotoEdit);
        }
        const response = await axios.put(API_BASE_URL + `utilizador/update/${id_user}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setUtilizadoresData(
          utilizadoresData.map(utilizador =>
            utilizador.id_user === id_user ? 
            { ...utilizador, ...response?.data}
            : utilizador
          )
        );
        setShowEditModal(false);
        Swal.fire("Sucesso!", "O utilizador foi atualizado.", "success");
      } else {
        console.log("foto",fotoAdd);
        console.log("dados",nomeAdd, emailAdd, roleAdd);
        formData.append("nome", nomeAdd);
        formData.append("email", emailAdd);
        formData.append("role", roleAdd);
        formData.append("palavrapasse", palavrapasseAdd);

        if (fotoAdd) {
          formData.append("foto", fotoAdd);
        }

        // Logs para depuração
        console.log('FormData keys:', Array.from(formData.keys()));
        console.log('FormData values:', Array.from(formData.entries()));

        console.log('formData', formData);
        const response = await axios.post(API_BASE_URL + "utilizador/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        console.log('data1', response);
        setUtilizadoresData([...utilizadoresData,  response?.data ]);
        setShowAddModal(false);
        Swal.fire("Sucesso!", "O novo utilizador foi adicionado.", "success");
      }
    } catch (error) {
      console.error(isEdit ? "Erro ao atualizar utilizador:" : "Erro ao adicionar  utilizador:", error);
      Swal.fire("Erro!", "Ocorreu um erro ao tentar guardar o utilizador.", "error");
    }
  };


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
            utilizadoresData.filter((utilizador) => utilizador.id_user !== id_user)
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



    /*try {
      const response = await fetch(
        API_BASE_URL + `utilizador/update/${selectedUtilizador.id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUtilizador),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setUtilizadoresData(
          utilizadoresData.map((utilizador) =>
            utilizador.id_user === selectedUtilizador.id_user ? result : utilizador
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
    const newUtilizadorWithRole = {
      nome: newUtilizador.nome,
      email: newUtilizador.email,
      foto: newUtilizador.foto,
      palavrapasse: newUtilizador.palavrapasse,
      role: newUtilizador.role, // Role diretamente
    };

    console.log("Dados enviados para criação:", newUtilizadorWithRole);

    try {
      const response = await fetch(API_BASE_URL + "utilizador/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUtilizadorWithRole),
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
    setSelectedUtilizador({ ...selectedUtilizador, [name]: value });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewUtilizador({ ...newUtilizador, [name]: value });
  };*/
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
        <table className="table align-middle" style={{boxShadow: '5px 5px 15px grey'}}>
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
            {utilizadoresData.map((utilizador) => (
              <tr key={utilizador.id_user}>
                <td>
                  <img
                    src={API_BASE_URL + 'uploads/'+ utilizador.foto}
                    alt={"User"}
                    className="rounded-circle"
                    width="50"
                    height="50"
                  />
                </td>
                <td>{utilizador.nome}</td>
                <td>{utilizador.email}</td>
                <td>{utilizador.role}</td> {/* Mostra o role diretamente */}
                <td>
                  <button
                    className="btn p-1 me-2"
                    style={{ color: "#008000" }}
                    onClick={() => {
                      setId_user(utilizador.id_user);
                      setNomeEdit(utilizador.nome);
                      setEmailEdit(utilizador.email);
                      setRoleEdit(utilizador.role);
                      setShowEditModal(true);}}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="btn p-1"
                    style={{ color: "#d33" }}
                    onClick={() => handleDelete(utilizador.id_user)}
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
              <form onSubmit={(e) => handleSubmit(e, true)}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomeEdit"
                    value={nomeEdit}
                    onChange={(e) => setNomeEdit(e.target.value)}
                    required
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
                    value={emailEdit}
                    onChange={(e) => setEmailEdit(e.target.value)}
                    required
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
                    value={roleEdit}
                    onChange={(e) => setRoleEdit(e.target.value)}
                    required
                  >
                    <option value="Admin">Admin</option>
                    <option value="Utilizador">Utilizador</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="foto" className="form-label">
                    Foto
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="fotoEdit"
                    onChange={(e) => handleFileChange(e, true)}
                  />
                </div>
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Salvar mudanças</button>
              </div>
              </form>
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
              <form onSubmit={(e) => handleSubmit(e)}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomeAdd"
                    value={nomeAdd}
                    onChange={(e) => setNomeAdd(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailAdd"
                    value={emailAdd}
                    onChange={(e) => setEmailAdd(e.target.value)}
                    required
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
                    value={roleAdd}
                    onChange={(e) => setRoleAdd(e.target.value)}
                    required
                  >
                    <option value="Admin">Admin</option>
                    <option value="Utilizador">Utilizador</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="foto" className="form-label">
                    Foto
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="fotoAdd"
                      onChange={(e) => handleFileChange(e)}
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
                    value={palavrapasseAdd}
                    onChange={(e) => setPalavrapasseAdd(e.target.value)}
                      required
                  />
                </div>
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Adicionar</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
