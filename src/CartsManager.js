//const { error } = require("console");
import fs from "fs";
import json from "stream/consumers";

class CartsManager {

    constructor(path){
        this._carts = [];
        this._path = path;
        this.readFile();
    }

    async writeFile(cartsArray){

        try {  
            await fs.promises.writeFile(this._path, JSON.stringify(cartsArray));

        } catch (error) {
            console.log(error);
        }
    }

    async readFile(){

        try {
            const contenido = await fs.promises.readFile(this._path, 'utf-8');
            if(!contenido){
                return;
            }

            this._carts = JSON.parse(contenido);

        } catch (error) {
            console.log(error);            
        }

    }

    createCart(){

        let cart = {};
        cart.id = this._carts.length + 1;
        cart.products = [];

        this._carts.push(cart);

        this.writeFile(this._carts);

        console.log(`Carrito creado con exito!`);

        return true;

    }

    getProductsFromCart(cartId){

        let locatedCart = this.getCartById(cartId);

        if(!locatedCart){
            return false;
        }

        return locatedCart.products;
    }

    getCartById(cartId){
        
        const locatedCart = this._carts.find(e => e.id === cartId);

        if(!locatedCart){            
            return false;
        } else {
            return locatedCart;
        }
    }

    addProductToCart(cartId, productId){

        let locatedCart = this.getCartById(cartId);

        if(!locatedCart){
            return false;
        }

        for (let index = 0; index < locatedCart.products.length; index++) {
            const element = locatedCart.products[index];
            
            if(element.id === productId){
                element.quantity++;
            }
        }

        let newProduct = {
            id: productId,
            quantity : 1
        };

        locatedCart.products.push(newProduct);

        this.writeFile(this._carts);

        return true;
    }

}




export default CartsManager;