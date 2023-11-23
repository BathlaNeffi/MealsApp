
let inputSearchMeal=document.getElementById('input-search-meal');

if(inputSearchMeal){
    inputSearchMeal.addEventListener('keyup',(e)=>{
        setupMeals(e.target.value);

    })
}

let searchButton=document.getElementById('search-button');

if(searchButton){
    searchButton.addEventListener('click',()=>{
        let searchSring=document.getElementById('input-search-meal').value;
        setupMeals(searchSring);
    
    })

}

// IIFE if nothing entered
(function(){
    setupMeals("");
})();



