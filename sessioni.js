let sessioni = JSON.parse(localStorage.getItem("sessioni")) || [];
let indiceModifica = null;

mostraSessioni();

function aggiungiSessione() {
    let data = document.getElementById("dataSessione").value;
    let spot = document.getElementById("spotSessione").value;
    let durata = document.getElementById("durataSessione").value;
    let provati = document.getElementById("trickProvati").value;
    let chiusi = document.getElementById("trickChiusi").value;
    let note = document.getElementById("noteSessione").value;

    if (data === "" || spot === "") {
        alert("Compila almeno data e spot!");
        return;
    }

    let sessione = {
        data: data,
        spot: spot,
        durata: durata,
        provati: provati,
        chiusi: chiusi,
        note: note
    };

    if (indiceModifica === null) {
        sessioni.push(sessione);
        alert("Sessione salvata!");
    } else {
        sessioni[indiceModifica] = sessione;
        alert("Sessione aggiornata!");
        indiceModifica = null;
    }

    localStorage.setItem("sessioni", JSON.stringify(sessioni));

    pulisciCampi();
    mostraSessioni();
}

function modificaSessione(indice) {
    let s = sessioni[indice];

    document.getElementById("dataSessione").value = s.data;
    document.getElementById("spotSessione").value = s.spot;
    document.getElementById("durataSessione").value = s.durata;
    document.getElementById("trickProvati").value = s.provati;
    document.getElementById("trickChiusi").value = s.chiusi;
    document.getElementById("noteSessione").value = s.note;

    indiceModifica = indice;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function mostraSessioni() {
    let lista = document.getElementById("listaSessioni");

    lista.innerHTML = "";

    if (sessioni.length === 0) {
        lista.innerHTML = "Nessuna sessione salvata.";
        return;
    }

    sessioni.forEach((s, indice) => {
        lista.innerHTML += `
            <div class="trick">
                <h3>📅 ${s.data}</h3>

                <p>
                    📍 ${s.spot}<br>
                    ⏱️ ${s.durata} min
                </p>

                <p><b>Provati:</b><br>${s.provati}</p>
                <p><b>Chiusi:</b><br>${s.chiusi}</p>
                <p><b>Note:</b><br>${s.note}</p>

                <button onclick="modificaSessione(${indice})">
                    Aggiorna sessione
                </button>

                <br><br>

                <button onclick="eliminaSessione(${indice})">
                    Elimina
                </button>
            </div>
        `;
    });
}

function eliminaSessione(indice) {
    if (confirm("Eliminare questa sessione?")) {
        sessioni.splice(indice, 1);
        localStorage.setItem("sessioni", JSON.stringify(sessioni));
        mostraSessioni();
    }
}

function pulisciCampi() {
    document.getElementById("dataSessione").value = "";
    document.getElementById("spotSessione").value = "";
    document.getElementById("durataSessione").value = "";
    document.getElementById("trickProvati").value = "";
    document.getElementById("trickChiusi").value = "";
    document.getElementById("noteSessione").value = "";
}