function makeTeamList(teamData, namesData, teamsData) {
    // Take it step by step.
    const a=[]
    //get coach
    coach=teamData.team.coach
    //get teamname
    for (teamname in teamsData){
      if (teamsData[teamname].id===teamData.team.id){
        getteamname=teamsData[teamname].team
      }
    }

    arr=new Array()
    arr[0]=getteamname + ', ' + 'coached by ' + coach
    const compare = (a,b) => {
      match1=parseInt(a.matches)
      match2=parseInt(b.matches)
      return match2-match1;
    }

    teamData.players.sort(compare)
    //console.log(teamData.players)
	i=1
    for (player in teamData.players){
      //console.log(teamData.players[player])
      for (iden in namesData){
        if(teamData.players[player].id===namesData[iden].id){
          arr.push(i+'. '+namesData[iden].name)
          i++
        }
      }
    }
    return arr;
}

const teamJson = process.argv[2];
const namesJson = process.argv[3];
const teamsJson = process.argv[4];
if (teamJson === undefined || namesJson === undefined || teamsJson === undefined) {
  throw new Error(`input not supplied`);
}

// some sample data
const team  = require(`./${teamJson}`);
const names  = require(`./${namesJson}`);
const teams  = require(`./${teamsJson}`);
console.log(makeTeamList(team, names.names, teams.teams));
