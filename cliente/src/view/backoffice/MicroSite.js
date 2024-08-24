import React from 'react';
import itsh from '../../assets/itshappening.png';
import logo from '../../assets/Olisipo_LogoWhite.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CustomCSSMicroSite.css';


export default function MicroSite() {
    return (
        <body>
      <header>
        {" "}
        <img class="logootipo" src={logo} alt="logotipo olisipo"></img>{" "}
      </header>
      <div class="container d-flex">
        <div class="texto">
          <img class="itshappening" src={itsh} alt="its happening" />
          <h2 class="itshappening">
            Uma aplicação projetada para{" "}
            <span style={{ color: "#1ED700" }}>simplificar</span> as tuas
            tarefas diárias
          </h2>
          <h2 class="itshappening">
            Elimina processos{" "}
            <span style={{ color: "#1ED700" }}>demorados</span> e concentra-te
            no que é mais <span style={{ color: "#1ED700" }}>importante</span>{" "}
          </h2>
        </div>
        <div class="instalar">
          <h1>Instala-me</h1>
          <button class="gp" onclick="install('Google Play')"></button>
          <button class="as" onclick="install('App Store')"></button>
        </div>
      </div>
        <footer>
        <div class="rodape">
          <img class="logo" src={logo} alt="logotipo olisipo"></img>
          <div class="column">
            <h3>Download</h3>
            <p>Instala-me</p>
          </div>

          <div class="column">
            <h3>Suporte</h3>
            <p>FAQ</p>
            <p>Telefones</p>
            <p>Chat</p>
          </div>

          <div class="column">
            <h3>Contactos</h3>
            <p>+351 931 231 231</p>
            <p>+351 931 231 231</p>
          </div>
          </div>
        </footer>
    </body>
    );
}
