const filterButton = document.getElementById('filterButton');
filterButton.addEventListener('click', filterCharacters);

function getCharacters() {
  return fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => data.results)
    .catch(error => {
      console.error('Error:', error);
      showError('Failed to fetch characters');
    });
}

function renderCharacters(characters) {
  const charactersContainer = document.getElementById('characters');
  charactersContainer.innerHTML = '';

  if (characters.length === 0) {
    charactersContainer.innerText = 'No characters found.';
    return;
  }

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const headers = ['Name', 'Status', 'Species', 'Type', 'Gender'];

  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.innerText = headerText;
    headerRow.appendChild(header);
  });

  table.appendChild(headerRow);

  characters.forEach(character => {
    const row = document.createElement('tr');
    const values = [
      character.name,
      character.status,
      character.species,
      character.type,
      character.gender
    ];

    values.forEach(value => {
      const cell = document.createElement('td');
      cell.innerText = value;
      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  charactersContainer.appendChild(table);
}

function filterCharacters() {
  const name = document.getElementById('nameInput').value.trim();
  const status = document.getElementById('statusInput').value.trim();
  const species = document.getElementById('speciesInput').value.trim();
  const type = document.getElementById('typeInput').value.trim();
  const gender = document.getElementById('genderInput').value.trim();

  const url = `https://rickandmortyapi.com/api/character?name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        showError(data.error);
      } else {
        renderCharacters(data.results);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showError('Failed to fetch characters');
    });
}

function showError(message) {
  const charactersContainer = document.getElementById('characters');
  charactersContainer.innerText = `Error: ${message}`;
}
