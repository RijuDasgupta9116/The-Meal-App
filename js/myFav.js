const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const mealContainer = (name, imgSrc,id,instruction,videoLink,area) => {
    return ` <div class="meal-container">
    <img src="${imgSrc}" alt="${name}" class="meal-img">
    <h4 class="meal-name">${name}</h4>
    <button class="view-details btn btn-danger"  data-bs-toggle="modal" data-bs-target="#${id}">View Recipe</button>
     <!-- <button type="button" id="fav-btn-id"  class="fav-btn btn btn-outline-danger"></button> -->
       
     <i class="fa fa-heart fav testing-btn" data-id="${id} "  aria-hidden="true"></i>
  
  </div>
  <!-- Modal -->
  <div class="modal fade" id=${id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Recipe of ${name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src=${imgSrc} alt=${name} style="width: 100%;">
          <p>${instruction}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${area}</button>
          <a href=${videoLink} target="_blank"><button type="button" class="btn btn-primary">Watch Recipe</button></a>
        </div>
      </div>
    </div>
  </div>
  `;
  };


let fav = []
const isPresent = localStorage.getItem("favFood");
if(isPresent){
    fav = JSON.parse(isPresent);
}

function displayMeals(){
    let meals = "";
    fav.forEach(element =>{
        meals+=mealContainer(element.strMeal,element.strMealThumb,element.idMeal,element.strInstructions,element.strYoutube,element.strArea);
    })
    document.querySelector(".meal").innerHTML = meals;
}
displayMeals();


let mealListId = document.getElementById("meal-list-id");

mealListId.addEventListener("click",(e)=>{
    let element = e.target;
    // console.log(element.dataset.id);
    for(let i=0;i<fav.length;i++){
        if(e.target.dataset.id == parseInt(fav[i].idMeal)){
            fav.splice(i,1);
            localStorage.setItem("favFood",JSON.stringify(fav));
            // element.target.classList.remove("fa-heart");
            displayMeals();
            break;
            
        }
    }
})

