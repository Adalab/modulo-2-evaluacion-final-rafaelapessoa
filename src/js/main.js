'use strict';

const ulList = document.querySelector(".js_cocktails");
const inputSearch = document.querySelector(".js_input");
const buttonSearch = document.querySelector(".js_btn_search");
const buttonReset = document.querySelector(".js_btn_reset");


let drinksData = [];
let drinksFavorites = [];

const addFavorites = (ev) => {
    console.log(ev.currentTarget.id);
    //obtener datos de la paleta clicada
    const liClikedId = ev.currentTarget.id;
    const clikedDrinkData = drinksData.find((item) => item.idDrink === liClikedId);
    //item.idDrink es el valor que va a buscar dentro del array

    //verificar si el drink clicado ya es un favorito
    const favoriteLiClickedIndex = drinksFavorites.findIndex((item) => item.idDrink === liClikedId);

    if(favoriteLiClickedIndex === -1){
        //add al array de fav el drink clicado, si ya no esta
        drinksFavorites.push(clikedDrinkData);
    } else{
        //quitar del array de fav
        drinksFavorites.splice(favoriteLiClickedIndex, 1);
    }       
    console.log(drinksFavorites);
    renderCocktails(drinksData);    
};

function renderCocktails (list){
    ulList.innerHTML = '';
    const indexFav = drinksFavorites.find(item => item.idDrink === eachCocktail.idDrink);

    let classCss = indexFav === -1 ? '' : 'blue';

    for (const eachCocktail of list){
        ulList.innerHTML += `<li class = "js_list_cocktails ${classCss}" id= "${eachCocktail.idDrink}">         
        <h3> ${eachCocktail.strDrink} </h3>
        <img class="photo" src = "${eachCocktail.strDrinkThumb}"/>
        </li>`
    }
    
    const allDrinksLi = document.querySelectorAll('.js_list_cocktails');
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