import { Router } from "express";
import ProductManager  from '../ProductManager.js';

const manager = new ProductManager('./src/products.json');
const router  = Router();

router.get('/', async (req, res) => {

    try {
        let productos = await manager.getProducts();
    
        let limit = req.query.limit;

        if(limit > 0){
            productos = productos.slice(0,limit);
        }

        res.send({productos});

    } catch (error) {
        res.status(404).send({status:"error", error : 'Ocurrio un error.'});
        console.log(error); 
    }

});

router.get('/:pid', async (req, res) => {

    try {
        
        let productos = await manager.getProducts();
        const productId = parseInt(req.params.pid);
        const product = productos.find(producto => producto.id === productId);

        if(!product){
            return res.status(404).send({status:"error", error : 'Producto no encontrado'});
        }
        
        res.send(product);   
    
    } catch (error) {
        console.log(error);        
    }

});

router.post('/', async (req,res) => {

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
})

router.put('/:pid',async (req, res) => {
    
    try {
        const idProductoParaActualizar = parseInt(req.params.pid);
        const productoParaActualizar = req.body;

        if(!manager.updateProduct(idProductoParaActualizar,productoParaActualizar)) {

            return res.status(404).send({status:"error", error : "No fue posible actualizar el producto. Revisar datos."});
        
        }

        res.status(200).send({success:"OK"});

    } catch (error) {
        console.log(error);    
    }

});

router.delete('/:pid',async (req, res) => {
    
    try {
        const idProductoParaEliminar = parseInt(req.params.pid);

        if(!manager.deleteProduct(idProductoParaEliminar)) {

            return res.status(404).send({status:"error", error : "No fue posible eliminar el producto. Revisar datos."});
        
        }

        res.status(200).send({success:"OK"});

    } catch (error) {
        console.log(error);    
    }

});


export default router;