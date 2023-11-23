// Get the query string from the current URL
const paramsString = window.location.search;

// Extract and handle query parameters
const searchParams = new URLSearchParams(paramsString);
const mealId=searchParams.get('id');
// function to set up meal details using its ID

async function setUpMealById(mealId){
    try {
        let loader=document.getElementById('loader');
        loader.classList.remove('d-none');
        // Fetch Meal Details by ID
        const meals= await getMealsById(mealId);
        let item=meals.meals[0];
        document.title=`Meals App - ${item?.strMeal}`;
        //  check it meal details were found
        if(item){
        // set image source, alt text, and apply animations
        let food_image=document.getElementById('food-image');
        food_image.setAttribute('src',`${item?.strMealThumb}`);
        food_image.setAttribute('alt',`${item?.strMeal}`);
        // Show primary information container with animation
        document.getElementById('meal-title').innerText=`${item?.strMeal}`;
        document.getElementById('meal-category').innerText=`Category: ${item?.strCategory}`;
        document.getElementById('meal-area').innerText=`Area: ${item?.strArea}`;
        document.getElementById('meal-description').innerText=`${item?.strInstructions}`;
        // Loop ingredients and measures by counter one by one , create row in the ingredints conatiner    
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
        // show details container
        document.querySelector('main').classList.remove('d-none');
        }else{
            // Alert if no details found and redirect to index

            alert("No Details Found");
            window.location.href="index.html";
        };
        // Hide the loader 
        loader.classList.add('d-none');
        
        // Log any errors and hide the loader
    } catch (error) {
        console.log('err', error);
        loader.classList.add('d-none');
        
    }
}


// If a mealId is present, set up meal details using the ID
if (mealId) {
    setUpMealById(mealId);
}
