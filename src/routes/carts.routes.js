import { Router } from "express";
import CartsManager  from '../CartsManager.js';

const manager = new CartsManager('./src/carts.json');
const router  = Router();

router.post('/', async (req,res) => {

    try {

        manager.createCart();
        res.status(200).send({success:"OK"});

    } catch (error) {

        res.status(404).send({status:"error", error : 'Ocurrio un error.'});
        console.log(error);    
    }
})

router.post('/:cid/product/:pid', async (req,res) => {

    try {

        let cartId = parseInt(req.params.cid);
        let productId = parseInt(req.params.pid);

        if(!manager.addProductToCart(cartId,productId)){
            return res.status(404).send({status:"error", error : 'Carrito no encontrado'});
        }

        res.status(200).send({success:"OK"});

    } catch (error) {
        console.log(error);    
    }
})

router.get('/:cid', (req,res) => { ////REVISAR DESDE ACA

    try {

        let cartId = parseInt(req.params.cid);

        let productos = manager.getProductsFromCart(cartId);

        if(!productos){
            return res.status(404).send({status:"error", error : 'Carrito no encontrado'});
        }
    
        res.json({productos});

    } catch (error) {
        console.log(error);    
    }
})


export default router;