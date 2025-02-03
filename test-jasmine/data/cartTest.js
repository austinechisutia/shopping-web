import { addToCart, cart, loadFromStorage} from "../../data/cart.js";


describe('Test suite: addToCart', ()=>{
    it('Adds an exiting product to the cut',()=>{

    })
    it('Adds a new product to the cart',()=>{


        spyOn(localStorage, "setItem");
        spyOn(localStorage, "getItem").and.callFake(()=>{
            return JSON.stringify([]);
         }
        );
        loadFromStorage();

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
        
    })
})