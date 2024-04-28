'use strict';

const ulList = document.querySelector(".js_cocktails");
const inputSearch = document.querySelector(".js_input");
const buttonSearch = document.querySelector(".js_btn_search");
const buttonReset = document.querySelector(".js_btn_reset");


let drinksData = [];
let drinksFavorites = [];

const addFavorites = (ev) => {
    console.log(ev.currentTarget.idDrink);
};

function renderCocktails (list){
    ulList.innerHTML = '';
    for (const eachCocktail of list){
        ulList.innerHTML += `<li class = "js_list_cocktails" id= "${eachCocktail.idDrink}"> 
        <h4> ${eachCocktail.strDrink} </h4>
        <img src = "${eachCocktail.strImageSource}"/>
        </li>`
    }
    const allDrinksLi = document.querySelectorAll(".js_list_cocktails");
    for (const li of allDrinksLi) {
        li.addEventListener("click", addFavorites);        
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