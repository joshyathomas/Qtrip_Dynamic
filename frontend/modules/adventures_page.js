import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // let url = new URLSearchParams(search)


  let params = new URLSearchParams(search);
  return params.get("city");
  
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const result = await fetch(
      config.backendEndpoint + `/adventures/?city=${city}`
    );

    const data = await result.json();
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
// function addAdventureToDOM(adventures) { //this adventure is cming from
//   // TODO: MODULE_ADVENTURES
//   // 1. Populate the Adventure Cards and insert those details into the DOM

//   let res = document.createElement("div")
//   res.className="activity-card text-center col-12 col-sm-6 col-lg-3 p-0"
//   res.innerHTML=`
//           <div class="category-banner "> <h2>${} </h2></div>

//           <img class="activity-card activity-card-image img-fluid " src="${ }" alt="">

//           <div class="d-flex justify-content-around">
//               <h5 class="fst-normal">${ }</h5>
//               <h5 class="fst-normal">${ } </h5>
//           </div>
//           <div class="d-flex justify-content-around ">
//               <h5 class="fst-normal" >${ }</h5>
//               <h5 class="fst-normal">${ }</h5>
//           </div>

//     `

//   document.getElementById("data").appendChild(res);

// }

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parentNode = document.getElementById("data");
  let childNode = "";
  Array.from(adventures).forEach((element) => {
    childNode = `
      <div class="col-6 col-lg-3 mb-3">
      <a href="detail/?adventure=${element.id}" id = ${element.id}>
        <div class="card adventure-card pb-3">
          <img src=${element.image} class="activity-card-image" alt=${element.name}/>
          <div class= "category-banner">${element.category}</div>
          <div class="card-body  text-center d-md-flex justify-content-between text-responsive monospace">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text h6">₹${element.costPerHead}</p> 
          </div>
          <div class="card-body  text-center d-md-flex justify-content-between  text-responsive mb-0 pb-0 monospace">
            <h5 class="card-title">Duration</h5>
            <p class="card-text h6">₹${element.duration}</p> 
          </div>  
        </div>
      </a>
    </div>

      `;
    parentNode.innerHTML += childNode;
  });

  return parentNode;
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(list)
  let filteredList = [];
  filteredList = list.filter(
    (key) => key.duration >= low && key.duration <= high
  );
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their  Category and return filtered list
  let filteredList = [];
  
  // list.forEach((key) => {
    categoryList.forEach((category) => {
      list.forEach((key) => {
        if(key.category === category){
          filteredList.push(key)
        }
      })
    })
  //     if (catagory == key.catagory) {
  //       filteredList.push(key);
  //     }
  //   });
  // });
  // console.log(categoryList,filteredList)
  
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

// function filterFunction(list, filters) {
//   // TODO: MODULE_FILTERS
//   // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
//   // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
//   let filteredList = [];

//   if (filters["duration"].length > 0 && filters["category"].length > 0) {
//     let choice = filters["duration"].split("-");
//     filteredList = filterByDuration(
//       list,
//       parseInt(choice[0]),
//       parseInt(choice[1])
//     );
//     filteredList = filterByCategory(filteredList, filters["category"]);
//   } else if (filters["duration"].length > 0) {
//     //why
//     let choice = filters["duration"].split("_");
//     filteredList = filterByDuration(
//       list,
//       parseInt(choice[0]),
//       parseInt(choice[1])
//     );
//   } else if (filters["category"].length > 0) {
//     filteredList = filterByCategory(list, filters["category"]);
//   } else {
//     filteredList = list;
//   }

//   // Place holder for functionality to work in the Stubs
//   return filteredList;
// }


function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  let filteredList = [];
  let choice = filters["duration"].split("-");

  if (filters["category"].length > 0 && filters["duration"].length > 0) {
  
    filteredList = filterByCategory(list, filters.category);
    filteredList = filterByDuration(list,parseInt(choice[0]),parseInt(choice[1]));
  } else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters.category);
  } else if (filters["duration"].length > 0) {
    filteredList = filterByDuration(list,parseInt(choice[0]),parseInt(choice[1]));
  } else {
    filteredList = list;
  }

  // Place holder for functionality to work in the Stubs
  return filteredList;
}
//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"))

  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

// function generateFilterPillsAndUpdateDOM(filters) {
//   // TODO: MODULE_FILTERS
//   // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
//  let pill = document.getElementById("category-list")
//  console.log(filters)
//  filters["category"].forEach(pills)

//   function pills(){
//     document.getElementById("category-list").innerHTML = 
//     `<div class= category-filter >${filters["category"]}</div>`
//   }
 


// }

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
   let categoryList=filters["category"];
   let li=[];
  for(let i=0;i<categoryList.length;i++)
  {
   // console.log(categoryList[i]);
    li.push(categoryList[i]);
  }
  console.log(li);
  for(let i=0;i<li.length;i++)
  {
    console.log(li[i]);
    var div=document.createElement("div");
    div.setAttribute("class","category-filter");
    div.innerText=li[i];
    document.getElementById("category-list").append(div);
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
