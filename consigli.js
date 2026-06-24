let tricks = JSON.parse(localStorage.getItem("tricks")) || [];
let sessioni = JSON.parse(localStorage.getItem("sessioni")) || [];
let rimandati = JSON.parse(localStorage.getItem("trickRimandati")) || [];

let databaseTrick = [
    { nome: "Ollie", livello: 1, categoria: "Flatground" },
    { nome: "Manual", livello: 1, categoria: "Manual" },
    { nome: "Shove-it", livello: 1, categoria: "Flatground" },

    { nome: "FS 180", livello: 2, categoria: "Flatground" },
    { nome: "BS 180", livello: 2, categoria: "Flatground" },
    { nome: "Pop Shove-it", livello: 2, categoria: "Flatground" },

    { nome: "Kickflip", livello: 3, categoria: "Flatground" },
    { nome: "Heelflip", livello: 3, categoria: "Flatground" },
    { nome: "Boardslide", livello: 3, categoria: "Grind / Slide" },

    { nome: "50-50 Grind", livello: 4, categoria: "Grind / Slide" },
    { nome: "Noseslide", livello: 4, categoria: "Grind / Slide" },
    { nome: "Varial Flip", livello: 4, categoria: "Flatground" },

    { nome: "Tre Flip", livello: 5, categoria: "Flatground" },
    { nome: "Crooked Grind", livello: 5, categoria: "Grind / Slide" }
];

mostraConsigli();

function mostraConsigli() {
    let box = document.getElementById("listaConsigli");
    box.innerHTML = "";

    let trickUtente = tricks.map(t => t.nome.toLowerCase());
    let trickChiusi = tricks.filter(t => t.stato === "Chiuso");

    let livelloUtente = 1;

    if (trickChiusi.length > 0) {
        let somma = 0;

        trickChiusi.forEach(t => {
            let trovato = databaseTrick.find(db =>
                db.nome.toLowerCase() === t.nome.toLowerCase()
            );

            if (trovato) {
                somma += trovato.livello;
            } else {
                somma += 2;
            }
        });

        livelloUtente = Math.round(somma / trickChiusi.length);
    }

    let consigli = databaseTrick.filter(t => {
        let giaPresente = trickUtente.includes(t.nome.toLowerCase());
        let rimandato = rimandati.includes(t.nome);

        return !giaPresente &&
               !rimandato &&
               t.livello >= livelloUtente &&
               t.livello <= livelloUtente + 1;
    });

    if (consigli.length === 0) {
        box.innerHTML = "Nessun consiglio disponibile per ora.";
        return;
    }

    consigli.forEach(t => {
        box.innerHTML += `
            <div class="trick">
                <div class="trick-title">${t.nome}</div>

                <p>
                    Categoria: ${t.categoria}<br>
                    Difficoltà: livello ${t.livello}
                </p>

                <button onclick="aggiungiDaProvare('${t.nome}', '${t.categoria}')">
                    ✅ Spunta come da provare
                </button>

                <br><br>

                <button onclick="rimandaTrick('${t.nome}')">
                    ⏭️ Rimanda
                </button>
            </div>
        `;
    });
}

function aggiungiDaProvare(nome, categoria) {
    let nuovoTrick = {
        nome: nome,
        categoria: categoria,
        stato: "Da provare",
        tentativi: 0,
        chiusure: 0,
        percentuale: 0
    };

    tricks.push(nuovoTrick);

    localStorage.setItem("tricks", JSON.stringify(tricks));

    alert(nome + " aggiunto ai tuoi trick!");

    mostraConsigli();
}

function rimandaTrick(nome) {
    rimandati.push(nome);
    localStorage.setItem("trickRimandati", JSON.stringify(rimandati));

    mostraConsigli();
}