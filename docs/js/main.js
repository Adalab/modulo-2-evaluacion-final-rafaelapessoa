const d=document.querySelector(".js_cocktails"),v=document.querySelector(".js_favorites"),k=document.querySelector(".js_input"),h=document.querySelector(".js_btn_search"),m=document.querySelector(".js_btn_reset"),a=document.querySelector(".js_btn_remove");let r=[],i=[];const D=e=>{const n=e.currentTarget.id,s=r.find(c=>c.idDrink===n),t=i.findIndex(c=>c.idDrink===n);t===-1?i.push(s):i.splice(t,1),o(r),l(i),localStorage.setItem("favoriteDrink",JSON.stringify(i))};function o(e){d.innerHTML="";for(const s of e){let c=i.findIndex(f=>f.idDrink===s.idDrink)===-1?"":"orange";d.innerHTML+=`<li class = "card js_list_cocktails ${c}" id= "${s.idDrink}">                 
        <img class="photo" src = "${s.strDrinkThumb}"/>
        <h3 class ="name-drink"> ${s.strDrink} </h3>
        </li>`}const n=document.querySelectorAll(".js_list_cocktails");for(const s of n)s.addEventListener("click",D)}const l=e=>{let n="";for(const t of e)n+=`<li class = "card">
        <img class="photo" src="${t.strDrinkThumb}"/>
        <h3 class ="name-drink">${t.strDrink}</h3>        
        </li> 
        <button class=" btn_x js_btn_remove" data-id="${t.idDrink}">X</button>`;v.innerHTML=n,e.length>0?a.style.display="block":a.style.display="none",document.querySelectorAll(".js_btn_remove").forEach(t=>{t.addEventListener("click",S)})},S=e=>{const n=e.target.getAttribute("data-id"),s=i.findIndex(t=>t.idDrink===n);s!==-1&&(i.splice(s,1),l(i),o(r),localStorage.setItem("favoriteDrink",JSON.stringify(i)))};function u(){fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita").then(e=>e.json()).then(e=>{r=e.drinks,o(r),localStorage.setItem("drinks",JSON.stringify(r))})}function p(e){e.preventDefault();const n=k.value;fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${n}`).then(t=>t.json()).then(t=>{r=t.drinks,o(r)});const s=r.filter(t=>t.strDrink.toLowerCase().includes(n.toLowerCase()));o(s)}function g(e){e.preventDefault(),k.value="",u()}function _(e){e.preventDefault(),i=[],l(i),o(r),localStorage.setItem("favoriteDrink",JSON.stringify(i))}const b=()=>{const e=localStorage.getItem("favoriteDrink");e!==null&&(i=JSON.parse(e));const n=localStorage.getItem("drinks");n!==null?(r=JSON.parse(n),o(r),l(i)):u()};b();h.addEventListener("click",p);m.addEventListener("click",g);a.addEventListener("click",_);
//# sourceMappingURL=main.js.map
