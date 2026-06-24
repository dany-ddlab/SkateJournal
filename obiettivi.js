let obiettivi = JSON.parse(localStorage.getItem("obiettivi")) || [];
let tricks = JSON.parse(localStorage.getItem("tricks")) || [];

mostraObiettivi();
aggiornaRiepilogo();

function aggiungiObiettivo() {
    let testo = document.getElementById("testoObiettivo").value;

    if (testo === "") {
        alert("Scrivi un obiettivo!");
        return;
    }

    let obiettivo = {
        testo: testo,
        completato: false,
        aggiuntoAiTrick: false,
        dataCreazione: new Date().toISOString()
    };

    obiettivi.push(obiettivo);

    salvaObiettivi();

    document.getElementById("testoObiettivo").value = "";

    mostraObiettivi();
    aggiornaRiepilogo();
}

function completaObiettivo(indice) {
    obiettivi[indice].completato = !obiettivi[indice].completato;

    salvaObiettivi();

    mostraObiettivi();
    aggiornaRiepilogo();
}

function aggiungiAiTrickChiusi(indice) {
    let obiettivo = obiettivi[indice];

    if (!obiettivo.completato) {
        alert("Prima completa l'obiettivo!");
        return;
    }

    let nomeTrick = pulisciNomeTrick(obiettivo.testo);

    let giaPresente = tricks.some(t =>
        t.nome.toLowerCase() === nomeTrick.toLowerCase()
    );

    if (giaPresente) {
        alert("Questo trick è già presente nella lista!");
        return;
    }

    let nuovoTrick = {
        nome: nomeTrick,
        categoria: "Altro",
        stato: "Chiuso",
        tentativi: 1,
        chiusure: 1,
        percentuale: 100
    };

    tricks.push(nuovoTrick);

    localStorage.setItem("tricks", JSON.stringify(tricks));

    obiettivi[indice].aggiuntoAiTrick = true;
    salvaObiettivi();

    alert(nomeTrick + " aggiunto ai trick chiusi!");

    mostraObiettivi();
    aggiornaRiepilogo();
}

function pulisciNomeTrick(testo) {
    let nome = testo;

    nome = nome.replace(/chiudere/gi, "");
    nome = nome.replace(/imparare/gi, "");
    nome = nome.replace(/fare/gi, "");
    nome = nome.replace(/riuscire a/gi, "");
    nome = nome.replace(/3 volte/gi, "");
    nome = nome.replace(/2 volte/gi, "");
    nome = nome.replace(/1 volta/gi, "");
    nome = nome.replace(/volte/gi, "");

    nome = nome.trim();

    if (nome === "") {
        nome = testo;
    }

    return nome;
}

function eliminaObiettivo(indice) {
    if (confirm("Eliminare questo obiettivo?")) {
        obiettivi.splice(indice, 1);

        salvaObiettivi();

        mostraObiettivi();
        aggiornaRiepilogo();
    }
}

function mostraObiettivi() {
    let lista = document.getElementById("listaObiettivi");

    lista.innerHTML = "";

    if (obiettivi.length === 0) {
        lista.innerHTML = "Nessun obiettivo inserito.";
        return;
    }

    obiettivi.forEach((obiettivo, indice) => {
        let classe = obiettivo.completato ? "obiettivo-completato" : "";

        lista.innerHTML += `
            <div class="trick ${classe}">
                <div class="trick-title">
                    ${obiettivo.completato ? "✅" : "⬜"} ${obiettivo.testo}
                </div>

                <br>

                <button onclick="completaObiettivo(${indice})">
                    ${obiettivo.completato ? "Segna come non completato" : "Completa"}
                </button>

                <br><br>

                <button onclick="aggiungiAiTrickChiusi(${indice})">
                    🏆 Aggiungi ai trick chiusi
                </button>

                <br><br>

                <button onclick="eliminaObiettivo(${indice})">
                    Elimina
                </button>

                ${
                    obiettivo.aggiuntoAiTrick
                    ? "<p><b>Già aggiunto alla classifica trick ✅</b></p>"
                    : ""
                }
            </div>
        `;
    });
}

function aggiornaRiepilogo() {

    let riepilogo =
        document.getElementById("riepilogoObiettivi");

    if (obiettivi.length === 0) {

        riepilogo.innerHTML = `
            <div class="stat-box">
                <div class="number">0</div>
                <div class="label">Obiettivi</div>
            </div>
        `;

        return;
    }

    let completati =
        obiettivi.filter(o => o.completato).length;

    let percentuale =
        Math.round((completati / obiettivi.length) * 100);

    riepilogo.innerHTML = `

        <div class="stat-box">
            <div class="number">
                ${obiettivi.length}
            </div>
            <div class="label">
                Obiettivi Totali
            </div>
        </div>

        <div class="stat-box">
            <div class="number">
                ${completati}
            </div>
            <div class="label">
                Completati
            </div>
        </div>

        <div class="stat-box">
            <div class="number">
                ${percentuale}%
            </div>
            <div class="label">
                Progresso
            </div>
        </div>

    `;
}

function salvaObiettivi() {
    localStorage.setItem("obiettivi", JSON.stringify(obiettivi));
}