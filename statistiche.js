let tricks = JSON.parse(localStorage.getItem("tricks")) || [];
let sessioni = JSON.parse(localStorage.getItem("sessioni")) || [];

mostraStatistiche();

function mostraStatistiche() {

    let box = document.getElementById("statistiche");

    let trickTotali = tricks.length;

    let trickChiusi = tricks.filter(
        t => t.stato === "Chiuso"
    ).length;

    let sessioniTotali = sessioni.length;

    let tempoTotale = 0;

    sessioni.forEach(s => {
        tempoTotale += Number(s.durata || 0);
    });

    let oreTotali = (tempoTotale / 60).toFixed(1);

    let spotContatore = {};

    sessioni.forEach(s => {

        if (!spotContatore[s.spot]) {
            spotContatore[s.spot] = 1;
        } else {
            spotContatore[s.spot]++;
        }

    });

    let spotPreferito = "Nessuno";
    let max = 0;

    for (let spot in spotContatore) {

        if (spotContatore[spot] > max) {
            max = spotContatore[spot];
            spotPreferito = spot;
        }

    }

    let mediaPercentuali = 0;

    if (tricks.length > 0) {

        tricks.forEach(t => {
            mediaPercentuali += t.percentuale;
        });

        mediaPercentuali =
            (mediaPercentuali / tricks.length).toFixed(1);

    }

    box.innerHTML = `

        <div class="trick">
            🛹 Trick Totali: <b>${trickTotali}</b>
        </div>

        <div class="trick">
            🏆 Trick Chiusi: <b>${trickChiusi}</b>
        </div>

        <div class="trick">
            📅 Sessioni Totali: <b>${sessioniTotali}</b>
        </div>

        <div class="trick">
            ⏱️ Ore Totali Skateate: <b>${oreTotali}</b>
        </div>

        <div class="trick">
            📍 Spot Preferito: <b>${spotPreferito}</b>
        </div>

        <div class="trick">
            📈 Percentuale Media Trick: <b>${mediaPercentuali}%</b>
        </div>

    `;
}