// Function to fetch monster data from API
async function fetchMonsterData(searchQuery) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${searchQuery}`);
        const data = await response.json();
        // Check if the monster has an image property
        const imageUrl = data.image ? `https://www.dnd5eapi.co${data.image}` : null;
        return { ...data, imageUrl }; // Return the monster data along with the image URL
    } catch (error) {
        console.error('Error fetching monster data:', error);
    }
}



// Function to display monster information
function displayMonsterInfo(monsterData) {
    // Display monster name
    const monsterInfoDiv = document.getElementById('monsterInfo');
    monsterInfoDiv.innerHTML = `
        <h2>${monsterData.name}</h2>
        <div id="monsterPhoto"></div> 
        <button class="collapsible">Size, Type, Alignment</button>
        <div class="content">
            <p>Size: ${monsterData.size}</p>
            <p>Type: ${monsterData.type}</p>
            <p>Alignment: ${monsterData.alignment}</p>
        </div>

        <button class="collapsible">Armor Class, Hit Points</button>
        <div class="content">
            <p>Armor Class: ${monsterData.armor_class[0].value} (${monsterData.armor_class[0].type})</p>
            <p>Hit Points: ${monsterData.hit_points}</p>
            <p>Hit Dice: ${monsterData.hit_dice}</p>
            <p>Hit Points Roll: ${monsterData.hit_points_roll}</p>
        </div>

        <button class="collapsible">Stats</button>
        <div class="content">
            <p>Strength: ${monsterData.strength}</p>
            <p>Dexterity: ${monsterData.dexterity}</p>
            <p>Constitution: ${monsterData.constitution}</p>
            <p>Intelligence: ${monsterData.intelligence}</p>
            <p>Wisdom: ${monsterData.wisdom}</p>
            <p>Charisma: ${monsterData.charisma}</p>
        </div>

        <button class="collapsible">Proficiencies</button>
        <div class="content">
            ${monsterData.proficiencies.map(proficiency => `
                <p>Value: ${proficiency.value}</p>
                <p>Proficiency: ${proficiency.proficiency.name}</p>
                <p>Index: ${proficiency.proficiency.index}</p>
                <p>Name: ${proficiency.proficiency.name}</p>
                <hr>
            `).join('')}
        </div>

        <button class="collapsible">Special Abilities</button>
        <div class="content">
            ${monsterData.special_abilities.map(ability => `
                <p>Name: ${ability.name}</p>
                <p>Description: ${ability.desc}</p>
                <hr>
            `).join('')}
        </div>

        <button class="collapsible">Actions</button>
        <div class="content">
            ${monsterData.actions.map(action => `
                <p>Name: ${action.name}</p>
                <p>Description: ${action.desc}</p>
                <p>Type: ${action.type}</p>
                ${action.damage ? `
                    <p>Damage Type: ${action.damage[0].damage_type.name}</p>
                    <p>Damage Dice: ${action.damage[0].damage_dice}</p>
                ` : ''}
                <hr>
            `).join('')}
        </div>
    `;

    // Show collapsible sections
    const collapsibleBtns = document.querySelectorAll('.collapsible');
    collapsibleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
// Display monster photo if available
    if (monsterData.imageUrl) {
    displayMonsterPhoto(monsterData.imageUrl);
    }
}

// Function to display monster photo
function displayMonsterPhoto(imageUrl) {
    const monsterPhotoDiv = document.getElementById('monsterPhoto');
    monsterPhotoDiv.innerHTML = `
        <img src="${imageUrl}" alt="Monster Photo">
    `;
}






// Display sections even if no search is performed
displayMonsterInfo({
    name: 'Monster Name',
    size: 'size',
    type: 'Type',
    alignment: 'Alignment',
    armor_class: [{ type: 'Type', value: 'Value' }],
    hit_points: 'Hit Points',
    hit_dice: 'Hit Dice',
    hit_points_roll: 'Hit Points Roll',
    strength: 'Strength',
    dexterity: 'Dexterity',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Wisdom',
    charisma: 'Charisma',
    proficiencies: [{ value: 'Value', proficiency: { index: 'Index', name: 'Name' } }],
    special_abilities: [{ name: 'Ability Name', desc: 'Ability Description' }],
    actions: [{ name: 'Action Name', desc: 'Action Description', type: 'Type', damage: [{ damage_type: { name: 'Damage Type' }, damage_dice: 'Damage Dice' }] }]
});

// Function to fetch monster data from API
async function fetchMonsterData(searchQuery) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${searchQuery}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching monster data:', error);
    }
}

// Function to handle search
async function searchMonster() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim().toLowerCase();
    if (searchQuery === '') {
        alert('Please enter a monster name to search.');
        return;
    }
    const monsterData = await fetchMonsterData(searchQuery);
    displayMonsterInfo(monsterData);
}