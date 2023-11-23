// The base url for the API
const BASE_URL="https://www.themealdb.com/api/json/v1/1/";

// function to fetch meas using search string
const searchMeals= async  (searchString) =>{
    try {
        // Make GET request to the API with the search string
        const response=await fetch(`${BASE_URL}search.php?s=${searchString}`);
        // parse and return the JSON response
        return  await response.json();
        
    } catch (error) {
        // log any error the occur during the API request
        console.log('Error: ',error);
    }

    

}
// function to retrive meal details by ID

const getMealsById = async(mealId)=>{
    try {
        // make a GET request to the API with the meal ID
        const response=await fetch(`${BASE_URL}lookup.php?i=${mealId}`);
        // parse and return the JSON response
        return await response.json();
        
    } catch (error) {
        //  Log errors if any occurs in feting data from api
        console.log('Error: ',error);
    }

}