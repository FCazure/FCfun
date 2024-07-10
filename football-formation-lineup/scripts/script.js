// script.js
document.getElementById('data-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const src = document.getElementById('src').value;
    const alt = document.getElementById('alt').value;
    const ovr = document.getElementById('ovr').value;
    const coinValue = document.getElementById('coinValue').value;
    const position = document.getElementById('position').value;
    const region = document.getElementById('region').value;

    // Read the existing JSON file
fetch('http://localhost/football-formation-lineup/players.json?' + new Date().getTime())

        .then(response => response.json())
        .then(data => {
            // Add new data to the array
            data.push({ id, src, alt, ovr, coinValue, position, region });

            // Write the updated array back to the JSON file
            fetch('http://localhost/football-formation-lineup/write-json.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(text => {
                console.log(text);
                // Reset the form fields after successful submission
                document.getElementById('id').value = '';
                document.getElementById('src').value = '';
                document.getElementById('alt').value = '';
                document.getElementById('ovr').value = '';
                document.getElementById('coinValue').value = '';
                document.getElementById('position').value = '';
                document.getElementById('region').value = '';
            });
        });
});
