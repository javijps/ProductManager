import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.routes.js';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extend:true}));
app.use(express.static(__dirname+'/public'));
const httpServer = app.listen(8080, () => {console.log('Servidor escuchando en el puerto 8080')});
//const io = new Server(httpServer);

app.engine('handlebars',handlebars.engine({defaultLayout:false}));
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use('/',viewsRouter);
app.use('/realtimeproducts',viewsRouter);

