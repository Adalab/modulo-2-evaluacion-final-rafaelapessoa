'use strict';

const ulList = document.querySelector(".js_cocktails");
const inputSearch = document.querySelector(".js_input");
const buttonSearch = document.querySelector(".js_btn_search");
const buttonReset = document.querySelector(".js_btn_reset");


let drinksData = [];

function renderCocktails (list){
    ulList.innerHTML = '';
    for (const eachCocktail of list){
        ulList.innerHTML += `<li> 
        <h4> ${eachCocktail.strDrink} </h4>
        <img src = "${eachCocktail.strImageSource}"/>
        </li>`
    }    
};

function getData (){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response)=> response.json())
    .then((dataApi)=>{
        drinksData = dataApi.drinks;
        console.log(drinksData);
        renderCocktails(drinksData);
    });
};

const handleSearch = () => {
    const valueSearch = inputSearch.value;
    
    const filteredCocktail = drinksData.filter((item) => item.strDrink.toLowerCase().includes(valueSearch.toLowerCase()));
    renderCocktails(filteredCocktail);
    console.log(filteredCocktail);
};

inputSearch.addEventListener("input", handleSearch);
getData();