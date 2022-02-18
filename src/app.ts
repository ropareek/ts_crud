import express, {Application, Request, Response} from 'express';
import mongoose from 'mongoose';

const app:Application = express();
app.use(express.json());

import {customerRouter} from '../src/routes/customers.routes';
import { productRouter } from '../src/routes/products.routes'
// Db connection
mongoose.connect('mongodb://127.0.0.1:27017/ts_crud',()=>{
    console.log('Db Connected');
})
// ----------------------
app.use('/customers', customerRouter)
app.use('/products', productRouter)

// connecting to the server
app.listen(3008, ()=>{
    console.log('Server running on 3008')
});
// ---------------------------