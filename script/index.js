const trandingContainer = document.getElementById("trending-products");

let cart =[];
let products =[];

async function loadTrandingProducts() {
    try{
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
products = data;
        const sorted =data.sort((a,b) => b.rating.rate - a.rating.rate);
        const topThree = sorted.slice(0, 3);
console.log(products);
        displayProducts(topThree,trandingContainer);
    }
    catch(error){
        console.log(error);
    }

}


function displayProducts(products, container) {
    container.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className="card bg-white shadow-md  hover:shadow-xl transition duration-300 rounded-lg p-4 flex flex-col items-center rounded-lg";

        productCard.innerHTML = `
        <figure class ="p-6 bg-white">
        <img src="${product.image}" alt="${product.title}" class="h-40 object-contain"/>
        </figure>

        <div class="card-body">
        <h3 class="text-sm font-semibold">
        ${product.title.length > 40 ? product.title.slice(0, 40) + "..." : product.title}
        </h3>
        <p class="text-primary font-bold mt-2">price: $${product.price}</p>
        <div class="flex items-center gap-6">
        <span class="badge badge-outline text-xs mt-2">category: ${product.category}</span>
        <span class="text-sm">Rating: ${product.rating.rate}</span>
</div>
        <div class="flex gap-2 mt-4">
        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="btn btn-secondary btn-sm" onclick="viewDetails(${product.id})">View Details</button>
        </div>
        </div>
        `;

        container.appendChild(productCard);
    });
}


loadTrandingProducts();