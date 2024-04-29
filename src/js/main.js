'use strict';

const ulList = document.querySelector(".js_cocktails");
const ulListFav = document.querySelector(".js_favorites");
const inputSearch = document.querySelector(".js_input");
const buttonSearch = document.querySelector(".js_btn_search");
const buttonReset = document.querySelector(".js_btn_reset");


let drinksData = [];
let drinksFavorites = [];


//funcion para seleccionar los favoritos
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
    renderCocktails(drinksData);
    renderDrinksFav(drinksFavorites);
    //se guarda los datos en el localstorage los favoritos
    localStorage.setItem("favoriteDrink", JSON.stringify(drinksFavorites));    
};

//renderizar todos los cockteles
function renderCocktails (list){
    ulList.innerHTML = '';    
    for (const eachCocktail of list){
        const indexFav = drinksFavorites.findIndex(item => item.idDrink === eachCocktail.idDrink);
        let classCss = indexFav === -1 ? '' : 'blue';
        ulList.innerHTML += `<li class = "card js_list_cocktails ${classCss}" id= "${eachCocktail.idDrink}">                 
        <img class="photo" src = "${eachCocktail.strDrinkThumb}"/>
        <h3> ${eachCocktail.strDrink} </h3>
        </li>`
    }

    const allDrinksLi = document.querySelectorAll('.js_list_cocktails');
    for (const li of allDrinksLi) {
        li.addEventListener("click", addFavorites);        
    }
};

//crea la lista de favoritos
const renderDrinksFav = (indexFav) => {
    let drinksFavHTML = '';
    for (const drink of indexFav) {
        drinksFavHTML += `<li class = "card">
        <img class="photo" src="${drink.strDrinkThumb}"/>
        <h3>${drink.strDrink}</h3>
        </li>`;
    }
    ulListFav.innerHTML = drinksFavHTML
};

//obtener datos de la api.
function getData (){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response)=> response.json())
    .then((dataApi)=>{
        drinksData = dataApi.drinks;        
        renderCocktails(drinksData);
        //guardar en el LS todos los drinks
        localStorage.setItem("drinks", JSON.stringify(drinksData)); 
    });
};

//escuchar evento sobre el boton buscar, se busca dentro de la api todos los drinks.
function handleClickSearch(event){
    event.preventDefault();
    const valueSearch = inputSearch.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueSearch}`)
    .then((response)=> response.json())
    .then((dataApi)=>{
        drinksData = dataApi.drinks;        
        renderCocktails(drinksData); 
    });
    
    //getData(valueSearch);
    const filteredCocktail = drinksData.filter((item) => item.strDrink.toLowerCase().includes(valueSearch.toLowerCase()));
    renderCocktails(filteredCocktail);
}

//escuchar evento sobre el boton reset
function handleClickReset(event){
    event.preventDefault();
    inputSearch.value = '';
    getData();
};

const init = () => { //para usar los datos en el localstorage
    const drinksFavLocal = localStorage.getItem('favoriteDrink');
    if (drinksFavLocal !== null){
        drinksFavorites = JSON.parse(drinksFavLocal);
    }

    const drinksLocal = localStorage.getItem('drinks');
    if (drinksLocal !== null){
        drinksData = JSON.parse(drinksLocal);
        renderCocktails(drinksData);
    } else {
        getData();
    }
};

init();

buttonSearch.addEventListener("click", handleClickSearch);
buttonReset.addEventListener("click", handleClickReset);

