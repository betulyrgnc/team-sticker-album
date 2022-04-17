import database from "../database.json";

const fetchRandomTeamMembers = (length = 2) => {
   return database.teamMembers.filter((member) => !member.isActive)
        .sort(() => 0.5 - Math.random())
        .slice(0, length);
}

export {
    fetchRandomTeamMembers,
}