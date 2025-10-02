// Amiibo Viewer JavaScript
let amiiboCharacters = [];
let gameSeries = [];
let amiiboSeries = [];
let amiiboTypes = [];
let selectedCharacter = null;
let selectedGameSeries = null;
let selectedAmiiboSeries = null;
let selectedType = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Amiibo Viewer application loaded');
    
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    console.log('Application initialized');
    
    // Set up event listeners
    setupEventListeners();
    
    // Fetch amiibo characters, game series, amiibo series, and types from API
    fetchAmiiboCharacters();
    fetchGameSeries();
    fetchAmiiboSeries();
    fetchAmiiboTypes();
}

function setupEventListeners() {
    const searchInput = document.getElementById('amiibo-search');
    const gameseriesInput = document.getElementById('gameseries-search');
    const amiiboseriesInput = document.getElementById('amiiboseries-search');
    const typeInput = document.getElementById('type-search');
    const dropdown = document.getElementById('amiibo-dropdown');
    const gameseriesDropdown = document.getElementById('gameseries-dropdown');
    const amiiboseriesDropdown = document.getElementById('amiiboseries-dropdown');
    const typeDropdown = document.getElementById('type-dropdown');
    
    // Clear buttons
    const amiiboClearBtn = document.getElementById('amiibo-clear');
    const gameseriesClearBtn = document.getElementById('gameseries-clear');
    const amiiboseriesClearBtn = document.getElementById('amiiboseries-clear');
    const typeClearBtn = document.getElementById('type-clear');
    
    // Character search input events
    searchInput.addEventListener('input', handleCharacterSearchInput);
    searchInput.addEventListener('focus', handleCharacterSearchFocus);
    searchInput.addEventListener('blur', handleCharacterSearchBlur);
    searchInput.addEventListener('keydown', handleCharacterSearchKeydown);
    
    // Game series search input events
    gameseriesInput.addEventListener('input', handleGameSeriesSearchInput);
    gameseriesInput.addEventListener('focus', handleGameSeriesSearchFocus);
    gameseriesInput.addEventListener('blur', handleGameSeriesSearchBlur);
    gameseriesInput.addEventListener('keydown', handleGameSeriesSearchKeydown);
    
    // Amiibo series search input events
    amiiboseriesInput.addEventListener('input', handleAmiiboSeriesSearchInput);
    amiiboseriesInput.addEventListener('focus', handleAmiiboSeriesSearchFocus);
    amiiboseriesInput.addEventListener('blur', handleAmiiboSeriesSearchBlur);
    amiiboseriesInput.addEventListener('keydown', handleAmiiboSeriesSearchKeydown);
    
    // Type search input events
    typeInput.addEventListener('input', handleTypeSearchInput);
    typeInput.addEventListener('focus', handleTypeSearchFocus);
    typeInput.addEventListener('blur', handleTypeSearchBlur);
    typeInput.addEventListener('keydown', handleTypeSearchKeydown);
    
    // Clear button events
    amiiboClearBtn.addEventListener('click', clearCharacterSelection);
    gameseriesClearBtn.addEventListener('click', clearGameSeriesSelection);
    amiiboseriesClearBtn.addEventListener('click', clearAmiiboSeriesSelection);
    typeClearBtn.addEventListener('click', clearTypeSelection);
    
    // Click outside to close dropdowns
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown-container')) {
            hideCharacterDropdown();
            hideGameSeriesDropdown();
            hideAmiiboSeriesDropdown();
            hideTypeDropdown();
        }
    });
}

async function fetchAmiiboCharacters() {
    try {
        console.log('Fetching amiibo characters from API...');
        const response = await fetch('https://www.amiiboapi.com/api/character/');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        amiiboCharacters = data.amiibo || [];
        
        console.log(`Loaded ${amiiboCharacters.length} amiibo characters`);
        
        // Initial display of all characters
        displayCharacters(amiiboCharacters);
        
    } catch (error) {
        console.error('Error fetching amiibo characters:', error);
        displayCharacterError('Failed to load amiibo characters. Please try again later.');
    }
}

