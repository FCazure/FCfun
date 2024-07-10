<?php
function getDirContents($dir, &$results = array()) {
    $files = scandir($dir);

    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            $results[] = str_replace('\\', '/', str_replace($_SERVER['DOCUMENT_ROOT'] . "/football-formation-lineup/", 'galeri/', $path));
        } elseif (is_dir($path) && $value != "." && $value != "..") {
            getDirContents($path, $results);
        }
    }

    return $results;
}

$dir = $_SERVER['DOCUMENT_ROOT'] . "/football-formation-lineup/galeri/";
$images = getDirContents($dir);
echo json_encode($images);
?>
