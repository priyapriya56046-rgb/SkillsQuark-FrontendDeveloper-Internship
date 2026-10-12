
const products = [
  { name: "Laptop", category: "Electronics", price: 4500, icon: "💻" },
  { name: "Headphones", category: "Electronics", price: 1800, icon: "🎧" },
  { name: "Smart Watch", category: "Electronics", price: 2500, icon: "⌚" },
  { name: "T-Shirt", category: "Fashion", price: 700, icon: "👕" },
  { name: "Sneakers", category: "Fashion", price: 2200, icon: "👟" },
  { name: "Backpack", category: "Fashion", price: 1200, icon: "🎒" },
  { name: "Sunglasses", category: "Accessories", price: 500, icon: "🕶️" },
  { name: "Wrist Watch", category: "Accessories", price: 1500, icon: "⌚" },
  { name: "Handbag", category: "Accessories", price: 2000, icon: "👜" }
];

const categoryFilter = document.getElementById("category");
const priceFilter = document.getElementById("price");
const priceValue = document.getElementById("price-value");
const productContainer = document.getElementById("products");
const productCount = document.getElementById("count");
const resetButton = document.getElementById("reset");

function displayProducts() {
  const selectedCategory = categoryFilter.value;
  const maximumPrice = Number(priceFilter.value);

  priceValue.textContent = maximumPrice;

  const filteredProducts = products.filter(function (product) {
    const categoryMatches =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const priceMatches = product.price <= maximumPrice;

    return categoryMatches && priceMatches;
  });

  productContainer.innerHTML = "";

  productCount.textContent =
    filteredProducts.length + " product(s) found";

  if (filteredProducts.length === 0) {
    productContainer.innerHTML =
      "<p>No products found. Try changing your filters.</p>";
    return;
  }

  filteredProducts.forEach(function (product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const icon = document.createElement("div");
    icon.className = "product-icon";
    icon.textContent = product.icon;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const category = document.createElement("p");
    category.textContent = product.category;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = "₹" + product.price.toLocaleString("en-IN");

    card.append(icon, name, category, price);
    productContainer.appendChild(card);
  });
}

categoryFilter.addEventListener("change", displayProducts);
priceFilter.addEventListener("input", displayProducts);

resetButton.addEventListener("click", function () {
  categoryFilter.value = "all";
  priceFilter.value = 5000;
  displayProducts();
});

displayProducts();
