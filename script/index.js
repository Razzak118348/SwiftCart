const trendingContainer = document.getElementById("trending-products");
const productsContainer = document.getElementById("products-container");
const loader = document.getElementById("loader");
const cartCount=document.getElementById("cart-count");
const cartItemContainer=document.getElementById("cart-items");
const cartTotal=document.getElementById("cart-total");

let cart =JSON.parse(localStorage.getItem("cart")) || [];
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
        productCard.className="card bg-white shadow-md  hover:shadow-xl transition duration-300 rounded-lg flex flex-col items-center rounded-lg";

        productCard.innerHTML = `
        <figure class ="p-4 bg-white">
        <img src="${product.image}" alt="${product.title}" class="h-40 object-contain"/>
        </figure>

        <div class="card-body">
        <div class="flex justify-between gap-4">
        <span class="badge badge-outline text-xs p-4">${product.category}</span>
        <span class="text-sm"><i class="fa-regular fa-star text-yellow-500"></i> ${product.rating.rate} (${product.rating.count})</span>
</div>
        <h3 class="text-sm font-semibold">
        ${product.title.length > 30 ? product.title.slice(0, 30) + "..." : product.title}
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
    if(!product) return;

    const existingProduct = cart.find(item=>item.id ===productId);
    if(existingProduct){
        existingProduct.quantity += 1;
    }
    else{
        cart.push({...product, quantity: 1});
    }
    updateCartUI();
}

function updateCartUI() {
    localStorage.setItem("cart", JSON.stringify(cart));

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    renderCartItems();
}

function renderCartItems() {
    cartItemContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "flex justify-between items-center mb-2";

        cartItem.innerHTML = `
        <div class="flex items-center gap-2">
        <img src="${item.image}" alt="${item.title}" class="h-10 w-10 object-contain"/>
        <span>${item.title}</span>
        </div>
        <div class="flex items-center gap-2">
        <span>Qty: ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="btn btn-sm btn-error" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        cartItemContainer.appendChild(cartItem);
    });
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

//remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}


//button event listener for category filter
const cateforyBtns=document.querySelectorAll(".category-btn");
cateforyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        loadProductsByCategory(category);
    });
});

function viewDetails(productId) {
    const product = products.find(p => p.id === productId);
    if(!product){
        return;
    }

    const modal = document.createElement("div");
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
    <div class="flex justify-end">
    <button class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
                onclick="this.closest('.fixed').remove()">

    <i class="fa-solid fa-xmark"></i>
    </button>
    </div>
    <div class="flex flex-col items-center">
    <img src="${product.image}" alt="${product.title}" class="h-40 object-contain w-auto mb-4"/>
    <h2 class="text-lg font-semibold mb-2">${product.title}</h2>
<div class="flex justify-between gap-4 mb-2 w-full">
<span class="badge badge-outline text-xs p-4">${product.category}</span>
<span class="text-primary font-bold">$${product.price}</span>

<span class="text-sm"><i class="fa-regular fa-star text-yellow-500"></i> ${product.rating.rate} (${product.rating.count})</span>
</div>
    <p class="mb-4">${product.description}</p>
    <button class="btn btn-primary" onclick="addToCart(${product.id})"><li class="fa-solid fa-cart-shopping text-sm"></li> Add to Cart</button>
    </div>
    </div>
    `;
    document.body.appendChild(modal);


}

window.addEventListener("DOMContentLoaded", async () => {
   if(trendingContainer){
    loadTrandingProducts();
   }
   if(productsContainer){
    fetchProducts();
    loadProductsByCategory("all");
   }
   updateCartUI();
});