var searchBox = document.querySelector(".seach-box");
var searchBtn = document.querySelector(".search-btn");

var allFoodItems = [];
var favFoodItems = new Array();


const mealDetails = async(api) =>{
  const res = await fetch(api);
  const data = await res.json();

  return data;
}


const mealContainer = (name, imgSrc,id,instruction,videoLink,area) => {
  // console.log(name+" "+id);
  // console.log("clicked");
  return ` <div class="meal-container">
  <img src="${imgSrc}" alt="${name}" class="meal-img">
  <h4 class="meal-name">${name}</h4>
  <button class="view-details btn btn-danger"  data-bs-toggle="modal" data-bs-target="#${id}">View Recipe</button>
   <!-- <button type="button" id="fav-btn-id"  class="fav-btn btn btn-outline-danger"></button> -->
     
   <i class="fa fa-heart-o fav testing-btn" data-id="${id} "  aria-hidden="true"></i>

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

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var arrFoodItems = []
mealDetails(url).then(data =>{
  // console.log(data);
  arrFoodItems = data.meals;

  let meals = "";
  arrFoodItems.forEach(element =>{
    meals+=mealContainer(element.strMeal,element.strMealThumb,element.idMeal,element.strInstructions,element.strYoutube,element.strArea);
  })
  document.querySelector(".meal").innerHTML = meals;

})

searchBtn.addEventListener("click", function () {
  fetch(url + searchBox.value).then((res) => {
      
      return res.json();
    }).then((data) => {
      // console.log(data);
      let meals = "";
      data.meals.forEach(element => {
        // menuiteam.push(element)
        meals+=mealContainer(element.strMeal, element.strMealThumb,element.idMeal,element.strInstructions,element.strYoutube,element.strArea);
        // console.log(element.idMeal);
        arrFoodItems.push(element);
        
      });
      document.querySelector(".meal").innerHTML = meals;
    });

    
    
});

/* Favourite button click logic */

let mealListId = document.getElementById("meal-list-id");
mealListId.addEventListener("click",(e)=>{
  const element = e.target;

  // let tempFavorite = [];

  if(e.target.classList.contains('testing-btn')){
    if(e.target.classList.contains('fa-heart-o')){
      e.target.classList.remove('fa-heart-o');;
      e.target.classList.add('fa-heart');

      /* name, imgSrc, id, instruction, videoLink, area */
      // let temp = arrFoodItems.find((item)=>item.idMeal == e.target.dataset.id);
      // tempFavorite.push(temp);
      // console.log(tempFavorite);

      arrFoodItems.find((item)=>{
        if(item.idMeal == e.target.dataset.id){
          console.log("True");
          
        }
        
      })

      for(var i=0;i<arrFoodItems.length;i++){
        // console.log(i + " : " +arrFoodItems.length);
        if(Number(arrFoodItems[i].idMeal) == Number(e.target.dataset.id)){
          favFoodItems.push(arrFoodItems[i]);
          console.log(favFoodItems[i]);
        }
      }
      // console.log(tempFavorite);
      // favFoodItems.push(tempFavorite);
      
    }
    else{
      e.target.classList.add('fa-heart-o');
      e.target.classList.remove('fa-heart');
    }
  }
})

/* Add favourite items to localstorage  */
