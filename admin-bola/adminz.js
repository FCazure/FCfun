fetch('../football-formation-lineup/json-list/national.json')
.then(response => response.json())
.then(nationals => {
  const nationalSelect = document.getElementById('national');
  nationals.forEach(national => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = national.name;
    national.countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country + '|' + national.name; // Ubah nilai menjadi kombinasi negara dan region
      option.text = country;
      optgroup.appendChild(option);
    });
    nationalSelect.appendChild(optgroup);
  });
});


fetch('../football-formation-lineup/json-list/club.json')
.then(response => response.json())
.then(leagues => {
  const clubSelect = document.getElementById('club');
  leagues.forEach(league => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = league.league;
    league.clubs.forEach(club => {
      const option = document.createElement('option');
      option.value = club + '|' + league.league; // Ubah nilai menjadi kombinasi klub dan liga
      option.text = club;
      optgroup.appendChild(option);
    });
    clubSelect.appendChild(optgroup);
  });
});



fetch('../football-formation-lineup/json-list/position.json')
.then(response => response.json())
.then(positions => {
  const positionSelect = document.getElementById('position');
  positions.forEach(position => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = position.position;
    position.list.forEach(posisi => {
      const option = document.createElement('option');
      option.value = posisi;
      option.text = posisi;
      optgroup.appendChild(option);
    });
    positionSelect.appendChild(optgroup);
  });
});

fetch('../football-formation-lineup/json-list/programs.json')
.then(response => response.json())
.then(seasons => {
  const programsSelect = document.getElementById('programs');
  seasons.forEach(season => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = season.season;
    season.programs.forEach(program => {
      const option = document.createElement('option');
      option.value = program + '|' + season.season; // Ubah nilai menjadi kombinasi program dan season
      option.text = program;
      optgroup.appendChild(option);
    });
    programsSelect.appendChild(optgroup);
  });
});

fetch('../football-formation-lineup/json-list/directories.json')
.then(response => response.json())
.then(directories => {
  const directorySelect = document.getElementById('directory');
  directories.forEach(directory => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = directory.directory;
    directory.list.forEach(dir => {
      const option = document.createElement('option');
      option.value = dir;
      option.text = dir;
      optgroup.appendChild(option);
    });
    directorySelect.appendChild(optgroup);
  });
});
