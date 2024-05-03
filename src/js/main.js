'use strict';

const ulList = document.querySelector(".js_cocktails");
const ulListFav = document.querySelector(".js_favorites");
const inputSearch = document.querySelector(".js_input");
const buttonSearch = document.querySelector(".js_btn_search");
const buttonReset = document.querySelector(".js_btn_reset");
const buttonRemoveAll = document.querySelector(".js_btn_remove");
const buttonLog = document.querySelector(".js_btn_log");


let drinksData = [];
let drinksFavorites = [];


//funcion para seleccionar los favoritos
const addFavorites = (ev) => {

    //obter el id de todo el elemento clicado 
    const liClikedId = ev.currentTarget.id;
    //buscar datos del drink por el id (.idDrink es el valor dentro del array)
    const clikedDrinkData = drinksData.find((item) => item.idDrink === liClikedId);
    //verifica si el drink clicado ya es un favorito
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
    ulList.innerHTML = ''; //borra el lo que esta en la lista

    for (const eachCocktail of list){ //verifica si el drink esta en favotitos
        const indexFav = drinksFavorites.findIndex(item => item.idDrink === eachCocktail.idDrink);
        
        let classCss = indexFav === -1 ? '' : 'orange';

        ulList.innerHTML += `<li class = "card js_list_cocktails ${classCss}" id= "${eachCocktail.idDrink}">                 
        <img class="photo" src = "${eachCocktail.strDrinkThumb}"/>
        <h3 class ="name-drink"> ${eachCocktail.strDrink} </h3>
        <p>${eachCocktail.strCategory}</p>
        </li>
        `
    }
    //cria un evento de click para cada drink add en los favoritos
    const allDrinksLi = document.querySelectorAll('.js_list_cocktails');
    for (const li of allDrinksLi) {
        li.addEventListener("click", addFavorites);        
    }    
    localStorage.setItem("drinks", JSON.stringify(drinksData));
};

//crea la lista de favoritos
const renderDrinksFav = (indexFav) => {
    let drinksFavHTML = '';
    for (const drink of indexFav) {
        drinksFavHTML += `<li class = "card">
        <img class="photo" src="${drink.strDrinkThumb}"/>
        <h3 class ="name-drink">${drink.strDrink}</h3>        
        </li> 
        <button class=" btn_x js_btn_remove" data-id="${drink.idDrink}">X</button>`;
    }
    ulListFav.innerHTML = drinksFavHTML

    //condicional para enseñar el boton de removeAll cuando tenga fav en la lista
    if (indexFav.length > 0) {
        buttonRemoveAll.style.display = 'block';
    } else {
        buttonRemoveAll.style.display = 'none';
    }

    //remover favorito con el boton X
    const removeButton = document.querySelectorAll('.js_btn_remove');
    removeButton.forEach(button => {
        button.addEventListener('click', removeFavorite);        
    });
};

const removeFavorite = (ev) => {
    const drinkIdRemove = ev.target.getAttribute('data-id');

    //encontra el índice del drink que va a ser removido
    const indexRemove = drinksFavorites.findIndex(item => item.idDrink === drinkIdRemove);
    
    if (indexRemove !== -1) {
        // Remove el drink de la lista de favoritos
        drinksFavorites.splice(indexRemove, 1);
        // renderiza otra vez el listado de favoritos
        renderDrinksFav(drinksFavorites); // se rederiza otra vez para quitar el color
        renderCocktails(drinksData);
        // actualiza el LS con la lista de favoritos actualizada
        localStorage.setItem("favoriteDrink", JSON.stringify(drinksFavorites));
    }
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

//escuchar evento sobre el boton de borrar todos los favoritos
function handleClickAll(event){
    event.preventDefault();
    drinksFavorites = []; // limpia la lista de favoritos
    renderDrinksFav(drinksFavorites); // vuelve a renderizar los favoritos
    renderCocktails(drinksData); // vuelve a renderizar todos para quitar el color
    localStorage.setItem("favoriteDrink", JSON.stringify(drinksFavorites)); //actualiza LS   
}

const init = () => { //para usar los datos en el localstorage

    const drinksFavLocal = localStorage.getItem('favoriteDrink');
    if (drinksFavLocal !== null){
        drinksFavorites = JSON.parse(drinksFavLocal);
    }

    const drinksLocal = localStorage.getItem('drinks');
    if (drinksLocal !== null){
        drinksData = JSON.parse(drinksLocal);
        renderCocktails(drinksData); 
        renderDrinksFav(drinksFavorites);
    } else {
        getData(); // llamar a getData si los datos no estan el LS
    }
};

function handleClickLog(event){
    event.preventDefault();
    for (const drink of drinksFavorites) {
        console.log (drink.strDrink);
    }
};

init();

buttonSearch.addEventListener("click", handleClickSearch);
buttonReset.addEventListener("click", handleClickReset);
buttonRemoveAll.addEventListener("click", handleClickAll);
buttonLog.addEventListener("click", handleClickLog);

