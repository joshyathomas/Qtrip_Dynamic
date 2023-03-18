import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  // let result = await fetch("http://13.235.32.221:8082/cities")

  try{

    let result = await fetch(config.backendEndpoint + "/cities")
  let data = await result.json()
  return data

  } catch(e){
    return null;
  }
  
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let res = document.createElement("div")
  res.className="col-12 col-sm-6 col-lg-3 mb-4"
  res.innerHTML=` 
   <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
              <div class="tile-text">
                <h5>${city}</h5>
                <p>${description}</p>
              </div>
              <img class="img-responsive" src="${image}" alt="img">
              
      </div>
    </a>
    `

  document.getElementById("data").appendChild(res);
  
}

export { init, fetchCities, addCityToDOM };

