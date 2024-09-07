const BIN_ID = '66768e2ead19ca34f87cdcdb';

document.addEventListener("DOMContentLoaded", function () {
    fetchRosterData();
});

function fetchRosterData() {
    axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`)
        .then(response => {
            const data = response.data.record;
            populateTeam(data.homeTeam, 'home');
            populateTeam(data.awayTeam, 'away');
        })
        .catch(error => console.error('Error:', error));
}

function populateTeam(teamData, teamType) {
    const logoImg = document.getElementById(`${teamType}TeamLogoImg`);
    const teamName = document.getElementById(`${teamType}TeamName`);
    const playerList = document.querySelector(`.${teamType}-player-list`);
    const substituteList = document.querySelector(`.${teamType}-substitute-list`);

    logoImg.src = teamData.logo;
    teamName.textContent = teamData.name;

    teamData.players.forEach((player) => {
        const li = document.createElement('li');
        li.textContent = `${player.number}. ${player.name}`;

        if (player.captain) {
            const crownIcon = document.createElement('img');
            crownIcon.src = 'https://raw.githubusercontent.com/mja1337/roster/main/crown.png';
            crownIcon.alt = 'Captain';
            crownIcon.className = 'captain-icon'; // For styling purposes
            li.appendChild(crownIcon);
        }

        if (player.substitute) {
            substituteList.appendChild(li);
        } else {
            playerList.appendChild(li);
        }
    });
}
