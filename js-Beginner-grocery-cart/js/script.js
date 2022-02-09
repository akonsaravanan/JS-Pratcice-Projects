const navCartLink = document.querySelector("#cart-info");
const productCartLink = document.querySelectorAll(".store-item-icon");
const cartItemSections = document.querySelector("#cart");

//opening mini cart using click  event

navCartLink.addEventListener("click", function (e) {
  e.preventDefault();
  cartItemSections.classList.toggle("show-cart");
});

//add product to Cart event

productCartLink.forEach(function (product) {
  product.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains("store-item-icon")) {
      const productdetails = {};
      let data = e.target.parentElement.previousElementSibling;
      let fullpath = e.target.parentElement.previousElementSibling
        .getAttribute("src")
        .replace("img", "");
      console.log(fullpath);
      productdetails.img = `img-cart${fullpath}`;
      productdetails.name =
        e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
      productdetails.price =
        e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent
          .slice(1)
          .trim();
      console.log(productdetails);
      let cartItem = `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
    <img src="${productdetails.img}" class="img-fluid rounded-circle" id="item-img" alt="">
    <div class="item-text">

      <p id="cart-item-title" class="font-weight-bold mb-0">${productdetails.name}</p>
      <span>$</span>
      <span id="cart-item-price" class="cart-item-price" class="mb-0">${productdetails.price}</span>
    </div>
    <a href="#" id='cart-item-remove' class="cart-item-remove">
      <i class="fas fa-trash"></i>
    </a>
  </div>`;
      cartItemSections.insertAdjacentHTML("afterbegin", cartItem);
      alert("item added to the cart");
    }
    showTotals();
  });
});

const showTotals = function () {
  const total = [];
  const items = document.querySelectorAll(".cart-item-price");
  items.forEach(function (item) {
    total.push(parseFloat(item.textContent));
  });

  const totalMoney = total.reduce(function (total, item) {
    total += item;
    return total;
  }, 0);

  const finalMoney = totalMoney.toFixed(2);

  document.getElementById("cart-total").textContent = finalMoney;
  document.querySelector(".item-total").textContent = finalMoney;
  document.getElementById("item-count").textContent = total.length;
};
showTotals();
