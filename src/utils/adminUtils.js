export const adminActions = {
    Fixtures: [
        { name: "UPDATE BY ID", method: "GET", endpoint: "/api/fixtures/update/{id}", params: ["id"] },
        { name: "ALL SEASONS BY LEAGUE", method: "GET", endpoint: "/api/fixtures/{leagueId}", params: ["leagueId"] },
        { name: "CURRENT SEASON", method: "GET", endpoint: "/api/fixtures/current" },
        { name: "UPDATE STATUSES", method: "GET", endpoint: "/api/fixtures/update" },
        { name: "BY LEAGUE AND SEASON", method: "GET", endpoint: "/api/fixtures/{leagueId}/{seasonYear}", params: ["leagueId", "seasonYear"] },
        { name: "DETAILS BY LEAGUE AND SEASON", method: "GET", endpoint: "/api/fixtures/update/{leagueId}/{seasonYear}", params: ["leagueId", "seasonYear"] },
    ],
    Coaches: [
        { name: "Coaches By League", method: "GET", endpoint: "/api/coaches/{leagueId}", params: ["leagueId"] },
        { name: "Current Season Coaches", method: "GET", endpoint: "/api/coaches" },
    ],
    Leagues: [
        { name: "Top Leagues", method: "GET", endpoint: "/api/leagues" },
    ],
    Odds: [
        { name: "Odds By League", method: "GET", endpoint: "/api/odds/{leagueId}", params: ["leagueId"] },
        { name: "Today's Odds", method: "GET", endpoint: "/api/odds/today" },
    ],
    Players: [
        { name: "Players By League And Season", method: "GET", endpoint: "/api/players/{leagueId}/{seasonYear}", params: ["leagueId", "seasonYear"] },
        { name: "Players By League", method: "GET", endpoint: "/api/players/{leagueId}", params: ["leagueId"] },
        { name: "Current Season Players", method: "GET", endpoint: "/api/players/current" },
    ],
    Predictions: [
        { name: "Current Season Predictions", method: "GET", endpoint: "/api/predictions/current" },
        { name: "Current Season Predictions By League", method: "GET", endpoint: "/api/predictions/current/{leagueId}", params: ["leagueId"] },
        { name: "Upcoming Predictions", method: "GET", endpoint: "/api/predictions/upcoming" },
        { name: "Archive Predictions", method: "GET", endpoint: "/api/predictions/archive" },
        { name: "Archive Predictions By League", method: "GET", endpoint: "/api/predictions/archive/{leagueId}", params: ["leagueId"] },
    ],
    Sidelined: [
        { name: "Sidelined Players", method: "GET", endpoint: "/api/sidelined" },
    ],
    Standings: [
        { name: "Standings By League", method: "GET", endpoint: "/api/standings/{leagueId}", params: ["leagueId"] },
        { name: "Standings", method: "GET", endpoint: "/api/standings" },
    ],
    Teams: [
        { name: "Teams Info", method: "GET", endpoint: "/api/teams/info" },
        { name: "Current Season Teams Info", method: "GET", endpoint: "/api/teams/info/current" },
        { name: "Current Season Teams Info By League", method: "GET", endpoint: "/api/teams/info/current/{leagueId}", params: ["leagueId"] },
        { name: "Teams Info By League", method: "GET", endpoint: "/api/teams/info/{leagueId}", params: ["leagueId"] },
        { name: "Teams Info By League And Season", method: "GET", endpoint: "/api/teams/info/{leagueId}/{seasonYear}", params: ["leagueId", "seasonYear"] },
        { name: "Teams Stats", method: "GET", endpoint: "/api/teams/stats" },
        { name: "Current Season Teams Stats", method: "GET", endpoint: "/api/teams/stats/current" },
        { name: "Teams Stats By League", method: "GET", endpoint: "/api/teams/stats/{leagueId}", params: ["leagueId"] },
    ],
    Trophies: [
        { name: "Favorite Players Trophies", method: "GET", endpoint: "/api/trophies/players" },
        { name: "Favorite Players Trophies By League", method: "GET", endpoint: "/api/trophies/players/{leagueId}", params: ["leagueId"] },
        { name: "Favorite Coaches Trophies", method: "GET", endpoint: "/api/trophies/coaches" },
    ],
};