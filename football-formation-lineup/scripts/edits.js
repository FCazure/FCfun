// logo team edit
document.getElementById('logo-input').addEventListener('change', function(e) {
  var reader = new FileReader();
  reader.onload = function(event) {
    document.getElementById('team-logo').src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function clearText(element) {
    if (element.innerText === 'NONE') {
        element.innerText = '';
        element.classList.remove('placeholder');
    }
}

function fillText(element) {
    if (element.innerText === '') {
        element.innerText = 'NONE';
        element.classList.add('placeholder');
    }
}
