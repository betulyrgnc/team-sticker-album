import database from "../database.json";

const fetchTeams = () => {
    return database['teams']
}

const fetchTeam = (id) => {
    return fetchTeams().find(team => team.id === +id)
}

const fetchTeamMembers = (teamId) => {
    const teamMembers = database['teamMembers'];
    if(teamId){
        return teamMembers.filter(member => member.teamId === +teamId);
    }

    return teamMembers;
}

export {
    fetchTeams,
    fetchTeam,
    fetchTeamMembers,
}