async function fetchGameSeries() {
    try {
        console.log('Fetching game series from API...');
        const response = await fetch('https://www.amiiboapi.com/api/gameseries/');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        gameSeries = data.amiibo || [];
        
        console.log(`Loaded ${gameSeries.length} game series`);
        
        // Initial display of all game series
        displayGameSeries(gameSeries);
        
    } catch (error) {
        console.error('Error fetching game series:', error);
        displayGameSeriesError('Failed to load game series. Please try again later.');
    }
}

async function fetchAmiiboSeries() {
    try {
        console.log('Fetching amiibo series from API...');
        const response = await fetch('https://www.amiiboapi.com/api/amiiboseries/');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        amiiboSeries = data.amiibo || [];
        
        console.log(`Loaded ${amiiboSeries.length} amiibo series`);
        
        // Initial display of all amiibo series
        displayAmiiboSeries(amiiboSeries);
        
    } catch (error) {
        console.error('Error fetching amiibo series:', error);
        displayAmiiboSeriesError('Failed to load amiibo series. Please try again later.');
    }
}

async function fetchAmiiboTypes() {
    try {
        console.log('Fetching amiibo types from API...');
        const response = await fetch('https://www.amiiboapi.com/api/type/');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        amiiboTypes = data.amiibo || [];
        
        console.log(`Loaded ${amiiboTypes.length} amiibo types`);
        
        // Initial display of all amiibo types
        displayAmiiboTypes(amiiboTypes);
        
    } catch (error) {
        console.error('Error fetching amiibo types:', error);
        displayAmiiboTypesError('Failed to load amiibo types. Please try again later.');
    }
}

function displayCharacters(characters) {
    const dropdownContent = document.getElementById('dropdown-content');
    
    if (characters.length === 0) {
        dropdownContent.innerHTML = '<div class="no-results">No characters found</div>';
        return;
    }
    
    // Sort characters alphabetically by name
    const sortedCharacters = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    
    dropdownContent.innerHTML = sortedCharacters.map(character => 
        `<div class="dropdown-item" data-key="${character.key}" data-name="${character.name}">
            ${character.name}
        </div>`
    ).join('');
    
    // Add click event listeners to dropdown items
    const dropdownItems = dropdownContent.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            selectCharacter(this.dataset.name, this.dataset.key);
        });
        
        item.addEventListener('mouseenter', function() {
            // Remove previous selection
            dropdownItems.forEach(i => i.classList.remove('selected'));
            // Add selection to current item
            this.classList.add('selected');
        });
    });
}

function displayGameSeries(series) {
    const dropdownContent = document.getElementById('gameseries-dropdown-content');
    
    if (series.length === 0) {
        dropdownContent.innerHTML = '<div class="no-results">No game series found</div>';
        return;
    }
    
    // Sort game series alphabetically by name
    const sortedSeries = [...series].sort((a, b) => a.name.localeCompare(b.name));
    
    dropdownContent.innerHTML = sortedSeries.map(gameSeries => 
        `<div class="dropdown-item" data-key="${gameSeries.key}" data-name="${gameSeries.name}">
            ${gameSeries.name}
        </div>`
    ).join('');
    
    // Add click event listeners to dropdown items
    const dropdownItems = dropdownContent.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            selectGameSeries(this.dataset.name, this.dataset.key);
        });
        
        item.addEventListener('mouseenter', function() {
            // Remove previous selection
            dropdownItems.forEach(i => i.classList.remove('selected'));
            // Add selection to current item
            this.classList.add('selected');
        });
    });
}

function displayAmiiboSeries(series) {
    const dropdownContent = document.getElementById('amiiboseries-dropdown-content');
    
    if (series.length === 0) {
        dropdownContent.innerHTML = '<div class="no-results">No amiibo series found</div>';
        return;
    }
    
    // Sort amiibo series alphabetically by name
    const sortedSeries = [...series].sort((a, b) => a.name.localeCompare(b.name));
    
    dropdownContent.innerHTML = sortedSeries.map(amiiboSeries => 
        `<div class="dropdown-item" data-key="${amiiboSeries.key}" data-name="${amiiboSeries.name}">
            ${amiiboSeries.name}
        </div>`
    ).join('');
    
    // Add click event listeners to dropdown items
    const dropdownItems = dropdownContent.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            selectAmiiboSeries(this.dataset.name, this.dataset.key);
        });
        
        item.addEventListener('mouseenter', function() {
            // Remove previous selection
            dropdownItems.forEach(i => i.classList.remove('selected'));
            // Add selection to current item
            this.classList.add('selected');
        });
    });
}

