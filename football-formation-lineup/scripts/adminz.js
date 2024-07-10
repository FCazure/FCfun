document.getElementById('player-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil nilai dari setiap field form
    const src = document.getElementById('src').files[0]; // Ini adalah file gambar
    const names = document.getElementById('names').value;
    const alt = document.getElementById('alt').value;
    const ovr = document.getElementById('ovr').value;
    const level = document.getElementById('level').value;
    const coinValue = document.getElementById('coinValue').value;
    const position = document.getElementById('position').value;
    const directory = document.getElementById('directory').value; // Ini adalah direktori yang dipilih
    const table = document.getElementById('table').value;

    // Dapatkan elemen option yang dipilih
    const nationalOption = document.querySelector(`#national option[value="${document.getElementById('national').value}"]`);
    const national = nationalOption.value;
    const region = nationalOption.dataset.region; // Ambil region dari atribut data

    // Dapatkan elemen option yang dipilih
    const clubOption = document.querySelector(`#club option[value="${document.getElementById('club').value}"]`);
    const club = clubOption.value;
    const league = clubOption.dataset.league; // Ambil liga dari atribut data

    // Dapatkan elemen option yang dipilih
    const programsOption = document.querySelector(`#programs option[value="${document.getElementById('programs').value}"]`);
    const programs = programsOption.value;
    const season = programsOption.dataset.season; // Ambil season dari atribut data

    // Buat objek FormData dan tambahkan semua nilai ke dalamnya
    const formData = new FormData();
    formData.append('src', src); // Tambahkan file gambar ke form data
    formData.append('names', names);
    formData.append('alt', alt);
    formData.append('ovr', ovr);
    formData.append('level', level);
    formData.append('coinValue', coinValue);
    formData.append('position', position);
    formData.append('region', region);
    formData.append('national', national);
    formData.append('league', league); // Tambahkan liga ke form data
    formData.append('club', club);
    formData.append('season', season);
    formData.append('programs', programs);
    formData.append('directory', directory); // Tambahkan direktori ke form data
    formData.append('table', table);

    // Kirim form data ke server
    fetch('http://localhost/football-formation-lineup/uploadz.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        console.log(text);
        // Reset the form fields after successful submission
        document.getElementById('src').value = '';
        document.getElementById('names').value = '';
        document.getElementById('alt').value = '';
        document.getElementById('ovr').value = '';
        document.getElementById('level').value = '';
        document.getElementById('coinValue').value = '';
        document.getElementById('position').value = '';
        document.getElementById('region').value = '';
        document.getElementById('national').value = '';
        document.getElementById('league').value = '';
        document.getElementById('club').value = '';
        document.getElementById('season').value = '';
        document.getElementById('programs').value = '';
        document.getElementById('directory').value = ''; // Reset field direktori
    });
});
