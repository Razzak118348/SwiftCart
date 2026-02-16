const trendingContainer = document.getElementById("trending-products");
const productsContainer = document.getElementById("products-container");
const loader = document.getElementById("loader");

let cart =[];
let products =[];

function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}

async function fetchProducts() {
    showLoader();
    try{
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
products = data;

        hideLoader();
        return data;
    }
    catch(error){
        console.log(error);
            hideLoader();
    }

}


function displayProducts(products, container) {
    container.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className="card bg-white shadow-md  hover:shadow-xl transition duration-300 rounded-lg p-4 flex flex-col items-center rounded-lg";

        productCard.innerHTML = `
        <figure class ="p-4 bg-white">
        <img src="${product.image}" alt="${product.title}" class="h-40 object-contain w-auto"/>
        </figure>

        <div class="card-body">
        <div class="flex justify-between gap-6">
        <span class="badge badge-outline text-xs">category: ${product.category}</span>
        <span class="text-sm"><i class="fa-regular fa-star text-yellow-500"></i> ${product.rating.rate} (${product.rating.count})</span>
</div>
        <h3 class="text-sm font-semibold">
        ${product.title.length > 40 ? product.title.slice(0, 40) + "..." : product.title}
        </h3>
        <p class="text-primary font-bold">price: $${product.price}</p>

        <div class="flex justify-between gap-2">
        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})"><li class="fa-solid fa-cart-shopping text-sm"></li> Add to Cart</button>
        <button class="btn btn-secondary btn-sm" onclick="viewDetails(${product.id})"><i class="fa-solid fa-eye"></i>View Details</button>
        </div>
        </div>
        `;

        container.appendChild(productCard);
    });
}

// load product by category
async function loadTrandingProducts() {
    const products = await fetchProducts();
    const trandingProducts = products.slice(0, 3);
    displayProducts(trandingProducts, trendingContainer);
}

async function loadProductsByCategory(category) {
   if(!productsContainer) return;
   showLoader();
   try{
    let url = "https://fakestoreapi.com/products";
    if(category !== "all"){
        url = `https://fakestoreapi.com/products/category/${category}`;
    }
    const res = await fetch(url);
    const data = await res.json();

   let filteredProducts = data;
   if(category && category !== "all"){
    filteredProducts = data.filter(p => p.category.toLowerCase() === category.toLowerCase());
   }
   hideLoader();
    displayProducts(filteredProducts, productsContainer);
}
catch(error){
    console.log(error);
    hideLoader();
}
}

//add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if(product){
        cart.push(product);
      document.getElementById("cart-count").innerText = cart.length;
      alert(`${product.title} added to cart`);
    }
}

const cateforyBtns=document.querySelectorAll(".category-btn");
cateforyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        loadProductsByCategory(category);
    });
});

function viewDetails(productId) {
    const product = products.find(p => p.id === productId);
    if(product){
const productCard = document.createElement("div");
        productCard.className="card bg-white shadow-md  hover:shadow-xl transition duration-300 rounded-lg p-4 flex flex-col items-center rounded-lg";

        productCard.innerHTML = `
        <figure class ="p-4 bg-white">
        <img src="${product.image}" alt="${product.title}" class="h-40 object-contain w-auto"/>
        </figure>

        <div class="card-body">
        <div class="flex justify-between gap-6">
        <span class="badge badge-outline text-xs">category: ${product.category}</span>
        <span class="text-sm"><i class="fa-regular fa-star text-yellow-500"></i> ${product.rating.rate} (${product.rating.count})</span>
</div>
        <h3 class="text-sm font-semibold">
        ${product.title}
        </h3>
        <p class="text-primary font-bold">price: $${product.price}</p>

        <div class="flex justify-between gap-2">
        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})"><li class="fa-solid fa-cart-shopping text-sm"></li> Add to Cart</button>
        <button class="btn btn-secondary btn-sm" onclick="viewDetails(${product.id})"><i class="fa-solid fa-eye"></i>View Details</button>
        </div>
        </div>
        `;

    }
}

window.addEventListener("DOMContentLoaded", async () => {
   if(trendingContainer){
    loadTrandingProducts();
   }
   if(productsContainer){
    fetchProducts();
    loadProductsByCategory("all");
   }
});