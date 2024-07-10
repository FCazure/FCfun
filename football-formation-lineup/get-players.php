<?php
$servername = "localhost";
$username = "root"; // Ganti dengan username MySQL Anda
$password = ""; // Ganti dengan password MySQL Anda
$dbname = "footballDB"; // Ganti dengan nama database Anda

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Query untuk mengambil semua data dari tabel utots_24
$sql1 = "SELECT * FROM season_24";
$result1 = $conn->query($sql1);

// Query untuk mengambil semua data dari tabel utoty_24
$sql2 = "SELECT * FROM season_6_7";
$result2 = $conn->query($sql2);

$players = array(); // Array untuk menyimpan data pemain

if ($result1->num_rows > 0) {
  // Output data dari setiap baris
  while($row = $result1->fetch_assoc()) {
    $players[] = $row; // Menambahkan data pemain ke array
  }
}

if ($result2->num_rows > 0) {
  // Output data dari setiap baris
  while($row = $result2->fetch_assoc()) {
    $players[] = $row; // Menambahkan data pemain ke array
  }
}

if (empty($players)) {
  echo "0 results";
} else {
  echo json_encode($players); // Mengubah array pemain menjadi JSON
}

$conn->close(); // Menutup koneksi ke database
?>
