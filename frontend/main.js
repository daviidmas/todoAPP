const apiUrl = "https://localhost:7189/api/TodoTask";

// Function to fetch data from API and populate the table
function fetchDataAndPopulateTable() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Function to populate the existing table
function populateTable(data) {
    const tbody = document.getElementById("table-body");

    // Clear any existing rows
    tbody.innerHTML = "";

    // Populate table rows
    data.forEach(item => {
        const row = document.createElement("tr");

        // Assuming the API returns fields "id", "name", and "description"
        const idCell = document.createElement("td");
        idCell.appendChild(document.createTextNode(item.id));
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.appendChild(document.createTextNode(item.name));
        row.appendChild(nameCell);

        const descCell = document.createElement("td");
        descCell.appendChild(document.createTextNode(item.description)); // Example field
        row.appendChild(descCell);

        const deleteCell = document.createElement("td")
        const deleteBtn = document.createElement("button")
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('btn-danger')
        deleteBtn.id = "btnDelete";
        deleteBtn.textContent = 'Delete';
        deleteCell.appendChild(deleteBtn)
        row.appendChild(deleteCell);

        deleteBtn.addEventListener("click", async (e) => {
            try {
                const response = await fetch(apiUrl+"/"+item.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                location.reload();
            } catch (error) {
                console.error(error)
            }
        })

        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", fetchDataAndPopulateTable());


const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    //e.preventDefault();
    const res = fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            name: e.target[1].value,
            description: e.target[2].value
        })
    })

    console.log(res)
    fetchDataAndPopulateTable();

    /*
    if (!res.ok) {
        console.error("Error en la respuesta")
        return;
    }
    let data = await res.json();

    console.log(data) */

    
})

