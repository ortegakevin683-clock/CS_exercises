// ============================================================
// carrello.js — logica del carrello condivisa tra tutte le pagine
//
// Questo file gestisce:
//   - Leggere il carrello dal localStorage
//   - Aggiungere un prodotto
//   - Rimuovere un prodotto
//   - Salvare ogni modifica nel localStorage
//
// Viene incluso in vetrinaEcommerce.html e carrelloEcommerce.html
// ============================================================


// Legge il carrello salvato nel localStorage e lo restituisce come array.
// Se non c'è nulla di salvato, restituisce un array vuoto.
function leggiCarrello() {
  var datiSalvati = localStorage.getItem('carrello');
  if (datiSalvati) {
    return JSON.parse(datiSalvati); // convertiamo la stringa JSON in array
  }
  return []; // prima volta: carrello vuoto
}

// Salva l'array del carrello nel localStorage come stringa JSON
function salvaCarrello(carrello) {
  localStorage.setItem('carrello', JSON.stringify(carrello));
}

// Aggiunge un prodotto al carrello.
// Se il prodotto esiste già, aumenta solo la quantità.
// Poi salva e aggiorna il contatore nella navbar.
function aggiungiAlCarrello(nome, prezzo) {
  var carrello = leggiCarrello();
  var trovato  = false;

  // Cerchiamo se il prodotto è già nel carrello
  for (var i = 0; i < carrello.length; i++) {
    if (carrello[i].nome === nome) {
      carrello[i].quantita++;
      trovato = true;
      break;
    }
  }

  // Se non era presente lo aggiungiamo come nuovo elemento
  if (!trovato) {
    carrello.push({ nome: nome, prezzo: prezzo, quantita: 1 });
  }

  salvaCarrello(carrello);    // salviamo nel localStorage
  aggiornaContatoreNavbar();  // aggiorniamo il numero nella navbar
  alert(nome + ' aggiunto al carrello!');
}

// Rimuove un prodotto dal carrello tramite il suo indice nell'array.
// Poi salva e aggiorna la pagina carrello.
function rimuoviDalCarrello(indice) {
  var carrello = leggiCarrello();
  carrello.splice(indice, 1);   // rimuoviamo l'elemento all'indice dato
  salvaCarrello(carrello);      // salviamo nel localStorage
  aggiornaContatoreNavbar();    // aggiorniamo il numero nella navbar
  mostraCarrello();             // ridisegniamo la lista nel carrello
}
