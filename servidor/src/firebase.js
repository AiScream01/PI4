// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./projeto4-ff67b-firebase-adminsdk-hrler-f6439cf2ec.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;