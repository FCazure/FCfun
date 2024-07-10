// Mendapatkan elemen HTML
var teamRating = document.getElementById('team-rating');
var teamText2 = document.getElementById('team-text2');

// Simpan nilai OVR sebelumnya
var previousOvr = parseInt(teamRating.innerText);

// Fungsi untuk mengubah gambar berdasarkan nilai OVR
function updateOvrImage() {
  var ovr = parseInt(teamRating.innerText);
  var imageUrl;

  if (ovr >= 100) {
    imageUrl = 'galeri/ovr-logo/ovr_blue.png';
  } else if (ovr >= 90) {
    imageUrl = 'galeri/ovr-logo/ovr_purple.png';
  } else if (ovr >= 80) {
    imageUrl = 'galeri/ovr-logo/ovr_gold.png';
  } else if (ovr >= 70) {
    imageUrl = 'galeri/ovr-logo/ovr_silver.png';
  } else {
    imageUrl = 'galeri/ovr-logo/ovr_bronze.png';
  }

  teamText2.style.backgroundImage = 'url(' + imageUrl + ')';

  // Ubah warna teks berdasarkan apakah OVR bertambah atau berkurang
  if (ovr > previousOvr) {
    teamRating.style.color = 'green';
  } else if (ovr < previousOvr) {
    teamRating.style.color = 'red';
  }

  // Perbarui nilai OVR sebelumnya
  previousOvr = ovr;
}

// Panggil fungsi saat halaman dimuat
updateOvrImage();

// Buat instance dari MutationObserver
var observer = new MutationObserver(function(mutations) {
  // Sembunyikan elemen sebelum transisi
  teamRating.style.opacity = '0';
  teamRating.style.transform = 'translateY(15px)';

  // Ubah gambar dan tampilkan elemen setelah transisi
  setTimeout(function() {
    updateOvrImage();
    teamRating.style.transform = 'translateY(0)';
    teamRating.style.opacity = '1';
  }, 400);

  // Kembalikan warna teks ke putih setelah transisi
  setTimeout(function() {
    teamRating.style.color = 'white';
  }, 900);
});

// Mulai mengamati perubahan pada elemen dengan konfigurasi tertentu
observer.observe(teamRating, { childList: true, subtree: true });
