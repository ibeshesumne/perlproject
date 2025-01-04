// Fetch and display existing letters
function fetchLetters() {
    fetch('letters.php?action=read')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#lettersTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(letter => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${letter.id}</td>
                    <td>${letter.title}</td>
                    <td>${letter.sender}</td>
                    <td>${letter.recipient}</td>
                    <td>${letter.date}</td>
                    <td>${letter.content}</td>
                    <td>
                        <button onclick="deleteLetter(${letter.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching letters:', error));
}

// Handle form submission to add a new letter
document.querySelector('#addLetterForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('letters.php?action=create', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchLetters(); // Refresh the table
        })
        .catch(error => console.error('Error adding letter:', error));
});

// Delete a letter
function deleteLetter(id) {
    if (confirm('Are you sure you want to delete this letter?')) {
        fetch(`letters.php?action=delete&id=${id}`)
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                fetchLetters(); // Refresh the table
            })
            .catch(error => console.error('Error deleting letter:', error));
    }
}

// Fetch letters on page load
fetchLetters();