function displayAmiiboTypes(types) {
    const dropdownContent = document.getElementById('type-dropdown-content');
    
    if (types.length === 0) {
        dropdownContent.innerHTML = '<div class="no-results">No types found</div>';
        return;
    }
    
    // Sort types alphabetically by name
    const sortedTypes = [...types].sort((a, b) => a.name.localeCompare(b.name));
    
    dropdownContent.innerHTML = sortedTypes.map(type => 
        `<div class="dropdown-item" data-key="${type.key}" data-name="${type.name}">
            ${type.name}
        </div>`
    ).join('');
    
    // Add click event listeners to dropdown items
    const dropdownItems = dropdownContent.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            selectType(this.dataset.name, this.dataset.key);
        });
        
        item.addEventListener('mouseenter', function() {
            // Remove previous selection
            dropdownItems.forEach(i => i.classList.remove('selected'));
            // Add selection to current item
            this.classList.add('selected');
        });
    });
}

// Character search handlers
function handleCharacterSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayCharacters(amiiboCharacters);
    } else {
        const filteredCharacters = amiiboCharacters.filter(character => 
            character.name.toLowerCase().includes(searchTerm)
        );
        displayCharacters(filteredCharacters);
    }
    
    showCharacterDropdown();
}

function handleCharacterSearchFocus() {
    showCharacterDropdown();
}

function handleCharacterSearchBlur() {
    // Delay hiding to allow for click events on dropdown items
    setTimeout(() => {
        hideCharacterDropdown();
    }, 150);
}

function handleCharacterSearchKeydown(event) {
    const dropdown = document.getElementById('amiibo-dropdown');
    const selectedItem = dropdown.querySelector('.dropdown-item.selected');
    const allItems = dropdown.querySelectorAll('.dropdown-item');
    
    switch(event.key) {
        case 'ArrowDown':
            event.preventDefault();
            if (selectedItem) {
                const nextItem = selectedItem.nextElementSibling;
                if (nextItem) {
                    selectedItem.classList.remove('selected');
                    nextItem.classList.add('selected');
                }
            } else if (allItems.length > 0) {
                allItems[0].classList.add('selected');
            }
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            if (selectedItem) {
                const prevItem = selectedItem.previousElementSibling;
                if (prevItem) {
                    selectedItem.classList.remove('selected');
                    prevItem.classList.add('selected');
                }
            } else if (allItems.length > 0) {
                allItems[allItems.length - 1].classList.add('selected');
            }
            break;
            
        case 'Enter':
            event.preventDefault();
            if (selectedItem) {
                selectCharacter(selectedItem.dataset.name, selectedItem.dataset.key);
            }
            break;
            
        case 'Escape':
            hideCharacterDropdown();
            break;
    }
}

// Game series search handlers
function handleGameSeriesSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayGameSeries(gameSeries);
    } else {
        const filteredSeries = gameSeries.filter(series => 
            series.name.toLowerCase().includes(searchTerm)
        );
        displayGameSeries(filteredSeries);
    }
    
    showGameSeriesDropdown();
}

function handleGameSeriesSearchFocus() {
    showGameSeriesDropdown();
}

function handleGameSeriesSearchBlur() {
    // Delay hiding to allow for click events on dropdown items
    setTimeout(() => {
        hideGameSeriesDropdown();
    }, 150);
}

