let tricks = JSON.parse(localStorage.getItem("tricks")) || [];
let sessioni = JSON.parse(localStorage.getItem("sessioni")) || [];
let obiettivi = JSON.parse(localStorage.getItem("obiettivi")) || [];

let badge = [
    {
        nome: "Prima Sessione",
        icona: "🥉",
        descrizione: "Hai registrato la tua prima sessione.",
        sbloccato: sessioni.length >= 1
    },
    {
        nome: "Skater Costante",
        icona: "🔥",
        descrizione: "Hai registrato almeno 5 sessioni.",
        sbloccato: sessioni.length >= 5
    },
    {
        nome: "Local Hero",
        icona: "📍",
        descrizione: "Hai skateato almeno 10 volte.",
        sbloccato: sessioni.length >= 10
    },
    {
        nome: "Primo Trick",
        icona: "🛹",
        descrizione: "Hai inserito il tuo primo trick.",
        sbloccato: tricks.length >= 1
    },
    {
        nome: "First Make",
        icona: "🏆",
        descrizione: "Hai chiuso il tuo primo trick.",
        sbloccato: tricks.some(t => t.stato === "Chiuso")
    },
    {
        nome: "Trick Hunter",
        icona: "🎯",
        descrizione: "Hai chiuso almeno 5 trick.",
        sbloccato: contaTrickChiusi() >= 5
    },
    {
        nome: "Progress Machine",
        icona: "📈",
        descrizione: "Hai almeno un trick sopra il 70%.",
        sbloccato: tricks.some(t => Number(t.percentuale) >= 70)
    },
    {
        nome: "Goal Crusher",
        icona: "✅",
        descrizione: "Hai completato almeno 3 obiettivi.",
        sbloccato: contaObiettiviCompletati() >= 3
    },
    {
        nome: "Kickflip Dream",
        icona: "✨",
        descrizione: "Hai aggiunto o chiuso un Kickflip.",
        sbloccato: tricks.some(t => t.nome.toLowerCase().includes("kickflip"))
    }
];

mostraBadge();

function contaTrickChiusi() {
    return tricks.filter(t => t.stato === "Chiuso").length;
}

function contaObiettiviCompletati() {
    return obiettivi.filter(o => o.completato).length;
}

function mostraBadge() {
    let lista = document.getElementById("listaBadge");

    lista.innerHTML = "";

    badge.forEach(b => {
        lista.innerHTML += `
            <div class="badge-card ${b.sbloccato ? "badge-unlocked" : "badge-locked"}">
                <div class="badge-icon">${b.sbloccato ? b.icona : "🔒"}</div>
                <h3>${b.nome}</h3>
                <p>${b.descrizione}</p>
                <strong>${b.sbloccato ? "Sbloccato" : "Bloccato"}</strong>
            </div>
        `;
    });
}