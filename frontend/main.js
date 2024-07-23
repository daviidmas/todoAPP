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

        const editCell = document.createElement("td")
        const editBtn = document.createElement("button")
        editBtn.setAttribute('type', 'button');
        editBtn.classList.add('btn');
        editBtn.classList.add('btn-secondary')
        editBtn.id = "btnEdit";
        editBtn.textContent = 'Edit';
        editCell.appendChild(editBtn)
        row.appendChild(editCell);

        const saveEditBtn = document.createElement("button")
        saveEditBtn.setAttribute('type', 'button');
        saveEditBtn.classList.add('btn');
        saveEditBtn.classList.add('btn-success')
        saveEditBtn.id = "btnEdit";
        saveEditBtn.textContent = 'Save';
        saveEditBtn.style.display = 'none'
        editCell.appendChild(saveEditBtn)

        const cancelEditBtn = document.createElement("button")
        cancelEditBtn.setAttribute('type', 'button');
        cancelEditBtn.classList.add('btn');
        cancelEditBtn.classList.add('btn-danger')
        cancelEditBtn.id = "btnEdit";
        cancelEditBtn.textContent = 'Cancel';
        cancelEditBtn.style.display = 'none'
        editCell.appendChild(cancelEditBtn)

        editBtn.addEventListener('click', function() {
            let nameCellText = nameCell.innerText
            let descCellText  = descCell.innerText
            
            nameCell.innerHTML = `<input type="text" value="${nameCellText}">`;
            descCell.innerHTML = `<input type="text" value="${descCellText}">`;
       
            
            editBtn.style.display = 'none'
            saveEditBtn.style.display = 'inline'
            cancelEditBtn.style.display = 'inline'

            saveEditBtn.addEventListener('click', async () => {
                editBtn.style.display = 'inline'
                saveEditBtn.style.display = 'none'
                cancelEditBtn.style.display = 'none'

                nameCell.innerHTML = `${nameCell.querySelector('input').value}`;
                descCell.innerHTML = `${descCell.querySelector('input').value}`;

                const res = await fetch(apiUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        id: idCell.innerText,
                        name: nameCell.innerText,
                        description: descCell.innerText
                    })
                })


            });


            cancelEditBtn.addEventListener('click', async () => {
                editBtn.style.display = 'inline'
                saveEditBtn.style.display = 'none'
                cancelEditBtn.style.display = 'none'

                nameCell.innerHTML = `${nameCellText}`;
                descCell.innerHTML = `${descCellText}`;
            });
        });

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
    const res = await fetch(apiUrl, {
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

