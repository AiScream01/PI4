import React from 'react';

export default function AjudasCusto() {
  const ajudas = [
    {
      id: 1,
      imagem: 'path/to/image.jpg',  // Substitua por um caminho real
      nome: 'Nome do Colaborador',
      custo: '100€',
      descricao: 'Descrição do custo',
      comprovativo: 'ficheiro.pdf',
    },

  ];

  return (
    <div className="bg">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-12 col-xl-12">
            <div className="card bg-light text-black" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2>Ajudas de Custo</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Colaborador</th>
                        <th scope="col">Custo</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Comprovativo</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {ajudas.map((ajuda) => (
                        <tr key={ajuda.id}>
                          <td>
                            <img src={ajuda.imagem} alt="Imagem do colaborador" style={{ width: '50px', borderRadius: '50%' }} />
                          </td>
                          <td>{ajuda.nome}</td>
                          <td>{ajuda.custo}</td>
                          <td>{ajuda.descricao}</td>
                          <td>{ajuda.comprovativo}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-dark me-2 rounded-pill"
                            >
                              Aceitar
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger rounded-pill"
                            >
                              Rejeitar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
