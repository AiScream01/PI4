import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Logo_Olisipo_preto from '../../assets/Logo_Olisipo_preto.png';
import fundoOlisipo from '../../assets/fundo_olisipo.png'; 
import url from '../../config'; // Certifique-se de ajustar o caminho conforme necessário
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Arquivo CSS adicional para personalização

const Login = () => {
  const [email, setEmail] = useState("");
  const [palavrapasse, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(url + "utilizador/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, palavrapasse }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === 'Admin') {
          window.localStorage.setItem("userId", data.id);
          window.localStorage.setItem("userRole", data.role);
          window.localStorage.setItem("userName", data.nome);
          window.localStorage.setItem("userPhoto", data.foto);

          swal("Login bem-sucedido", "Bem-vindo!", "success").then(() => {
            navigate('/pedido-ferias');
          });

        } else {
          swal("Acesso negado", "Você deve ser administrador para ter acesso ao backoffice.", "error");
        }
      } else {
        swal("Erro", data.error || 'Erro ao fazer login. Por favor, tente novamente.', "error");
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      swal("Erro", 'Erro ao fazer login. Por favor, tente novamente.', "error");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-box p-5 shadow">
        <div className="text-center mb-4">
          <img src={Logo_Olisipo_preto} alt="Olisipo Logo" className="login-logo mb-4" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Digite o seu email" 
              required 
            />
          </div>
          <div className="form-group mb-4">
            <input 
              type="password" 
              className="form-control" 
              value={palavrapasse} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Digite a sua palavra-passe" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;