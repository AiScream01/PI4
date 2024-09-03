import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import API_BASE_URL from "../../config"; // Ajuste conforme necessário
import axios from "axios";

export default function Noticias() {
  // Estado para armazenar a lista de noticias
  const [noticiasData, setNoticiasData] = useState([]);

  // Estados para o modal de edição
  const [showEditModal, setShowEditModal] = useState(false);
  const [id_noticia, setId_noticia] = useState("");
  const [tituloEdit, setTituloEdit] = useState("");
  const [descricaoEdit, setDescricaoEdit] = useState("");
  const [dataEdit, setDataEdit] = useState("");
  const [imagemEdit, setImagemEdit] = useState(null);

  // Estados para o modal de adição
  const [showAddModal, setShowAddModal] = useState(false);
  const [tituloAdd, setTituloAdd] = useState("");
  const [descricaoAdd, setDescricaoAdd] = useState("");
  const [dataAdd, setDataAdd] = useState("");
  const [imagemAdd, setImagemAdd] = useState(null);
  
  // Efeito para buscar notícias
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

  // Função para lidar com a mudança de arquivos
  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (isEdit) {
      setImagemEdit(file);
    } else {
      setImagemAdd(file);
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
        formData.append("data", dataEdit);
        console.log("imagemEdit",imagemEdit);
        console.log("imagemAdd",imagemAdd);
        if (imagemEdit) {
          formData.append("imagem", imagemEdit);
        }
        const response = await axios.put(API_BASE_URL + `noticias/update/${id_noticia}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setNoticiasData(
          noticiasData.map(noticia =>
            noticia.id_noticia === id_noticia ? 
            { ...noticia, ...response?.data}
            : noticia
          )
        );
        setShowEditModal(false);
        Swal.fire("Sucesso!", "A notícia foi atualizada.", "success");
      } else {
        console.log("imagem",imagemAdd);
        console.log("dados",tituloAdd, descricaoAdd, dataAdd);
        formData.append("titulo", tituloAdd);
        formData.append("descricao", descricaoAdd);
        formData.append("data", dataAdd);
        if (imagemAdd) {
          formData.append("imagem", imagemAdd);
        }
        console.log('formData', formData);
        const response = await axios.post(API_BASE_URL + "noticias/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        console.log('data1', response);
        setNoticiasData([...noticiasData,  response?.data ]);
        setShowAddModal(false);
        Swal.fire("Sucesso!", "A nova notícia foi adicionada.", "success");
      }
    } catch (error) {
      console.error(isEdit ? "Erro ao atualizar a notícia:" : "Erro ao adicionar a notícia:", error);
      Swal.fire("Erro!", "Ocorreu um erro ao tentar salvar a notícia.", "error");
    }
  };

  // Função para excluir uma notícia
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

  /*const handleEdit = (noticia) => {
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
*/
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Notícias</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
          style={{ backgroundColor: "#1ED700", borderColor: "#1ED700" }}
        >
          <FaPlus /> Adicionar Notícia
        </button>
      </div>
      <table className="table table-striped text-center align-middle" style={{boxShadow: '5px 5px 15px grey'}}>
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
                  src={API_BASE_URL + 'uploads/'+ noticia.imagem}
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
                  onClick={() => {
                    setId_noticia(noticia.id_noticia);
                  setTituloEdit(noticia.titulo);
                  setDescricaoEdit(noticia.descricao);
                  setDataEdit(noticia.data);
                  setShowEditModal(true); 
                    /*handleEdit(noticia)*/}}
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
              <form onSubmit={(e) => handleSubmit(e, true)}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="tituloEdit">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tituloEdit"
                      value={tituloEdit}
                      onChange={(e) => setTituloEdit(e.target.value)}
                      required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="descricaoEdit">Descrição</label>
                  <textarea
                    className="form-control"
                    id="descricaoEdit"
                      value={descricaoEdit}
                      onChange={(e) => setDescricaoEdit(e.target.value)}
                      required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dataEdit">Data</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dataEdit"
                      value={dataEdit}
                      onChange={(e) => setDataEdit(e.target.value)}
                      required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="imagemEdit">Imagem</label>
                  <input
                    type="file"
                    className="form-control"
                    id="imagemEdit"
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
                <h5 className="modal-title">Adicionar Notícia</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowAddModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="tituloAdd">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tituloAdd"
                      value={tituloAdd}
                      onChange={(e) => setTituloAdd(e.target.value)}
                      required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="descricaoAdd">Descrição</label>
                  <textarea
                    className="form-control"
                    id="descricaoAdd"
                      value={descricaoAdd}
                      onChange={(e) => setDescricaoAdd(e.target.value)}
                      required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dataAdd" >Data</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dataAdd"
                      value={dataAdd}
                      onChange={(e) => setDataAdd(e.target.value)}
                      required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="imagemAdd">Imagem</label>
                  <input
                    type="file"
                    className="form-control"
                    id="imagemAdd"
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
