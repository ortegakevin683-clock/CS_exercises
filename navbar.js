
// ============================================================
// navbar.js — costruisce la navbar e la inserisce in ogni pagina
//
// Come funziona:
//   1. Ogni pagina HTML ha un div vuoto con id="navbar"
//   2. Questo script scrive l'HTML della navbar dentro quel div
//   3. Poi controlla in quale pagina siamo e evidenzia il link giusto
//   4. Infine aggiorna il contatore del carrello leggendo il localStorage
// ============================================================

// Questa funzione viene chiamata appena la pagina finisce di caricarsi
function costruisciNavbar() {

  // Cerchiamo il div segnaposto nella pagina
  var divNavbar = document.getElementById('navbar');

  // Se il div non esiste, usciamo subito (sicurezza extra)
  if (!divNavbar) return;

  // Scriviamo l'HTML della navbar dentro il div segnaposto.
  // I link usano href per navigare tra le pagine.
  divNavbar.innerHTML =
    '<nav>' +
      '<a href="loginEcommerce.html" class="logo">🛒 NegozioCSV</a>' +
      '<a href="loginEcommerce.html" id="link-login">Login</a>' +
      '<a href="registrazioneEcommerce.html" id="link-registrazione">Registrazione</a>' +
      '<a href="vetrinaEcommerce.html" id="link-vetrina">Vetrina</a>' +
      '<a href="carrelloEcommerce.html" id="link-carrello">' +
        'Carrello (<span id="conta-carrello">0</span>)' +
      '</a>' +
    '</nav>';

  // Evidenziamo il link della pagina corrente.
  // window.location.pathname contiene il nome del file che stiamo vedendo.
  var paginaCorrente = window.location.pathname;

  if (paginaCorrente.includes('loginEcommerce')) {
    document.getElementById('link-login').classList.add('attivo');
  } else if (paginaCorrente.includes('registrazioneEcommerce')) {
    document.getElementById('link-registrazione').classList.add('attivo');
  } else if (paginaCorrente.includes('vetrinaEcommerce')) {
    document.getElementById('link-vetrina').classList.add('attivo');
  } else if (paginaCorrente.includes('carrelloEcommerce')) {
    document.getElementById('link-carrello').classList.add('attivo');
  }

  // Aggiorniamo subito il contatore del carrello
  aggiornaContatoreNavbar();

  // Controlliamo se c'è un utente loggato salvato nel localStorage
  // e aggiorniamo il testo del link Login con il saluto
  var utenteLoggato = localStorage.getItem('utenteLoggato');
  if (utenteLoggato) {
    document.getElementById('link-login').textContent = 'Ciao, ' + utenteLoggato;
  }
}

// Legge il carrello dal localStorage e aggiorna il numero tra parentesi
function aggiornaContatoreNavbar() {
  var contatoreSpan = document.getElementById('conta-carrello');
  if (!contatoreSpan) return;

  // Leggiamo il carrello salvato (se non c'è nulla usiamo un array vuoto)
  var datiSalvati = localStorage.getItem('carrello');
  var carrello    = datiSalvati ? JSON.parse(datiSalvati) : [];

  // Sommiamo le quantità di tutti gli articoli
  var totaleArticoli = 0;
  for (var i = 0; i < carrello.length; i++) {
    totaleArticoli += carrello[i].quantita;
  }

  contatoreSpan.textContent = totaleArticoli;
}

// Avviamo la costruzione della navbar quando la pagina è pronta
window.addEventListener('DOMContentLoaded', costruisciNavbar);
