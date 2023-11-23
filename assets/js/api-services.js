const BASE_URL="https://www.themealdb.com/api/json/v1/1/";


const searchMeals= async  (searchString) =>{
    try {
        const response=await fetch(`${BASE_URL}search.php?s=${searchString}`);

        return  await response.json();
        
    } catch (error) {
        console.log('Error: ',error);
    }

    

}

const getMealsById = async(mealId)=>{
    try {
        const response=await fetch(`${BASE_URL}lookup.php?i=${mealId}`);
        return await response.json();
        
    } catch (error) {
        
        console.log('Error: ',error);
    }

}