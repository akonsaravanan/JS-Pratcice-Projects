const boxes = document.querySelectorAll(".box");
const showCart = document.querySelector(".show-cart");
const cartInfo = document.querySelector(".cart-info");
const strong = cartInfo.querySelector("strong");
const productInfo = document.querySelector(".product-info");

let addedproducts = [];

const addToCart = function (e) {
  let product = e.target.closest(".box");
  const id = new Date().getTime();
  const img = product.querySelector("img").getAttribute("src");
  const title = product.querySelector(".title").textContent;
  const quantity = product.querySelector(".quantity").textContent;
  const price = product.querySelector(".price").textContent;
  product.setAttribute("data-id", id);

  addedproducts.push({
    id: id,
    img: img,
    title: title,
    quantity: quantity,
    price: price,
  });
  ActivateOverlay(product);
};

const ActivateOverlay = function (element) {
  element.style.pointerEvents = "none";
  element.querySelector(".overlay").classList.toggle("active");
  renderCartItems();
  totalCartItems();
};

const renderCartItems = function () {
  productInfo.innerHTML = "";
  addedproducts.forEach(function (product) {
    let item = `<div class="product" data-id="${product.id}">
    <img src="${product.img}">
    <span class="title">${product.title}</span>
    <span class="quantity">${product.quantity}</span>
    <span>${product.price}</span>
    <span class="del">X</span>
</div>`;
    productInfo.insertAdjacentHTML("beforeend", item);
  });
};

const totalCartItems = function () {
  strong.textContent = addedproducts.length;
  if (+strong.textContent < 1) {
    alert("No products added");
  } else {
    showCart.classList.toggle("active");
  }
};

boxes.forEach(function (box) {
  box.addEventListener("click", addToCart);
});

cartInfo.addEventListener("click", totalCartItems);

productInfo.addEventListener("click", function (e) {
  e.preventDefault();
  let parent = e.target.parentElement;
  if (e.target.classList.contains("del")) {
    const id = +e.target.parentElement.getAttribute("data-id");
    const temp = addedproducts.filter(function (product) {
      if (product.id !== id) {
        return product;
      }
    });
    addedproducts = temp;
    productInfo.removeChild(parent);
    strong.textContent = addedproducts.length;
    const box = boxes.forEach(function (box) {
      if (+box.getAttribute("data-id") === id) {
        box.style.pointerEvents = "auto";
        box.querySelector(".overlay").classList.remove("active");
      }
    });
  }
});
