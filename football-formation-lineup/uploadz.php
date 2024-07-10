<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "footballDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Generate ID
    $table = $_POST['table']; // Ini adalah tabel yang dipilih
    $result = $conn->query("SELECT id FROM $table ORDER BY id DESC LIMIT 1");
    $row = $result->fetch_assoc();
    $id = $row ? str_pad((int) $row['id'] + 1, 8, '0', STR_PAD_LEFT) : '00000001';

    $names = $_POST['names'] ?? '';
    $alt = $_POST['alt'] ?? '';
    $ovr = isset($_POST['ovr']) ? (int)$_POST['ovr'] : 0; // Cast to int to avoid out of range error
    $level = isset($_POST['level']) ? (int)$_POST['level'] : 0; // Cast to int to avoid out of range error
    $coinValue = isset($_POST['coinValue']) ? (int)$_POST['coinValue'] : 0; // Cast to int to avoid out of range error
    $position = $_POST['position'] ?? '';
    $nationalRegion = explode('|', $_POST['national']);
    $national = $nationalRegion[0];
    $region = count($nationalRegion) > 1 ? $nationalRegion[1] : ''; // Jika ada region, gunakan region tersebut
    $clubLeague = explode('|', $_POST['club']);
    $club = $clubLeague[0];
    $league = count($clubLeague) > 1 ? $clubLeague[1] : ''; // Jika ada liga, gunakan liga tersebut
    $programsSeason = explode('|', $_POST['programs']);
    $programs = $programsSeason[0];
    $season = count($programsSeason) > 1 ? $programsSeason[1] : ''; // Jika ada season, gunakan liga tersebut

    // Handle the uploaded file
    $ext = pathinfo($_FILES['src']['name'], PATHINFO_EXTENSION); // Get the extension of the uploaded file
    $directory = $_POST['directory']; // Ini adalah direktori yang dipilih
    $src = $directory . '/' . $alt . '.' . $ext; // Append the extension to the filename
    if (isset($_FILES['src']) && move_uploaded_file($_FILES['src']['tmp_name'], $src)) {
        echo "File is valid, and was successfully uploaded.\n";
    } else {
        echo "Possible file upload attack!\n";
    }

    $sql = "INSERT INTO $table (id, src, names, alt, ovr, level, coinValue, position, region, national, league, club, season, programs)
    VALUES ('$id', '$src', '$names', '$alt', '$ovr', '$level', '$coinValue', '$position', '$region', '$national', '$league', '$club', '$season', '$programs')";

    if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Tidak ada data yang dikirimkan";
}

$conn->close();
?>
