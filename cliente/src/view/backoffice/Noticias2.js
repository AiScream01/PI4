import SideBar from '../components/SideBar.js';

function App() {
  return (
    <div className="d-flex bg">
      <SideBar />
      <main className="segunda card-body p-5 text-center">
        <div className="mb-md-5 mt-md-4 pb-5">
          <div className="container">
            <div className="row mt-5">
              <div>
                <h2>Notícias</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Imagem</th>
                      <th scope="col">Título</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Opções</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    <tr>
                      <td>Imagem</td>
                      <td>Título</td>
                      <td>Descrição</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-dark me-2 rounded-pill"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger rounded-pill"
                        >
                          Apagar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
