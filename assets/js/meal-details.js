const paramsString = window.location.search;

const searchParams = new URLSearchParams(paramsString);
const mealId=searchParams.get('id');
// console.log(mealId);

async function setUpMealById(mealId){
    try {
        let loader=document.getElementById('loader');
        loader.classList.remove('d-none');


        const meals= await getMealsById(mealId);
        let item=meals.meals[0];
        document.title=`Meals App - ${item?.strMeal}`;
        // console.log(item);
        if(item){
        let food_image=document.getElementById('food-image');
        food_image.setAttribute('src',`${item?.strMealThumb}`);
        food_image.setAttribute('alt',`${item?.strMeal}`);
        document.getElementById('meal-title').innerText=`${item?.strMeal}`;
        document.getElementById('meal-category').innerText=`Category: ${item?.strCategory}`;
        document.getElementById('meal-area').innerText=`Area: ${item?.strArea}`;


        // instructions
        document.getElementById('meal-description').innerText=`${item?.strInstructions}`;
       
        let ingredientsCounter=1;
        while(typeof item[`strIngredient${ingredientsCounter}`] === "string" && item[`strMeasure${ingredientsCounter}`].trim() !==""){
            const ingredient=item[`strIngredient${ingredientsCounter}`] ;
            const measurment=item[`strMeasure${ingredientsCounter}`].trim();
            const newData=`<td>${ingredient}</td><td>${measurment}</td>`;
            let tr=document.createElement('tr')
            tr.innerHTML=newData;
            document.querySelector('.ingredient-rows').appendChild(tr);
            ingredientsCounter++;
            
        }

        document.querySelector('main').classList.remove('d-none');
        }else{
            alert("No Details Found");
            window.location.href="index.html";
        };



        


        loader.classList.add('d-none');



        
    } catch (error) {
        console.log('err', error);
        
    }
}


// If a mealId is present, set up meal details using the ID
if (mealId) {
    setUpMealById(mealId);
}