function handleGameSeriesSearchKeydown(event) {
    const dropdown = document.getElementById('gameseries-dropdown');
    const selectedItem = dropdown.querySelector('.dropdown-item.selected');
    const allItems = dropdown.querySelectorAll('.dropdown-item');
    
    switch(event.key) {
        case 'ArrowDown':
            event.preventDefault();
            if (selectedItem) {
                const nextItem = selectedItem.nextElementSibling;
                if (nextItem) {
                    selectedItem.classList.remove('selected');
                    nextItem.classList.add('selected');
                }
            } else if (allItems.length > 0) {
                allItems[0].classList.add('selected');
            }
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            if (selectedItem) {
                const prevItem = selectedItem.previousElementSibling;
                if (prevItem) {
                    selectedItem.classList.remove('selected');
                    prevItem.classList.add('selected');
                }
            } else if (allItems.length > 0) {
                allItems[allItems.length - 1].classList.add('selected');
            }
            break;
            
        case 'Enter':
            event.preventDefault();
            if (selectedItem) {
                selectGameSeries(selectedItem.dataset.name, selectedItem.dataset.key);
            }
            break;
            
        case 'Escape':
            hideGameSeriesDropdown();
            break;
    }
}

// Amiibo series search handlers
function handleAmiiboSeriesSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayAmiiboSeries(amiiboSeries);
    } else {
        const filteredSeries = amiiboSeries.filter(series => 
            series.name.toLowerCase().includes(searchTerm)
        );
        displayAmiiboSeries(filteredSeries);
    }
    
    showAmiiboSeriesDropdown();
}

function handleAmiiboSeriesSearchFocus() {
    showAmiiboSeriesDropdown();
}

function handleAmiiboSeriesSearchBlur() {
    // Delay hiding to allow for click events on dropdown items
    setTimeout(() => {
        hideAmiiboSeriesDropdown();
    }, 150);
}

function handleAmiiboSeriesSearchKeydown(event) {
    const dropdown = document.getElementById('amiiboseries-dropdown');
    const selectedItem = dropdown.querySelector('.dropdown-item.selected');
    const allItems = dropdown.querySelectorAll('.dropdown-item');
    
    switch(event.key) {
        case 'ArrowDown':
            event.preventDefault();
            if (selectedItem) {
                const nextItem = selectedItem.nextElementSibling;
                if (nextItem) {
                    selectedItem.classList.remove('selected');
                    nextItem.classList.add('selected');
                }
            } else if (allItems.length > 0) {
                allItems[0].classList.add('selected');
            }
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            if (selectedItem) {
                const prevItem = selectedItem.previousElementSibling;
                if (prevItem) {
                    selectedItem.classList.remove('selected');
                    prevItem.classList.add('selected');
                }
            } else if (allItems.length > 0) {
                allItems[allItems.length - 1].classList.add('selected');
            }
            break;
            
        case 'Enter':
            event.preventDefault();
            if (selectedItem) {
                selectAmiiboSeries(selectedItem.dataset.name, selectedItem.dataset.key);
            }
            break;
            
        case 'Escape':
            hideAmiiboSeriesDropdown();
            break;
    }
}

// Type search handlers
function handleTypeSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayAmiiboTypes(amiiboTypes);
    } else {
        const filteredTypes = amiiboTypes.filter(type => 
            type.name.toLowerCase().includes(searchTerm)
        );
        displayAmiiboTypes(filteredTypes);
    }
    
    showTypeDropdown();
}

function handleTypeSearchFocus() {
    showTypeDropdown();
}

function handleTypeSearchBlur() {
    // Delay hiding to allow for click events on dropdown items
    setTimeout(() => {
        hideTypeDropdown();
    }, 150);
}

function handleTypeSearchKeydown(event) {
    const dropdown = document.getElementById('type-dropdown');
    const selectedItem = dropdown.querySelector('.dropdown-item.selected');
    const allItems = dropdown.querySelectorAll('.dropdown-item');
    
    switch(event.key) {
        case 'ArrowDown':
            event.preventDefault();
            if (selectedItem) {
                const nextItem = selectedItem.nextElementSibling;
                if (nextItem) {
                    selectedItem.classList.remove('selected');
                    nextItem.classList.add('selected');
                }
            } else if (allItems.length > 0) {
                allItems[0].classList.add('selected');
            }
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            if (selectedItem) {
                const prevItem = selectedItem.previousElementSibling;
                if (prevItem) {
                    selectedItem.classList.remove('selected');
                    prevItem.classList.add('selected');
                }
            } else if (allItems.length > 0) {
                allItems[allItems.length - 1].classList.add('selected');
            }
            break;
            
        case 'Enter':
            event.preventDefault();
            if (selectedItem) {
                selectType(selectedItem.dataset.name, selectedItem.dataset.key);
            }
            break;
            
        case 'Escape':
            hideTypeDropdown();
            break;
    }
}

