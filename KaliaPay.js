//  Déclaration de(s) dépendances

import $ from 'jquery';   // Importation de jQuery

// Déclaration des variables

let tid;        // Token d'authentification
let apikey;     // clé API
let service;    // service id 

//------------------------ Fonction de connexion ---------------------------- 

function Signin(user, password) {
  const datas = {
    user: user,
    password: password
  };

  const headers = {
    'Authorization': `Token ${tid}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  return $.ajax({
    url: 'https://kaliapay.com/api/signin-users/',
    method: 'POST',
    data: datas,
    headers: headers,
    success: function(response) {
      console.log('Réponse de l"API:', response);
    },
    error: function(error) {
      console.error('Erreur lors de la requête:', error);
    }
  });
}

//------------------ Fonction pour initialiser un paiement --------------- 

function initialize(amount, custom_data) {
  const requestPayment = {
    apikey: apikey,
    service: service,
    amount: amount,
    custom_data: custom_data
  };

  const headers = {
    'Authorization': `Token ${tid}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  return $.ajax({
    url: 'https://kaliapay.com/api/generate-webpay-qrcode/',
    method: 'POST',
    data: requestPayment,
    headers: headers,
    success: function(response) {
      return response.data;
    },
    error: function(error) {
      throw new Error(error);
    }
  });
}

//-------------- Fonction pour les détails d'une commande -------------- 

function getPaymentDetails(reference) {
  const headers = {
    'Authorization': `Token ${tid}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  return $.ajax({
    url: `https://kaliapay.com/api/get-express-transaction-details/${reference}/`,
    method: 'GET',
    headers: headers,
    success: function(response) {
      return response.data;
    },
    error: function(error) {
      throw new Error(error);
    }
  });
}

//-------------------------------------------------------------------------

function setTid(value) {
  tid = value;
}

function setApiKey(value) {
  apikey = value;
}

function setService(value) {
  service = value;
}

//---------------------- Export des différentes fonctions ------------------------

export default {
  setTid,
  setApiKey,
  setService,
  initialize,
  getPaymentDetails,
  Signin
};
