import logo from '../assets/Olisipo_LogoWhite.svg'; 

export default function SideBar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-olisipo overflow-scroll" style={{ width: "230px", height: "100vh", backgroundColor: "#1F1F1F" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <img src={logo} alt="Navbar Image" width="100px" height="100px" />
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Pedido Férias
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Horas
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Viatura Própria
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Faltas
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Dados Pessoais
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Noticias
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Parcerias
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Notificação Push
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Reuniões
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        Utilizadores
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        Micro-Site
                    </a>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none">
                    <img src="https://github.com/caroll2.png" alt="Admin Avatar" width="32" height="32" className="rounded-circle me-2" />
                    <strong>Admin</strong>
                </a>
            </div>
        </div>
    );
}
