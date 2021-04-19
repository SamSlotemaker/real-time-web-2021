
//returns teams of 4 players from given users
module.exports = function createTeams(users) {
    let sortedArray = sortTeamOnKd(users)
    console.log(users)
    let maxTeams = Math.ceil(users.length / 4)
    let teams = []
    //create a team for the amount of teams possible
    for (let i = 0; i < maxTeams; i++) {
        teams.push([])
    }
    let teamNumber = 0
    sortedArray.forEach((user) => {
        teams[teamNumber].push(user)
        if (teams[teamNumber].length === 4) {
            teamNumber++
        }
    })
    return teams
}

//sort high to low
function sortTeamOnKd(array) {
    let newArray = [...array]
    return newArray.sort((a, b) => {
        return b.kd - a.kd
    })
}