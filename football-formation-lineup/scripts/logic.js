document.addEventListener('DOMContentLoaded', (event) => {
  fetch('http://localhost/football-formation-lineup/get-players.php') // Ganti URL ini dengan lokasi skrip PHP Anda
    .then(response => response.json())
    .then(players => {
      shuffleArray(players);

      let subPlayersHtml = '';
      players.forEach(player => {
        subPlayersHtml += `<div class="sub-player"><img id="${player.id}" src="${player.src}" names="${player.names}" alt="${player.alt}" data-ovr="${player.ovr}" data-coinValue="${player.coinValue}" data-position="${player.position}" data-region="${player.region}" data-national="${player.national}" data-league="${player.league}" data-club="${player.club}" data-season="${player.season}" data-programs="${player.programs}" draggable="true"></div>`;
      });
      document.getElementById('imageContainer').innerHTML = subPlayersHtml;

      addDragAndDropListeners();
    })
    .catch(error => {
      console.error('Error loading the player data:', error);
    });

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function addDragAndDropListeners() {
    function allowDragOver(ev) {
      ev.preventDefault();
    }

    function handleDrop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      var draggedImage = document.getElementById(data);
      var targetImage = ev.target.closest('.player').querySelector('img');
      var targetPosition = ev.target.closest('.player').querySelector('p');

      if (targetImage && draggedImage) {
        targetImage.src = draggedImage.src;
        targetImage.alt = draggedImage.alt;
        var ovr = parseInt(draggedImage.getAttribute('data-ovr'));
        var position = draggedImage.getAttribute('data-position');
        if (position !== targetPosition.innerText) {
          // Logika penurunan OVR berdasarkan posisi pemain dan posisi target
          // ...
          if ((position === 'LW' || position === 'RW') && targetPosition.innerText === 'ST' || (position === 'ST') && (targetPosition.innerText === 'LW' || targetPosition.innerText === 'RW')) {
            ovr -= 2;
          } else if ((position === 'CM' && targetPosition.innerText === 'CAM') || (position === 'CAM' && targetPosition.innerText === 'CM')) {
            ovr -= 2;
          } else if ((position === 'CM' && targetPosition.innerText === 'CDM') || (position === 'CDM' && targetPosition.innerText === 'CM')) {
            ovr -= 2;
          } else if ((position === 'CB' && (targetPosition.innerText === 'LB' || targetPosition.innerText === 'RB')) || ((position === 'LB' || position === 'RB') && targetPosition.innerText === 'CB')) {
            ovr -= 2;
          } else if (position === 'GK' && targetPosition.innerText !== 'GK') {
            ovr -= 20;
          } else if ((position === 'LW' || position === 'ST' || position === 'RW') && (targetPosition.innerText === 'CM' || targetPosition.innerText === 'CAM' || targetPosition.innerText === 'CDM')) {
            ovr -= 3;
          } else if ((position === 'CM' || position === 'CAM') && (targetPosition.innerText === 'CB' || targetPosition.innerText === 'LB' || targetPosition.innerText === 'RB' || targetPosition.innerText === 'RWB' || targetPosition.innerText === 'LWB')) {
            ovr -= 3;
          } else if ((position === 'CDM' && targetPosition.innerText === 'CB') || (position === 'CB' && targetPosition.innerText === 'CDM')) {
            ovr -= 1;
          } else if ((position === 'CDM' && (targetPosition.innerText === 'LB' || targetPosition.innerText === 'RB')) || ((position === 'LB' || position === 'RB') && targetPosition.innerText === 'CDM')) {
            ovr -= 2;
          } else if ((position === 'LW' || position === 'ST' || position === 'RW') && (targetPosition.innerText === 'CB' || targetPosition.innerText === 'LB' || targetPosition.innerText === 'RB')) {
            ovr -= 8;
          } else if ((position === 'LM' || position === 'RM' || position === 'CF') && (targetPosition.innerText === 'LW' || targetPosition.innerText === 'ST' || targetPosition.innerText === 'RW')) {
            ovr -= 1;
          } else if ((position === 'LM' || position === 'RM' || position === 'CF') && (targetPosition.innerText === 'CM' || targetPosition.innerText === 'CAM' || targetPosition.innerText === 'CDM')) {
            ovr -= 2;
          } else if ((position === 'LM' || position === 'RM' || position === 'CF') && (targetPosition.innerText === 'CB' || targetPosition.innerText === 'LB' || targetPosition.innerText === 'RB')) {
            ovr -= 3;
          } else if ((position === 'LWB' || position === 'RWB') && (targetPosition.innerText === 'CB' || targetPosition.innerText === 'LB' || targetPosition.innerText === 'RB')) {
            ovr -= 1;
          } else if ((position === 'LWB' || position === 'RWB') && (targetPosition.innerText === 'CM' || targetPosition.innerText === 'CAM' || targetPosition.innerText === 'CDM')) {
            ovr -= 2;
          } else if ((position === 'LWB' || position === 'RWB') && (targetPosition.innerText === 'CF' || targetPosition.innerText === 'ST' || targetPosition.innerText === 'LW' || targetPosition.innerText === 'RW')) {
            ovr -= 4;
          } else if (position !== 'GK' && targetPosition.innerText === 'GK') {
            ovr -= 20;
          }

          targetPosition.style.color = 'orange';
        } else {
          targetPosition.style.color = 'lime';
        }
        // Jika posisi kartu adalah GK dan posisi target bukan GK, ubah warna teks menjadi merah
        if (position === 'GK' && targetPosition.innerText !== 'GK') {
          targetPosition.style.color = 'red';
        }
        targetImage.setAttribute('data-ovr', ovr.toString());
        targetImage.setAttribute('data-coinValue', draggedImage.getAttribute('data-coinValue'));
        calculateTotals();
      }
    }

    const playerPositions = document.querySelectorAll('.player img');
    playerPositions.forEach(img => {
      img.addEventListener('dragover', allowDragOver);
      img.addEventListener('drop', handleDrop);
      // Jika gambar pemain adalah placeholder, ubah warna teks menjadi abu-abu
      if (img.src.includes('placeholder')) {
        img.nextElementSibling.style.color = 'grey';
      }
    });

    const subPlayerImages = document.querySelectorAll('.sub-player img');
    subPlayerImages.forEach(img => {
      img.setAttribute('draggable', true);
      img.addEventListener('dragstart', function(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      });
    });
  }

  function calculateTotals() {
  const players = document.querySelectorAll('.player img');

  let totalOvr = 0;
  let totalCoinValue = 0;
  let playerCount = 0;

  players.forEach(player => {
    const ovr = parseInt(player.getAttribute('data-ovr'));
    const coinValue = parseInt(player.getAttribute('data-coinValue'));

    if (!isNaN(ovr) && !isNaN(coinValue)) {
      totalOvr += ovr;
      totalCoinValue += coinValue;
      playerCount++;
    }
  });

  // Modifikasi perhitungan rata-rata OVR
  let averageOvr;
  if (playerCount < 11) {
    averageOvr = Math.round(totalOvr / 11);
  } else {
    averageOvr = Math.round(totalOvr / playerCount);
  }
  document.getElementById('team-rating').textContent = isNaN(averageOvr) ? 0 : averageOvr;

  // Tetap mempertahankan fungsi ini
  document.getElementById('team-value-number').textContent = isNaN(totalCoinValue) ? 0 : totalCoinValue.toLocaleString('id-ID', {useGrouping: true, minimumFractionDigits: 0});

  // Panggil fungsi animateValueChange dengan totalCoinValue baru
  animateValueChange(totalCoinValue);
}

  // Fungsi filterImages Anda
  function filterImages() {
    var input, filter, container, divs, img, i, fileName, altText, names;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase().replace('.', '');
    container = document.getElementById('imageContainer');
    divs = container.getElementsByClassName('sub-player');

    for (i = 0; i < divs.length; i++) {
      img = divs[i].getElementsByTagName('img')[0];
      fileName = img.src.split('/').pop().toUpperCase().replace('.', ''); // Get the file name only
      altText = img.alt.toUpperCase().replace('.', ''); // Get the alt text
      names = img.getAttribute('names').toUpperCase().replace('.', ''); // Get the names attribute
      if (fileName.indexOf(filter) > -1 || altText.indexOf(filter) > -1 || names.indexOf(filter) > -1) {
        divs[i].style.display = "";
      } else {
        divs[i].style.display = "none";
      }
    }
  }

  // Menambahkan event listener untuk event onkeyup pada input pencarian
  document.getElementById('searchInput').addEventListener('keyup', filterImages);
});
