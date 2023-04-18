//const { error } = require("console");
import fs from "fs";
import json from "stream/consumers";

class ProductManager {

    constructor(path){
        this._products = [];
        this._path = path;
        this.readFile();
    }

    //OK. MEJORAR
    addProduct(product){

        product.id = this._products.length + 1;
        product.status = true;

        if(!product.title || 
           !product.description || 
           !product.price || 
           !product.code || 
           !product.stock ||
           !product.category){
            
            console.log(`El producto debe contar con todas las propiedades para ser agregado!`);
            return false;
        }
        if(!product.thumbnails){
            product.thumbnails = [];
        }

        let locatedCode = this._products.find(e => e.code === product.code);

        if(locatedCode){
    
            console.log(`Producto con el codigo ${product.code} ya esta registrado en el sistema!`);
            return false;
        }
        
        this._products.push(product);

        this.writeFile(this._products);

        console.log(`Producto con el codigo ${product.code} agregado con exito al sistema!`);

        return true;
    }

    updateProduct(id,product){

        
        let locatedProduct = this.getProductById(id);

        if(!locatedProduct){

            console.log(`No se encontro producto con el id ingresado al el sistema!`);
            return false;
        }

        product.id = locatedProduct.id;
        
        let index = this._products.indexOf(locatedProduct);

        this._products.splice(index,1);
        this._products.push(product);

        this.writeFile(this._products);

        console.log(`Producto actualizado en el sistema!`);
        return true;
    }

    deleteProduct(id){

        let idPrueba = this.getProductById(id);

        const productIndex = this._products.findIndex(e => e.id === id);

        if(productIndex >= 0){
            this._products.splice(productIndex,1);
        } else {
            console.log("Id no encontrado!")
            return false;
        }

        this.writeFile(this._products);

        return true;
    }

    getProducts(){
        
        return this._products;

    }

    getProductById(id){

        const locatedProduct = this._products.find(e => e.id === id);

        if(!locatedProduct){            
            return "Not Found";
        } else {
            return locatedProduct;
        }
    }

    async writeFile(productsArray){

        try {  
            await fs.promises.writeFile(this._path, JSON.stringify(productsArray));

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

            this._products = JSON.parse(contenido);

        } catch (error) {
            console.log(error);            
        }

    }

}

export default ProductManager;