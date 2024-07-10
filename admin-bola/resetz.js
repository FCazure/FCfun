document.getElementById('player-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // ... (kode untuk mengirim data form)
    // Reset the form fields and the preview image after successful submission
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
    document.getElementById('preview').src = '';
    document.getElementById('directory').src = '';
    document.getElementById('table').src = '';
});
function loadFile(event) {
    var output = document.getElementById('preview');
    output.src = URL.createObjectURL(event.target.files[0]);
};
