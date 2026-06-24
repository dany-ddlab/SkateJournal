let sessioni = JSON.parse(localStorage.getItem("sessioni")) || [];

let oggi = new Date();
let meseCorrente = oggi.getMonth();
let annoCorrente = oggi.getFullYear();

mostraCalendario();

function mostraCalendario() {
    let calendario = document.getElementById("calendario");
    let meseAnno = document.getElementById("meseAnno");

    calendario.innerHTML = "";

    let nomiMesi = [
        "Gennaio", "Febbraio", "Marzo", "Aprile",
        "Maggio", "Giugno", "Luglio", "Agosto",
        "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];

    meseAnno.innerHTML = `${nomiMesi[meseCorrente]} ${annoCorrente}`;

    let primoGiorno = new Date(annoCorrente, meseCorrente, 1);
    let ultimoGiorno = new Date(annoCorrente, meseCorrente + 1, 0);

    let giornoSettimana = primoGiorno.getDay();

    if (giornoSettimana === 0) {
        giornoSettimana = 7;
    }

    for (let i = 1; i < giornoSettimana; i++) {
        calendario.innerHTML += `<div class="day empty"></div>`;
    }

    for (let giorno = 1; giorno <= ultimoGiorno.getDate(); giorno++) {
        let dataCompleta = creaDataISO(annoCorrente, meseCorrente, giorno);

        let haSessione = sessioni.some(s => s.data === dataCompleta);

        calendario.innerHTML += `
            <div class="day ${haSessione ? 'has-session' : ''}"
                 onclick="mostraSessioniGiorno('${dataCompleta}')">
                ${giorno}
            </div>
        `;
    }
}

function creaDataISO(anno, mese, giorno) {
    let m = String(mese + 1).padStart(2, "0");
    let g = String(giorno).padStart(2, "0");

    return `${anno}-${m}-${g}`;
}

function mostraSessioniGiorno(data) {
    let box = document.getElementById("sessioniGiorno");

    let filtrate = sessioni.filter(s => s.data === data);

    if (filtrate.length === 0) {
        box.innerHTML = `Nessuna sessione il ${data}.`;
        return;
    }

    box.innerHTML = "";

    filtrate.forEach(s => {
        box.innerHTML += `
            <div class="trick">
                <h3>${data}</h3>
                <p>
                    📍 ${s.spot}<br>
                    ⏱️ ${s.durata} min
                </p>
                <p><b>Provati:</b><br>${s.provati}</p>
                <p><b>Chiusi:</b><br>${s.chiusi}</p>
                <p><b>Note:</b><br>${s.note}</p>
            </div>
        `;
    });
}

function mesePrecedente() {
    meseCorrente--;

    if (meseCorrente < 0) {
        meseCorrente = 11;
        annoCorrente--;
    }

    mostraCalendario();
}

function meseSuccessivo() {
    meseCorrente++;

    if (meseCorrente > 11) {
        meseCorrente = 0;
        annoCorrente++;
    }

    mostraCalendario();
}