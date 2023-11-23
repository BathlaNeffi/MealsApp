// getFavourites

function getFavourites(){
  let favourites=localStorage.getItem('favourites');
  if(favourites){
    favourites= JSON.parse(favourites);
  }else{
    favourites=[];
  }
  return favourites;
}

// setFavourites

function setFavourites(favourites){
  if(favourites){
    localStorage.setItem('favourites',JSON.stringify(favourites));
  }else{
    // unset item if we get empty array
    localStorage.removeItem('favourites');
  }
} 

// add item in favourite

function addFavourite(item){
  let favourites=getFavourites();
  favourites.push(item);
  setFavourites(favourites);
}

// remove item from favourites with given id

function removeFavourite(mealId){
  let favourites=getFavourites();
  const index=favourites.findIndex((item)=> item?.idMeal === mealId )
  if(index!==-1){
    favourites.splice(index,1);
  }
  setFavourites(favourites);
}

function isItemFavourite(favourites,item){
  const index=favourites.findIndex((favItem)=> favItem.idMeal === item?.idMeal);
  return index !== -1;
}


function redirectToDetailsPage(itemId){
  window.location.href=`./meal-details.html?id=${itemId}`;
}
// render list

function renderList(meals = [],includeDelteBtn=false){

  let favourite=getFavourites();
  let itemsContainer=document.getElementById('itemsContainer');

  itemsContainer.innerHTML="";

  meals.forEach((item)=>{
    let buttonClass="";
    if(includeDelteBtn){
      buttonClass="active delete";
    }else if(isItemFavourite(favourite,item)){
      buttonClass="active";

    }

    const content=`<div class="card meal-card m-2" data-bs-theme="dark" onclick="redirectToDetailsPage(${item?.idMeal})" >
    <img src="${item?.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body ml-1">
      <h5 class="card-title">${item?.strMeal}</h5>
      <p class="card-text" id="category">Category: ${item?.strCategory} </p>
      <p class="card-text" id="origin">origin: ${item?.strArea}</p>
      <a href="javascript:void(0)" data-id="${item?.idMeal}"  class="favourite-btn text-danger ${buttonClass} "></a>
    </div>`

    let div=document.createElement('div');
    div.classList.add('col-md-4');
    div.classList.add('col-sm-6');
    div.innerHTML=content;
    itemsContainer.appendChild(div);
    });
    // for favourite buttons
    let favButtons=document.querySelectorAll('.favourite-btn');
    favButtons.forEach((button)=>{

      button.addEventListener('click',(e)=>{
        e.stopPropagation();
        let mealId=button.getAttribute('data-id');
        console.log('MealId :',mealId);
        // check it its delete or heart button
        if(button.classList.contains('delete')){
          removeFavourite(mealId);
          renderFavourites();
          
        }else{
          if(button.classList.contains('active')){
            button.classList.remove('active');
            removeFavourite(mealId);
          }
            else{
              button.classList.add('active');
              addFavourite(meals.find((meal)=> meal.idMeal ===mealId ));
            }
        };


      });
      

    })

}

function renderFavourites(){
  let favourites=getFavourites();
  renderList(favourites,true);
}


function resetList(){
  renderList([]);
}



const setupMeals= async (searchString)=>{ 
  try {
    //  we will load spinner util we get data

    let itemsContainer=document.getElementById('itemsContainer');

    const loader= `
    <div class="loader" id="loader">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    </div>`;
       itemsContainer.innerHTML=loader;
       let meals=await searchMeals(searchString);
       if(meals){
          renderList(meals.meals);
       }else{
          resetList();
       }



  } catch (error) {

    console.log('error: ',error);
    
  }
  


}