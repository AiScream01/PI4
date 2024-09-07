const multer = require('multer');
const path = require('path');


// Configuração do multer para PDFs
module.exports = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads')); // Mesmo destino das imagens
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Gerar um nome único para o arquivo
    },
});
    


