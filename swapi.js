

document.addEventListener("DOMContentLoaded", function(event) {
  // ----document find stuff --------
  const crawlButton = document.getElementById("crawlBtn")
  const crawlDiv = document.getElementById("crawlDiv")
  const planetButton = document.getElementById("findPlanet")
  const planetData = document.getElementById("planetData")


    
  // ------Event Listeners --------
  planetButton.addEventListener("click", getPlanet)
  crawlButton.addEventListener("click", getOpeningCrawl)
  
});

// TODO - find out why this breaks when called in DOMContentLoaded function....

getDroids(2) 
getDroids(3) 


// ------Functions -------

function getOpeningCrawl() {
  let crawlPromise = fetch('https://swapi.co/api/films/1/')
  crawlPromise.then(response => response.json())
  .then(data => crawlDiv.append(data.opening_crawl))
}

function getDroids(droidNum) {
  
  
  let droidPromise = fetch(`https://swapi.co/api/people/${droidNum}`)
  droidPromise.then(response => response.json())
  .then(data => { 
    const droidButton = document.createElement("button")
    droidButton.id = `droid-${droidNum}-btn`
    droidButton.innerHTML = "Get Planet"
    droidButton.addEventListener("click", () => {
      getHomePlanet(data.homeworld,droidNum)
    }) 
    
    document.getElementById(`droid-${droidNum}`).append(droidButton)
    document.getElementById(`droid-${droidNum}`).append(`Name: ${data.name} Height:${data.height} Mass:${data.mass}`)
  })
}

function getHomePlanet(homeUrl, droidNum) {
    const homeWorld = fetch(homeUrl)
    homeWorld.then(response => response.json())
    .then(data => 
     document.getElementById(`droid-${droidNum}`).append(data.name)
     )}

function getPlanet() {
  let planetInputValue = document.getElementById("planetInput").value
  if (planetInputValue <= 60 && planetInputValue >= 1) {
     const planetPromise = fetch(`https://swapi.co/api/planets/${planetInputValue}`)
     planetPromise.then(response => response.json())
    .then(data => {
        planetData.innerHTML = `Name: ${data.name} Climate: ${data.climate}`
      })
  } else {
    planetData.innerHTML = "Fuck off"
  }
}

 


