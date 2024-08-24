import React from 'react';
import itsh from '../../assets/itshappening.png';
import logo from '../../assets/Olisipo_LogoWhite.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CustomCSSMicroSite.css';


export default function EditarMicroSite() {
    return (
      <div class="segunda">
        <form>
          <div class="mb-3">
            <label class="form-label">Titulo</label>
            <input class="form-control" />
            <div id="emailHelp" class="form-text">Este vai ser o titulo presente no micro-site.</div>
          </div>
          <div class="mb-3">
            <label for="exemploTexto" class="form-label">Texto</label>
            <input class="form-control" id="exemploTexto" />
            <div id="emailHelp" class="form-text">Este vai ser o texto que vai ficar por baixo do título.</div>
          </div>
          <div class="mb-3">
            <label for="exemploTexto" class="form-label">Link Google Play</label>
            <input class="form-control" id="exemploTexto" />
            <div id="emailHelp" class="form-text">Este é o link que vai ser guardado no botão "Google Play"</div>
          </div>
          <div class="mb-3">
            <label for="exemploTexto" class="form-label">Link App Store</label>
            <input class="form-control" id="exemploTexto" />
            <div id="emailHelp" class="form-text">Este é o link que vai ser guardado no botão "App Store"</div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>

      </div>
    );
}
