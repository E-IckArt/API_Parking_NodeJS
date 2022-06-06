const parkingsURL = new URL('http://localhost:8080/parkings');
const parkingCount = document.getElementById('parkingCount');

// Appel de l'api créée pour affichage dans le navigateur
fetch(parkingsURL).then(manageResponse).then(displayData);

function manageResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.status);
    }
}

function displayData(dataTable) {
    const parkings = []; // liste des reservations
    for (let parking of dataTable) {
        Reflect.deleteProperty(parking, '_id'); // Retire les propriétés qu'on ne veut pas afficher
        Reflect.deleteProperty(parking, '__v'); // Retire les propriétés qu'on ne veut pas afficher
        console.log(parking);
        parkings.push(parking);
        // Créer une nouvelle ligne dans le tableau
        const tbody = document.getElementById('tbody'); // élément tbody du tableau
        const newRow = tbody.insertRow();
        let counter = 0;
        for (const key in parking) {
            const newCell = newRow.insertCell(counter);
            // La Méthode createTextNode() permet de créer un noeud de texte
            const newText = document.createTextNode(parking[key]);
            newCell.appendChild(newText);
            counter++;
        }
    }

    parkingCount.innerText = `(${parkings.length})`;
}
