const baseUrl = "https://api.npoint.io/20c1afef1661881ddc9c"

async function allFootballData() {
    let res = await fetch(baseUrl);
    let data = await res.json();
    console.log(data.playerList);
    let playerAllData = data.playerList;

    //Sort function
    playerAllData.sort(function(a,b){
        return a.Value - b.Value;
    });

    displayFootball(playerAllData)
}

allFootballData()
let main_div = document.getElementById("football_div")

function displayFootball(allData){
    allData.forEach((single) =>{
        let div = document.createElement("div");
        div.classList.add("player_info")

        let image = document.createElement("img");
        image.src = "./player-images/" + `${single.Id}` + ".jpg"

        let playName = document.createElement("p");
        playName.innerText = "Name - " + single.PFName;

        let skillName = document.createElement("p");
        skillName.innerText = "Skill - " + single.SkillDesc;

        let value = document.createElement("p");
        value.innerText = "Value - " + single.Value;

        let upcomingMatch = document.createElement("p");
        upcomingMatch.innerText = `Upcoming Match - ${single.UpComingMatchesList[0].CCode} Vs ${single.UpComingMatchesList[0].VsCCode}`;

        div.append(image,playName,skillName,value,upcomingMatch)

        main_div.appendChild(div)
    })
}


function sortLowToHigh(){
    playerAllData.sort(function(a,b){
        return a.Value - b.Value;
    });
    displayFootball(playerAllData);
  }

  sortLowToHigh()