let tricks = JSON.parse(localStorage.getItem("tricks")) || [];
let indiceModifica = null;

mostraTricks();
aggiornaDashboard();

function aggiungiTrick() {
    let nome = document.getElementById("nomeTrick").value;
    let categoria = document.getElementById("categoriaTrick").value;
    let stato = document.getElementById("statoTrick").value;
    let tentativi = parseInt(document.getElementById("tentativi").value);
    let chiusure = parseInt(document.getElementById("chiusure").value);

    if (nome === "" || isNaN(tentativi) || isNaN(chiusure)) {
        alert("Compila tutti i campi!");
        return;
    }

    let percentuale = 0;

    if (tentativi > 0) {
        percentuale = Math.round((chiusure / tentativi) * 100);
    }

    let trick = {
        nome: nome,
        categoria: categoria,
        stato: stato,
        tentativi: tentativi,
        chiusure: chiusure,
        percentuale: percentuale
    };

    if (indiceModifica === null) {
        tricks.push(trick);
        alert("Trick aggiunto!");
    } else {
        tricks[indiceModifica] = trick;
        indiceModifica = null;
        alert("Trick aggiornato!");
    }

    localStorage.setItem("tricks", JSON.stringify(tricks));

    pulisciCampi();
    mostraTricks();
    aggiornaDashboard();
}

function modificaTrick(indice) {
    let trick = tricks[indice];

    document.getElementById("nomeTrick").value = trick.nome;
    document.getElementById("categoriaTrick").value = trick.categoria;
    document.getElementById("statoTrick").value = trick.stato;
    document.getElementById("tentativi").value = trick.tentativi;
    document.getElementById("chiusure").value = trick.chiusure;

    indiceModifica = indice;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function eliminaTrick(indice) {
    if (confirm("Eliminare questo trick?")) {
        tricks.splice(indice, 1);
        localStorage.setItem("tricks", JSON.stringify(tricks));
        mostraTricks();
        aggiornaDashboard();
    }
}

function mostraTricks() {
    let lista = document.getElementById("listaTrick");

    let ricerca = "";

    if (document.getElementById("ricercaTrick")) {
        ricerca = document.getElementById("ricercaTrick").value.toLowerCase().trim();
    }

    lista.innerHTML = "";

    if (tricks.length === 0) {
        lista.innerHTML = "Nessun trick inserito ancora.";
        return;
    }

    let tricksDaMostrare = tricks.map(function(trick, indice) {
        return {
            trick: trick,
            indiceOriginale: indice,
            trovato: ricerca !== "" && trick.nome.toLowerCase().includes(ricerca)
        };
    });

    if (ricerca !== "") {
        tricksDaMostrare.sort(function(a, b) {
            if (a.trovato && !b.trovato) return -1;
            if (!a.trovato && b.trovato) return 1;
            return a.indiceOriginale - b.indiceOriginale;
        });
    }

    tricksDaMostrare.forEach(function(item) {
        let trick = item.trick;
        let indice = item.indiceOriginale;
        let evidenzia = item.trovato ? "trick-highlight" : "";

        lista.innerHTML += `
            <div class="trick ${evidenzia}">
                <div>
                    <div class="trick-title">${trick.nome}</div>
                    <p>
                        Categoria: ${trick.categoria} &nbsp; | &nbsp;
                        Stato: <b>${trick.stato}</b><br>
                        Chiusure: ${trick.chiusure}/${trick.tentativi} &nbsp; | &nbsp;
                        Percentuale: ${trick.percentuale}%
                    </p>
                </div>

                <div class="progress-area">
                    <b>${trick.percentuale}%</b>
                    <div class="progress-bar">
                        <div class="progress" style="width:${trick.percentuale}%"></div>
                        <div class="skate-icon" style="left:${trick.percentuale}%">🛹</div>
                    </div>
                </div>

                <div class="actions">
                    <button onclick="modificaTrick(${indice})">✏️ Modifica</button>
                    <button class="delete" onclick="eliminaTrick(${indice})">🗑️ Elimina</button>
                </div>
            </div>
        `;
    });
}

function aggiornaDashboard() {
    let dashboard = document.getElementById("riepilogoTrick");

    if (tricks.length === 0) {
        dashboard.innerHTML = "Nessun trick inserito ancora.";
        return;
    }

    let chiusi = tricks.filter(trick => trick.stato === "Chiuso").length;
    let allenamento = tricks.filter(trick => trick.stato === "In allenamento").length;

    dashboard.innerHTML = `
        <div class="stat-box">
            <div class="number">${tricks.length}</div>
            <div class="label">Trick totali</div>
        </div>

        <div class="stat-box">
            <div class="number">${chiusi}</div>
            <div class="label">Trick chiusi</div>
        </div>

        <div class="stat-box">
            <div class="number">${allenamento}</div>
            <div class="label">In allenamento</div>
        </div>
    `;
}

function pulisciCampi() {
    document.getElementById("nomeTrick").value = "";
    document.getElementById("categoriaTrick").selectedIndex = 0;
    document.getElementById("statoTrick").selectedIndex = 0;
    document.getElementById("tentativi").value = "";
    document.getElementById("chiusure").value = "";
}