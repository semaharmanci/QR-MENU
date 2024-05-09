import { buttonsData, menu } from "./js/db.js";
import {calculatePrice, elements} from "./js/helpers.js";

//! Fonksiyonlar

const renderMenuItems = (menuItems) => {
    /*
    *dizideki her bir obje icin bir elemani temsil eden 
    *html elemani olusturuldu. bu html i bir diziye aktardi
    */
  let menuHTML = menuItems.map(
    (item) =>
      ` <a
    href="productDetail.html?id=${item.id}&title=${item.title}"
    class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
    id="card"
    >
      <img src="${item.img}" class="rounded shadow" />
      <div>
      <div class="d-flex justify-content-between">
        <h5>${item.title}</h5>
        <p class="text-success">${calculatePrice(item.price)}</p>
      </div>
      <p class="lead">
        ${item.desc}
      </p>
    </div>
  </a>`
  );
  menuHTML = menuHTML.join("");
  elements.menuArea.innerHTML = menuHTML;
};
//* Tiklanilan butona gore o butonun kategorisine ait urunleri listeleme

const searchCategory = (e) => {
  const category = e.target.dataset.category;
  //tim dizi elemanlarindan yalnizca kategori degeri butonun kategori 
  //degeriyle eslesenleri getir ve bir dizi seklinde degiskene aktar.
  const filteredMenu = menu.filter((item) => item.category === category);
  //hepsi secilirse butun menuyu ekrana aktarir
  if(category == "undefined"){
    return;
  }
  //filtrelenen elemanlari ekrana aktarmasi icin menu dizisinden
  //olusturdugumuz filteredMenu dizisini ekrana aktarir

  else if (category === "all"){
    renderMenuItems(menu);
  }
  
  else{
    renderMenuItems(filteredMenu);
  }
  //sectigimiz kategorinin butonunu aktiflestirmek icin categpriyi parametre olarak gonderdik
  renderButtons(category);
};

//ekrana buton basma
const renderButtons = (active) => {
  //eski butonlari ekrandan silme
  elements.buttonsArea.innerHTML ="";
  //yeni buton olusturma
  buttonsData.forEach((btn) => {
    //html butonu olusturma
    const buttonEle = document.createElement("button");
    //butonlara classlarini ekleme
    buttonEle.className = "btn btn-outline-dark filter-btn";
    //icindeki yaziyi degistirme
    buttonEle.textContent = btn.text;
    //hangi kategori oldugu bilgisini buton elementine ekleme
    buttonEle.dataset.category = btn.value;
    //eger ki active kategorisiyle buton eslesirse ona farkli class ekle
    if(active === btn.value){
      buttonEle.classList.add("bg-dark","text-light")
    }
    elements.buttonsArea.appendChild(buttonEle);
  });
  
};
//! Olay izleyicileri

document.addEventListener("DOMContentLoaded", renderMenuItems(menu));
elements.buttonsArea.addEventListener("click", searchCategory);
