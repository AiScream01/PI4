import olisipoLogo from '../../assets/Olisipo_LogoWhite.svg';

export default function Login() {
  return (
    <div className="bg">
      <nav className="navbar navbar-dark custom-bg-color py-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={olisipoLogo} alt="Olisipo Logo" width="70" height="50" className="d-inline-block align-text-top" />
          </a>
        </div>
      </nav>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-light text-black" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeEmailX">Username</label>
                    <input type="email" id="typeEmailX" className="form-control form-control-lg" placeholder="Enter your email" />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input type="password" id="typePasswordX" className="form-control form-control-lg" placeholder="Enter your password" />
                  </div>
                  <div className="form-check mb-4 d-flex justify-content-end align-items-center">
                    <input className="form-check-input me-2" type="checkbox" id="checkGuardarPassword" />
                    <label className="form-check-label" htmlFor="checkGuardarPassword"> Guardar password</label>
                  </div>
                  <button className="btn btn-lg px-5 rounded-pill btn-success" type="submit" title="Login">Login</button>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-dark"><i className="fab fa-facebook-f fa-lg"></i></a>
                    <a href="#!" className="text-dark"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                    <a href="#!" className="text-dark"><i className="fab fa-google fa-lg"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
