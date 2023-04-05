const { error } = require("console");
const fs = require("fs");
const { json } = require("stream/consumers");

class ProductManager {

    constructor(path){
        this._products = [];
        this._path = path;
    }

    //OK. MEJORAR
    addProduct(product){

        this.readFile();

        product.id = this._products.length + 1;

        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            
            console.log(`El producto debe contar con todas las propiedades para ser agregado!`);
            return;
        }

        let locatedCode = this._products.find(e => e.code === product.code);

        if(locatedCode){
    
            console.log(`Producto con el codigo ${product.code} ya esta registrado en el sistema!`);
            return;
        }
        
        this._products.push(product);

        this.writeFile(this._products);

        console.log(`Producto con el codigo ${product.code} agregado con exito al sistema!`);
    }

    updateProduct(id,product){

        this.readFile();
        
        let locatedProduct = this.getProductById(id);

        if(!locatedProduct){

            console.log(`No se encontro producto con el id ingresado al el sistema!`);
            return;
        }

        product.id = locatedProduct.id;
        
        let index = this._products.indexOf(locatedProduct);

        this._products.splice(index,1);
        this._products.push(product);

        this.writeFile(this._products);

        console.log(`Producto actualizado en el sistema!`);

    }

    deleteProduct(id){

        this.readFile();

        const productIndex = this._products.findIndex(e => e.id === id);

        if(productIndex >= 0){
            this._products.splice(productIndex,1);
        } else {
            console.log("Id no encontrado!")
        }

        this.writeFile(this._products);

    }

    //ARREGLAR. DEVUELVE PROMESA EN LUGAR DE ARRAY
    getProducts(){
        
        this.readFile();
        
        return this._products;

    }

    getProductById(id){

        this.readFile();

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

module.exports = ProductManager;