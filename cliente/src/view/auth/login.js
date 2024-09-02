import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import olisipoLogo from '../../assets/Olisipo_LogoWhite.svg';
import url from '../../config'; // Certifique-se de ajustar o caminho conforme necessário

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
        // Verificar se o usuário é Admin
        if (data.role === 'Admin') {
          //window.localStorage.setItem("isLogedIn", true);
          window.localStorage.setItem("userId", data.id);
          window.localStorage.setItem("userRole", data.role);

          swal("Login bem-sucedido", "Bem-vindo!", "success").then(() => {
            navigate('/pedido-ferias');
          });

          console.log("ID", data.id, "role", data.role);
        } else {
          // Se o usuário não for Admin, exibir mensagem de erro
          swal("Acesso negado", "Você deve ser administrador para ter acesso ao backoffice.", "error");
        }
      } else {
        // Exibir mensagem de erro se a resposta não for ok
        swal("Erro", data.error || 'Erro ao fazer login. Por favor, tente novamente.', "error");
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      swal("Erro", 'Erro ao fazer login. Por favor, tente novamente.', "error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
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
          <label>Palavra-passe:</label>
          <input 
            type="password" 
            value={palavrapasse} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Digite a palavrapasse" 
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
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  }
};

export default Login;
