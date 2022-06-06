const reservationsURL = new URL('http://localhost:8080/reservations');
const reservationCount = document.getElementById('reservationCount');

// Appel de l'api créée pour affichage dans le navigateur
fetch(reservationsURL).then(manageResponse).then(displayData);

function manageResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.status);
    }
}

function displayData(dataTable) {
    const reservations = []; // liste des reservations
    for (let reservation of dataTable) {
        Reflect.deleteProperty(reservation, '_id'); // Retire les propriétés qu'on ne veut pas afficher
        Reflect.deleteProperty(reservation, '__v'); // Retire les propriétés qu'on ne veut pas afficher
        console.log(reservation);
        reservations.push(reservation);
        const tbody = document.getElementById('tbody'); // élément tbody du tableau
        const newRow = tbody.insertRow();
        let counter = 0;
        for (const key in reservation) {
            const newCell = newRow.insertCell(counter);
            // La Méthode createTextNode() permet de créer un noeud de texte
            const newText = document.createTextNode(reservation[key]);
            newCell.appendChild(newText);
            counter++;
        }
    }

    reservationCount.innerText = `(${reservations.length})`;
}
