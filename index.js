const baseUrl = "https://api.npoint.io/20c1afef1661881ddc9c";


let playerAllData;
let filterItem;
let SearchText=""

async function allFootballData() {
  let res = await fetch(baseUrl);
  let data = await res.json();
  // console.log(data.playerList);
     playerAllData = data.playerList;

  //Sort function
  playerAllData.sort(function (a, b) {
    return a.Value - b.Value;
  });

  displayFootball(playerAllData);
}

allFootballData();
let main_div = document.getElementById("football_div");

function displayFootball(allData) {
  allData.forEach((single) => {
    


    let image = document.createElement("img");
    image.src = "./player-images/" + `${single.Id}` + ".jpg";
    image.alt = single.PFName;

    let div = document.createElement("div");
    div.classList.add("player_info");

    let playName = document.createElement("div");
    playName.innerText = "Name - " + single.PFName;

    let skillName = document.createElement("div");
    skillName.innerText = "Skill - " + single.SkillDesc;

    let value = document.createElement("div");
    value.innerText = "Value - $" + single.Value;

    let upcomingMatch = document.createElement("div");
    upcomingMatch.innerText = `Upcoming Match - ${single.UpComingMatchesList[0].CCode} VS ${single.UpComingMatchesList[0].VsCCode}`;

    let time = document.createElement("div");
    time.innerText = converTime(single.UpComingMatchesList[0].MDate);

    single.UpComingMatchesList[0].CCode == ""
      ? div.append(image, playName, skillName, value)
      : div.append(image, playName, skillName, value, upcomingMatch, time);

    main_div.appendChild(div);
  });
}

function sortLowToHigh() {
  playerAllData.sort(function (a, b) {
    return a.Value - b.Value;
  });
  displayFootball(playerAllData);
}

sortLowToHigh();
function converTime(t) {
  let [date, time, meridian] = t.split(" ");
  // time = time.split(":")
  time ="05:30:00"
  let res = "Match Time -" + [date, time, meridian].join(" ");
  return res;
}

/// Serach by team name


function searchPlayer  ()  {
   SearchText = document.getElementById("myInput").value;
  console.log("SearchText:", SearchText);

   
   filterItem = playerAllData.filter((item) => {
 
    if (item.PFName == SearchText  || item.TName==SearchText) return item;
    
  });
  console.log("filterItem:", filterItem);

  
};

function showFliterData() {

  if (SearchText.length == 0) {
    alert("please enter someting");
  }
  main_div.innerHTML = null;
   displayFootball(filterItem);
}
