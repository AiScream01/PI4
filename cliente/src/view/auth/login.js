import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import olisipoLogo from '../../assets/Olisipo_LogoWhite.svg';
import fundoOlisipo from '../../assets/fundo_olisipo.png'; // Certifique-se de ajustar o caminho conforme necessário
import url from '../../config';

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
        body: JSON.stringify({ email, palavrapasse: palavrapasse }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === 'Admin') {
          window.localStorage.setItem("userId", data.id);
          window.localStorage.setItem("userRole", data.role);

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
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img src={olisipoLogo} alt="Olisipo Logo" style={styles.logo} />
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Digite o seu email" 
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input 
            type="password" 
            value={palavrapasse} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Digite a sua palavra-passe" 
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Entrar</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${fundoOlisipo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  logoContainer: {
    marginBottom: '30px',
  },
  logo: {
    width: '150px',
    height: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  inputGroup: {
    marginBottom: '20px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#1ED700',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#18B800',
  },
};

export default Login;
