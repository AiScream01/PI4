// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./caminho/para/o/teu/ficheiro-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;