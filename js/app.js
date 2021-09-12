const loadProducts = () => {
  const url = `http://127.0.0.1:5500/db.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML =
      `
      <div class="card" style="height:100%">
      <img src="${image}" class="card-img-top" alt="No Image Found">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">Category: ${product.category}</p>
        <h2>Price: $ ${product.price}</h2>
        <div class="buttons">
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn">add to cart</button>
            <button id="details-btn" class="btn">Details</button>
        </div>
      </div>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//shortcut to get input value 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  return element;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

//count added products to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// main price update function
const updatePrice = (id, value) => {

  const getOldPrice = getInputValue(id);
  const convertedOldPrice = parseFloat(getOldPrice);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};
//tax calculation
const taxCalculate = (price, rate) => {
  const result = parseFloat(price * rate);
  return result.toFixed(2);
};
// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", taxCalculate(priceConverted, 0.2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", taxCalculate(priceConverted, 0.3));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", taxCalculate(priceConverted, 0.4));
  }
};

//grandTotal update function
const updateTotal = () => {
  const price = parseFloat(getInputValue("price"));
  const deliveryCharge = parseFloat(getInputValue("delivery-charge"));
  const totalTax = parseFloat(getInputValue("total-tax"));
  const grandTotal = price + deliveryCharge + totalTax;
  const correctGrandTotal = parseFloat(grandTotal).toFixed(2);
  document.getElementById("total").innerText = correctGrandTotal;
};