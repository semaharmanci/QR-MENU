import { calculatePrice, elements } from "./helpers.js";
import { menu } from "./db.js";

//url de ki parametreleri yonetebilmek icin urlsearchparams class ornegi olusturduk.
//ornegi olustururken kendi url nizdeki parametreleri gonderdik.
const searchParams = new URLSearchParams(window.location.search);
//get metodu ile url deki parametresine eristik
const paramId = searchParams.get("id");
//menu icinden id sini bildigimiz elemana ulasma
const product = menu.find((item) => item.id === Number(paramId)); //=== 3 esit olursa tipine gore islem yapiliyor
console.log(product);

elements.outlet.innerHTML = `
 <div class="d-flex justify-content-between align-items-center">
     <a href="/"><i class="bi bi-house fs-1"></i></a>
     <div>anasayfa / ${product.category} / ${product.category.toLowerCase()} </div>
</div>
     <h1 class="text-center my-3 shadow p-2 rounded">${product.title}</h1>
<div class="d-flex align-items-center justify-content-center">
    <img
    src="${product.img}"
    style="max-width: 500px"
    class="img-fluid shadow rounded"
    />
</div>
<div>
    <h3 class="my-5">Ürün Kategorisi: <span class="text-success">${product.category}</span></h3>
    <h3 class="my-3">Ürün Fiyati: <span class="text-success">${calculatePrice(product.price)}</span></h3>
</div>
<p class="lead fs-3">
     ${product.desc}
</p> 
`;