function selectCharacter(name, key) {
    selectedCharacter = { name, key };
    
    // Update search input
    document.getElementById('amiibo-search').value = name;
    
    // Show clear button
    document.getElementById('amiibo-clear').style.display = 'flex';
    
    // Hide dropdown
    hideCharacterDropdown();
    
    // Query amiibo results
    queryAmiiboResults();
    
    console.log('Selected character:', name, key);
}

function selectGameSeries(name, key) {
    selectedGameSeries = { name, key };
    
    // Update search input
    document.getElementById('gameseries-search').value = name;
    
    // Show clear button
    document.getElementById('gameseries-clear').style.display = 'flex';
    
    // Hide dropdown
    hideGameSeriesDropdown();
    
    // Query amiibo results
    queryAmiiboResults();
    
    console.log('Selected game series:', name, key);
}

function selectAmiiboSeries(name, key) {
    selectedAmiiboSeries = { name, key };
    
    // Update search input
    document.getElementById('amiiboseries-search').value = name;
    
    // Show clear button
    document.getElementById('amiiboseries-clear').style.display = 'flex';
    
    // Hide dropdown
    hideAmiiboSeriesDropdown();
    
    // Query amiibo results
    queryAmiiboResults();
    
    console.log('Selected amiibo series:', name, key);
}

function selectType(name, key) {
    selectedType = { name, key };
    
    // Update search input
    document.getElementById('type-search').value = name;
    
    // Show clear button
    document.getElementById('type-clear').style.display = 'flex';
    
    // Hide dropdown
    hideTypeDropdown();
    
    // Query amiibo results
    queryAmiiboResults();
    
    console.log('Selected type:', name, key);
}


function showCharacterDropdown() {
    document.getElementById('amiibo-dropdown').classList.add('show');
}

function hideCharacterDropdown() {
    document.getElementById('amiibo-dropdown').classList.remove('show');
}

function showGameSeriesDropdown() {
    document.getElementById('gameseries-dropdown').classList.add('show');
}

function hideGameSeriesDropdown() {
    document.getElementById('gameseries-dropdown').classList.remove('show');
}

function showAmiiboSeriesDropdown() {
    document.getElementById('amiiboseries-dropdown').classList.add('show');
}

function hideAmiiboSeriesDropdown() {
    document.getElementById('amiiboseries-dropdown').classList.remove('show');
}

function showTypeDropdown() {
    document.getElementById('type-dropdown').classList.add('show');
}

function hideTypeDropdown() {
    document.getElementById('type-dropdown').classList.remove('show');
}

function displayCharacterError(message) {
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.innerHTML = `<div class="no-results">${message}</div>`;
    showCharacterDropdown();
}

function displayGameSeriesError(message) {
    const dropdownContent = document.getElementById('gameseries-dropdown-content');
    dropdownContent.innerHTML = `<div class="no-results">${message}</div>`;
    showGameSeriesDropdown();
}

function displayAmiiboSeriesError(message) {
    const dropdownContent = document.getElementById('amiiboseries-dropdown-content');
    dropdownContent.innerHTML = `<div class="no-results">${message}</div>`;
    showAmiiboSeriesDropdown();
}

function displayAmiiboTypesError(message) {
    const dropdownContent = document.getElementById('type-dropdown-content');
    dropdownContent.innerHTML = `<div class="no-results">${message}</div>`;
    showTypeDropdown();
}

// Clear functions
function clearCharacterSelection() {
    selectedCharacter = null;
    
    // Clear search input
    document.getElementById('amiibo-search').value = '';
    
    // Hide clear button
    document.getElementById('amiibo-clear').style.display = 'none';
    
    // Show all characters again
    displayCharacters(amiiboCharacters);
    
    // Clear and hide table, show guide text if no filters selected
    updateGuideAndResults();
    
    console.log('Character selection cleared');
}

