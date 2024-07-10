// JavaScript
// Fungsi untuk mengubah formasi
async function changeFormation(formation) {
  var container = document.getElementById('container');
  var formationElement = document.getElementById('formation');
  // Reset kelas formasi
  container.className = 'container1';
  // Tambahkan kelas formasi baru
  if (formation == '4-3-3 Attack') {
    container.className += ' formation-433attack';
    await changePlayerPosition('cam', 'CAM', 'galeri/FC_placeholder/2_CAM.svg');
  } else if (formation == '4-3-3 Holding') {
    container.className += ' formation-433holding';
    await changePlayerPosition('cam', 'CDM', 'galeri/FC_placeholder/2_CDM.svg');
  } else if (formation == '4-3-3 Flat') {
    container.className += ' formation-433flat';
    await changePlayerPosition('cam', 'CM', 'galeri/FC_placeholder/2_CM.svg');
  } else if (formation == '4-2-4') {
    container.className += ' formation-424';
    await changePlayerPosition('cam', 'ST', 'galeri/FC_placeholder/1_ST.svg');
  }
  // Tambahkan kode untuk formasi lainnya jika diperlukan

  // Ubah teks dalam elemen dengan id 'formation'
  formationElement.innerText = formation;
}

async function changePlayerPosition(playerClass, newPosition, newImageSrc) {
  const playerElement = document.getElementsByClassName(playerClass)[0];
  const playerImage = playerElement.getElementsByTagName('img')[0];
  const playerPosition = playerElement.getElementsByTagName('p')[0];
  const oldPosition = playerPosition.innerText;


  // Ubah posisi dan gambar pemain
  playerPosition.innerText = newPosition;
  playerImage.src = newImageSrc;
}
