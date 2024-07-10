// filter.js
document.addEventListener('DOMContentLoaded', (event) => {
  fetch('http://localhost/football-formation-lineup/get-players.php')
    .then(response => response.json())
    .then(players => {
      function filterImages() {
        var input, filter, container, divs, img, i, fileName, filterType;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();
        container = document.getElementById('imageContainer');
        divs = container.getElementsByClassName('sub-player');
        filterType = document.getElementById('filter').value;

        for (i = 0; i < divs.length; i++) {
          img = divs[i].getElementsByTagName('img')[0];
          fileName = img.dataset[filterType].toUpperCase(); // Get the file name only
          if (fileName.indexOf(filter) > -1) {
            divs[i].style.display = "";
          } else {
            divs[i].style.display = "none";
          }
        }
      }

      // Tambahkan event listener untuk onchange pada filter
      document.getElementById('filter').addEventListener('change', filterImages);
    })
    .catch(error => {
      console.error('Error loading the player data:', error);
    });
});
