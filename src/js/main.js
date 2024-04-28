'use strict';

let coctailData = [];

const renderOneCoctails =()=>{
    
}

const renderAllCoctails =()=>{

}

const getData = ()=>{
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response)=> response.json())
    .then((dataApi)=>{
        coctailData = dataApi.driks;
        console.log(dataApi);
    });
};

getData();