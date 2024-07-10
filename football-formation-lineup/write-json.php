<!-- write-json.php -->
<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');

    if (json_decode($json) !== null) { // Periksa apakah JSON valid
        // Ubah path file JSON sesuai dengan direktori proyek Anda
        $jsonPath = 'players.json'; // Misalnya, jika file players.json berada di direktori yang sama dengan script ini
        $result = file_put_contents($jsonPath, $json);

        if ($result !== false) {
            echo "Data berhasil ditulis ke file JSON";
        } else {
            echo "Gagal menulis ke file JSON";
        }
    } else {
        echo "JSON tidak valid";
    }
} else {
    echo "Tidak ada data yang dikirimkan";
}

?>
