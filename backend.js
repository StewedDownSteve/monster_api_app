// Function to fetch monster data from the D&D 5E API
async function fetchMonsterData(searchQuery) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${searchQuery}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching monster data:', error);
    }
}

module.exports = { fetchMonsterData };
