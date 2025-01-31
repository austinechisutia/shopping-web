import {cart, removeFromCart, updateDeliveryOption} from "../../data/cart.js";
import {products} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOption.js";

const today = dayjs();
const deliveryDate = today.add(7, "day");
console.log(deliveryDate.format("dddd, MMMM D"));

export function renderOrderSummery(){

    let cartSummaryHtml = "";

    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;
        let matchingProduct;
        products.forEach((product)=>{
            if(product.id === productId){
                matchingProduct = product;

            }
        });

        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOption;

        deliveryOptions.forEach((option)=>{
            if(option.id === deliveryOptionId){
                deliveryOption = option;
            }
        });
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
        const dateString = deliveryDate.format("dddd, MMMM D");

        cartSummaryHtml +=
      `<div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary 
                      js-delete-from-cart" 
                      data-product-id="${matchingProduct.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    
                    ${deliveryOptionHtml(matchingProduct, cartItem)}
                  
                  </div>
                </div>
              </div>`;
              

    }
    );

function deliveryOptionHtml(matchingProduct, cartItems){
      let html = "";

      deliveryOptions.forEach((deliveryOption)=>{

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString = deliveryOption.priceCent === 0 ? "FREE Shipping" : `$${formatCurrency(deliveryOption.priceCent)} - Shipping`;

      const isChecked = deliveryOption.id === cartItems.deliveryOptionId ? "checked" : "";

      html +=  `<div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                      <input type="radio"
                        class="delivery-option-input"
                        ${isChecked ? "checked" : ""} 
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString}
                        </div>
                      </div>
                    </div>`;
      })
      return html;
    }

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;


    document.querySelectorAll(".js-delete-from-cart")
        .forEach((link)=>{
            link.addEventListener("click", ()=>{
              const productId = link.dataset.productId;
              removeFromCart(productId);


              const container = document.querySelector(`.js-cart-item-container-${productId}`).remove();
              console.log(container);
            })
        });  


        document.querySelectorAll(".js-delivery-option")
          .forEach((element)=>{
            element.addEventListener("click", ()=>{
              const {productId, deliveryOptionId} = element.dataset;

              updateDeliveryOption(productId, deliveryOptionId);
              renderOrderSummery();
            })
          });
}



