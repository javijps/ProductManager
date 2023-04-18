import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extend:true}));
app.listen(8080, () => {console.log('Servidor escuchando en el puerto 8080')});

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);