function clearGameSeriesSelection() {
    selectedGameSeries = null;
    
    // Clear search input
    document.getElementById('gameseries-search').value = '';
    
    // Hide clear button
    document.getElementById('gameseries-clear').style.display = 'none';
    
    // Show all game series again
    displayGameSeries(gameSeries);
    
    // Clear and hide table, show guide text if no filters selected
    updateGuideAndResults();
    
    console.log('Game series selection cleared');
}

function clearAmiiboSeriesSelection() {
    selectedAmiiboSeries = null;
    
    // Clear search input
    document.getElementById('amiiboseries-search').value = '';
    
    // Hide clear button
    document.getElementById('amiiboseries-clear').style.display = 'none';
    
    // Show all amiibo series again
    displayAmiiboSeries(amiiboSeries);
    
    // Clear and hide table, show guide text if no filters selected
    updateGuideAndResults();
    
    console.log('Amiibo series selection cleared');
}

function clearTypeSelection() {
    selectedType = null;
    
    // Clear search input
    document.getElementById('type-search').value = '';
    
    // Hide clear button
    document.getElementById('type-clear').style.display = 'none';
    
    // Show all types again
    displayAmiiboTypes(amiiboTypes);
    
    // Clear and hide table, show guide text if no filters selected
    updateGuideAndResults();
    
    console.log('Type selection cleared');
}

// Amiibo results functions
function queryAmiiboResults() {
    // Check if at least one filter is selected
    if (!selectedCharacter && !selectedGameSeries && !selectedAmiiboSeries && !selectedType) {
        clearAmiiboResults();
        showGuideText();
        return;
    }
    
    // Hide guide text and show results section and loading
    hideGuideText();
    document.getElementById('amiibo-results-section').style.display = 'block';
    document.getElementById('loading-results').style.display = 'block';
    document.getElementById('no-results-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
    
    // Build query parameters
    const params = new URLSearchParams();
    
    if (selectedCharacter) {
        params.append('name', selectedCharacter.name);
    }
    if (selectedGameSeries) {
        params.append('gameSeries', selectedGameSeries.name);
    }
    if (selectedAmiiboSeries) {
        params.append('amiiboSeries', selectedAmiiboSeries.name);
    }
    if (selectedType) {
        params.append('type', selectedType.name);
    }
    
    // Make API request
    const apiUrl = `https://www.amiiboapi.com/api/amiibo/?${params.toString()}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('loading-results').style.display = 'none';
            
            if (data.amiibo && data.amiibo.length > 0) {
                displayAmiiboResults(data.amiibo);
            } else {
                document.getElementById('no-results-message').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching amiibo results:', error);
            document.getElementById('loading-results').style.display = 'none';
            document.getElementById('error-message').style.display = 'block';
        });
}

function displayAmiiboResults(amiiboList) {
    const tableBody = document.getElementById('amiibo-table-body');
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add rows for each amiibo
    amiiboList.forEach(amiibo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${amiibo.amiiboSeries || 'N/A'}</td>
            <td>${amiibo.character || 'N/A'}</td>
            <td>${amiibo.gameSeries || 'N/A'}</td>
            <td>${amiibo.type || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Show the table
    document.getElementById('amiibo-table').style.display = 'table';
}

function clearAmiiboResults() {
    // Hide results section
    document.getElementById('amiibo-results-section').style.display = 'none';
    
    // Clear table body
    document.getElementById('amiibo-table-body').innerHTML = '';
    
    // Hide all messages
    document.getElementById('loading-results').style.display = 'none';
    document.getElementById('no-results-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
}

// Guide text functions
function showGuideText() {
    document.getElementById('guide-text').style.display = 'block';
}

function hideGuideText() {
    document.getElementById('guide-text').style.display = 'none';
}

function updateGuideAndResults() {
    // Check if any filters are selected
    if (!selectedCharacter && !selectedGameSeries && !selectedAmiiboSeries && !selectedType) {
        clearAmiiboResults();
        showGuideText();
    } else {
        hideGuideText();
        queryAmiiboResults();
    }
}
