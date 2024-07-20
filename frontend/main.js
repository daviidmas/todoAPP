document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://localhost:7189/api/TodoTask"; // Example API URL

    // Fetch data from API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

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
            descCell.appendChild(document.createTextNode(item.username)); // Example field
            row.appendChild(descCell);

            tbody.appendChild(row);
        });
    }
});
