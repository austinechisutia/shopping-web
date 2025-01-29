import {cart, addToCart} from "../data/cart.js";  // import the products array from the products.js file
import {products} from "../data/products.js";  // import the products array from the products.js file
import {formatCurrency} from "./utils/money.js";  // import the formatCurrency function from the money.js file


let productsHtml = '';  // create an empty string to store the html for each product
products.forEach((product)=>{
    productsHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count} 
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;

})


document.querySelector(".js-products-grid").innerHTML = productsHtml;  // add the productsHtml to the products container


function updateCartQuantity(){
  let cartQuantity = 0;  // create a variable to store the total quantity of products in the cart
      cart.forEach((item)=>{
        cartQuantity += item.quantity;
      })
      document.querySelector(".js-cart-quantity").textContent = cartQuantity;  // update the cart quantity in the header
}

document.querySelectorAll(".js-add-to-cart")
  .forEach((button)=>{
    button.addEventListener("click", ()=>{
      const productId = button.dataset.productId;
      
      addToCart(productId);

      updateCartQuantity();

      
    });
  });