import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import API_BASE_URL from "../../config";
import axios from "axios";

export default function Parcerias() {
  // Estado para armazenar a lista de parcerias
  const [parceriasData, setParceriasData] = useState([]);

  // Estados para o modal de edição
  const [showEditModal, setShowEditModal] = useState(false);
  const [idParceria, setIdParceria] = useState("");
  const [tituloEdit, setTituloEdit] = useState("");
  const [descricaoEdit, setDescricaoEdit] = useState("");
  const [categoriaEdit, setCategoriaEdit] = useState("");
  const [logotipoEdit, setLogotipoEdit] = useState(null);

  // Estados para o modal de adição
  const [showAddModal, setShowAddModal] = useState(false);
  const [tituloAdd, setTituloAdd] = useState("");
  const [descricaoAdd, setDescricaoAdd] = useState("");
  const [categoriaAdd, setCategoriaAdd] = useState("");
  const [logotipoAdd, setLogotipoAdd] = useState(null);

  // Efeito para buscar parcerias
  useEffect(() => {
    const fetchParcerias = async () => {
      try {
        const response = await fetch(API_BASE_URL + "protocolosparceria/");
        if (!response.ok) {
          throw new Error("Erro ao buscar parcerias");
        }
        const data = await response.json();
        setParceriasData(data);
      } catch (error) {
        console.error("Erro ao buscar parcerias:", error);
      }
    };

    fetchParcerias();
  }, []);

  // Função para lidar com a mudança de arquivos
  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (isEdit) {
      setLogotipoEdit(file);
    } else {
      setLogotipoAdd(file);
    }
  };

  // Função para enviar os dados do formulário
  const handleSubmit = async (e, isEdit = false) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (isEdit) {
        formData.append("titulo", tituloEdit);
        formData.append("descricao", descricaoEdit);
        formData.append("categoria", categoriaEdit);
        console.log("logotipoEdit",logotipoEdit);
        console.log("logotipoAdd",logotipoAdd);
        if (logotipoEdit) {
          formData.append("logotipo", logotipoEdit);
        }
        const response = await axios.put(API_BASE_URL + `protocolosparceria/update/${idParceria}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setParceriasData(parceriasData.map(parceria => 
          parceria.id_parceria === idParceria ? 
            { ...parceria, ...response?.data } 
            : parceria
        ));
        
        console.log(parceriasData)
        setShowEditModal(false);
        Swal.fire("Sucesso!", "A parceria foi atualizada.", "success");
      } else {
        console.log("logotipo",logotipoAdd);
        formData.append("titulo", tituloAdd);
        formData.append("descricao", descricaoAdd);
        formData.append("categoria", categoriaAdd);
        if (logotipoAdd) {
          formData.append("logotipo", logotipoAdd);
        }
        const response = await axios.post(API_BASE_URL + "protocolosparceria/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        console.log('data1', response);
        setParceriasData([...parceriasData,  response?.data ]);
        setShowAddModal(false);
        Swal.fire("Sucesso!", "A nova parceria foi adicionada.", "success");
      }
    } catch (error) {
      console.error(isEdit ? "Erro ao atualizar a parceria:" : "Erro ao adicionar a parceria:", error);
      Swal.fire("Erro!", "Ocorreu um erro ao tentar salvar a parceria.", "error");
    }
  };

  // Função para excluir uma parceria
  const handleDelete = async (id_parceria) => {
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
        const response = await fetch(API_BASE_URL + `protocolosparceria/delete/${id_parceria}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire("Apagado!", "A parceria foi apagada.", "success");
          setParceriasData(
            parceriasData.filter((parceria) => parceria.id_parceria !== id_parceria)
          );
        } else {
          Swal.fire("Erro!", "Não foi possível apagar a parceria.", "error");
        }
      } catch (error) {
        console.error("Erro ao apagar a parceria:", error);
        Swal.fire("Erro!", "Ocorreu um erro ao tentar apagar a parceria.", "error");
      }
    }
  };

  return (
    <div className="container mt-4" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
      <h1 className="mb-4">Parcerias</h1>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowAddModal(true)}
        style={{ backgroundColor: "#1ED700", borderColor: "#1ED700" }}
      >
        <FaPlus /> Adicionar Parceria
      </button>
      <div className="row">
        {parceriasData.map((parceria) => (
          <div className="col-md-4 mb-4" key={parceria.id_parceria}>
            <div className="text-center border rounded p-3" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.2)", backgroundColor: "white" }}>
              <img
                src={API_BASE_URL + 'uploads/'+ parceria.logotipo || "https://via.placeholder.com/150"}
                alt={parceria.titulo}
                className="img-fluid mb-2"
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
              <div className="mb-2">
                <strong>{parceria.titulo}</strong>
              </div>
              <button
                className="btn p-1 me-2"
                style={{ color: "blue" }}
                onClick={() => { 
                  setIdParceria(parceria.id_parceria);
                  setTituloEdit(parceria.titulo);
                  setDescricaoEdit(parceria.descricao);
                  setCategoriaEdit(parceria.categoria);
                  setShowEditModal(true); 
                }}
              >
                <FaEdit size={20} />
              </button>
              <button
                className="btn p-1"
                style={{ color: "red" }}
                onClick={() => handleDelete(parceria.id_parceria)}
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Edição */}
      {showEditModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Parceria</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <form onSubmit={(e) => handleSubmit(e, true)}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="tituloEdit" className="form-label">Título</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tituloEdit"
                      value={tituloEdit}
                      onChange={(e) => setTituloEdit(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descricaoEdit" className="form-label">Descrição</label>
                    <textarea
                      className="form-control"
                      id="descricaoEdit"
                      value={descricaoEdit}
                      onChange={(e) => setDescricaoEdit(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="categoriaEdit" className="form-label">Categoria</label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoriaEdit"
                      value={categoriaEdit}
                      onChange={(e) => setCategoriaEdit(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="logotipoEdit" className="form-label">Atualizar Logotipo</label>
                    <input
                      type="file"
                      className="form-control"
                      id="logotipoEdit"
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
                <h5 className="modal-title">Adicionar Parceria</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="tituloAdd" className="form-label">Título</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tituloAdd"
                      value={tituloAdd}
                      onChange={(e) => setTituloAdd(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descricaoAdd" className="form-label">Descrição</label>
                    <textarea
                      className="form-control"
                      id="descricaoAdd"
                      value={descricaoAdd}
                      onChange={(e) => setDescricaoAdd(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="categoriaAdd" className="form-label">Categoria</label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoriaAdd"
                      value={categoriaAdd}
                      onChange={(e) => setCategoriaAdd(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="logotipoAdd" className="form-label">Logotipo</label>
                    <input
                      type="file"
                      className="form-control"
                      id="logotipoAdd"
                      onChange={(e) => handleFileChange(e)}
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
