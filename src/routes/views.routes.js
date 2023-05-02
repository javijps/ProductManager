import { Router } from "express";
import ProductManager  from '../ProductManager.js';
import { Server } from 'socket.io';

const manager = new ProductManager('./src/products.json');
const router  = Router();
const io = new Server();
let ws = null;

router.get('/', async (req, res) => {

    try {
        let productos = await manager.getProducts();

        res.render('home', {productos});

    } catch (error) {
        res.status(404).send({status:"error", error : 'Ocurrio un error.'});
        console.log(error); 
    }

});

router.get('/realtimeproducts', async (req, res) => {

    // Manejar las conexiones de Socket.io
    io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });


    io.emit('hello', '¡Hola desde el servidor!');

    try {
        let productos = await manager.getProducts();

        res.render('realTimeProducts', {productos});

    } catch (error) {
        res.status(404).send({status:"error", error : 'Ocurrio un error.'});
        console.log(error); 
    }

});



router.post('/realtimeproducts', async (req, res) => {


    if(ws){
        
    try {
        //ARMAR UN OBJETO PRODUCTO
        const productoParaAgregar = req.body;

        if(!manager.addProduct(productoParaAgregar)) {

            return res.status(404).send({status:"error", error : "No fue posible agregar el producto. Revisar datos."});
        
        }

        res.status(200).send({success:"OK"});

    } catch (error) {
        console.log(error);    
    }
    
}
});

export default router;

