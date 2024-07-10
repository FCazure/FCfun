// JavaScript
document.addEventListener('DOMContentLoaded', (event) => {
  const playerElements = document.querySelectorAll('.player');
  const toggleSubsButton = document.getElementById('toggleSubsButton');
  const sidebar = document.getElementById('sidebar');

  // Toggle sidebar visibility
  toggleSubsButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });

  playerElements.forEach(player => {
    new Sortable(player, {
      group: 'shared', // set the same group name for all player elements
      animation: 150,
      swap: true, // Enable swap plugin
      swapClass: 'highlight', // The class applied to the hovered swap item
      filter: '.non-draggable',
      onStart: function (evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        // Jika gambar adalah placeholder, hentikan event
        if (itemEl.querySelector('img').src.includes('placeholder')) {
          evt.preventDefault();
        }
      },
      onAdd: function (evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        // Jika gambar adalah pemain, buat menjadi draggable
        if (!itemEl.querySelector('img').src.includes('placeholder')) {
          itemEl.querySelector('img').classList.remove('non-draggable');
          itemEl.querySelector('p').classList.remove('non-draggable');
        }
      },
      onSort: function (evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        // Jika gambar adalah placeholder, hentikan event
        if (itemEl.querySelector('img').src.includes('placeholder')) {
          evt.preventDefault();
        }
      },
    });
  });

  // ...rest of your code (if there's any)
});
