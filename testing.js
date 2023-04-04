
const ProductManager = require('./ProductManager');

const manager = new ProductManager('./ProductManager/products.json');

console.log(manager.getProducts());

const product1 = {
    title: "producto prueba",
    description: "este es un producto prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25
}

manager.addProduct(product1);
console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(2));

const productUpdated = {
    title: "producto prueba actualizado",
    description: "este es un producto prueba actualizado",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25
}

manager.updateProduct(1,productUpdated);
console.log(manager.getProducts());

manager.deleteProduct(1);
console.log(manager.getProducts());
manager.deleteProduct(100);