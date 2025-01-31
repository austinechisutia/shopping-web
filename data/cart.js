export let cart = JSON.parse(localStorage.getItem("cart")) 

if(!cart){ 
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1"
  }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "1"
  }];;
}




function saveToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
  } // save the cart to local storage

export function addToCart(productId){
    let martchingItem;
        cart.forEach((cartItem)=>{
          if(productId === cartItem.productId){
            martchingItem = cartItem;
          }  // check if the product is already in the cart and return
        });
  
        if(martchingItem){
          martchingItem.quantity += 1;
        }else{
          cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: "1"
          });
        }
  
        saveToStorage();
         // add the product to the cart
  }


  export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });

    cart = newCart;

    saveToStorage();
  }