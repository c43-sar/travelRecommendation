// Import DB
const travelDB = "./travel_recommendation.json";

// Add listeners
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", search);

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clear);

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", (event) => {
  if (event.key === "Enter") search();
});

// Add DOM Objects
const outList = document.getElementById("output-list");
const outListHead = document.getElementById("output-list-heading");
const outArea = document.getElementsByClassName("output")[0];

// functions
function search() {
  const userInput = searchBar.value;
  console.log(userInput);

  const keyword = userInput.toLowerCase();
  switch (keyword) {
    case "beach":
    case "beaches":
      getData("beaches", false);
      break;
    case "country":
    case "countries":
      getData("countries", true);
      break;
    case "temple":
    case "temples":
      getData("temples", false);
      break;
    default:
      break;
  }
}

function getData(keyword, hasSubArray) {
  fetch(travelDB)
    .then((data) => data.json())
    .then((results) => {
      outputList(results[keyword], hasSubArray);
    })
    .catch((e) => console.log(`Error: ${e}`));
}

function outputList(list, hasSubArray) {
  clear();

  if (list.length === 0) {
    console.log("SEARCH MISMATCH: NO SEARCH RESULTS");
    outListHead.innerText = "No Search Results";
    outArea.style.display = "block";
    return;
  }

  if (hasSubArray) {
    // country
    for (country of list) {
      console.log(country);
      let cityList = country.cities;
      console.log(cityList);

      for (city of cityList) {
        const data = {
          name: city.name,
          img: city.imageUrl,
          description: city.description,
        };

        populateResults(data);
      }
    }
  } else {
    // beach or temple
    for (city of list) {
      const data = {
        name: city.name,
        img: city.imageUrl,
        description: city.description,
      };

      populateResults(data);
    }
  }
  outListHead.innerText = "Search Results";
  outArea.style.display = "block";
}

function clear() {
  while (outList.childNodes.length > 0) {
    outList.removeChild(outList.childNodes[0]);
  }
  searchBar.value = "";
}

function populateResults(data) {
  console.log(data);

  let listItem = document.createElement("li");
  let resDest = document.createElement("h4");
  let resImg = document.createElement("img");
  let resDesc = document.createElement("p");

  listItem.className = "result-item";
  resDest.className = "result-item-name";
  resDest.textContent = data.name;
  resDest.style.color = "white";
  resImg.className = "result-item-image";
  resImg.setAttribute("src", data.img);
  resDesc.className = "result-item-desc";
  resDesc.textContent = data.description;
  resDesc.style.color = "white";

  listItem.append(resDest);
  listItem.append(resImg);
  listItem.append(resDesc);

  outList.append(listItem);

  listItem.style.visibility = "visible";
  outList.style.visibility = "visible";
}

const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);