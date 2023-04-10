const express = require ('express');
const ProductManager = require('./ProductManager');
const app = express();
const manager = new ProductManager('./products.json');

app.use(express.urlencoded({extend:true}));

app.get('/products', async (req, res) => {

    try {
           
    let productos = await manager.getProducts();
    
    let limit = req.query.limit;

    if(limit > 0){
        productos = productos.slice(0,limit);
    }

    res.json({productos});

    } catch (error) {
        console.log(error);    
    }

});

app.get('/products/:pid', async (req, res) => {

    let productos = await manager.getProducts();
    const productId = parseInt(req.params.pid);
    const product = productos.find(producto => producto.id === productId);

    if(!product){
        return res.status(404).send('Producto no encontrado');
    }
    res.send(product);

});



app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});
