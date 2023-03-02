
let inputSearch = document.querySelector(".search-input");
let searchBtn = document.querySelector("#search-btn");
let theDiv = document.getElementById("area");
let ingre = document.getElementById("ingredient");
let areaCards = document.getElementById("area-cards");

searchBtn.addEventListener("click", getRecipes);
areaCards.addEventListener("click", getReipeDetails);
function getRecipes() {
  let searchItem = inputSearch.value.trim();
  inputSearch.value = "";
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`;
  fetch(apiUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      displayRecipes(data);
    });
}

function displayRecipes(recipes) {
  areaCards.innerHTML = "";
  if (recipes.meals == null) {
    areaCards.innerHTML = "No Data";
    return;
  }
  recipes.meals.forEach((recipe) => {
    areaCards.innerHTML += `
  
  <div class="card">
  <div class="img-card">
      <img src="${recipe.strMealThumb}" alt="">
  </div>
  <div class="info-card">
      <h2>${recipe.strMeal}</h2>
      <a href="#" onclick="openSide()" class="recipe-btn" data-id="${recipe.idMeal}">Get Recipe</a>

  </div>
</div>

  `;
  });
}

function getReipeDetails(e) {
  if (e.target.classList.contains("recipe-btn")) {
    let idR = e.target.getAttribute("data-id");
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idR}`;
    fetch(apiUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        displayReipeDetails(data);
      });
  }
}

function displayReipeDetails(recipeItem) {
  let item = recipeItem.meals[0];
  ingre.innerHTML="";
  ingre.innerHTML=`
  <i class="fa-solid fa-xmark" onclick="closeSide()"></i>
  <div class="title">
      <h2>${item.strMeal}</h2>
      <a href="${item.strYoutube}" target="_blank">Watch Video</a>
      <p>${item.strInstructions}</p>
          
  </div>
  `;
}



function openSearch() {
  theDiv.style.transform = "scale(1)";
  theDiv.style.opacity = "1";
}
function closeSearch() {
  theDiv.style.transform = "scale(0)";
  theDiv.style.opacity = "0";
  ingre.style.left = "-100" + "%";
}
function openSide() {
  ingre.style.left = "0" + "px";
}
function closeSide() {
  ingre.style.left = "-100" + "%";
}
