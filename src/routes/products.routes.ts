// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Product } from "../models/Product";
const auth = require('../middleware/auth')


// Global Config
export const productRouter = express.Router();

productRouter.use(express.json());

// GET
productRouter.get('/:id', auth, async (req: Request, res: Response) => {
    try{
        const _id = req.params.id;
        const data = await Product.findById(_id);
        console.log('-------------data',data);
        
        res.send(data);
    }catch(error){
        console.log('errror while getting Product', error);
        
        res.status(500).send(error);
    }
})
// POST
productRouter.post('/', async (req: Request, res: Response) => {
    try{
        const {name,description,slug, status, ownerId} = req.body;
        console.log('--------body',req.body);
        
        const newProduct = new Product({
            name, description, slug, status, ownerId
        });
        console.log('------newProduct', newProduct);
        
        newProduct.save()
        
        res.status(200).json(newProduct);
    }catch(error){
        console.log('error while creating new Product', error);
        res.status(500).json({error});
    }
})
// PUT
productRouter.put('/:id',async (req:Request, res:Response) => {
    try{
        const _id = req.params.id
        const {name,description,slug, status, ownerId} = req.body;
        const isPresent = await Product.find({_id})
        if(!isPresent) return res.json({msg:"this id does not exists"})
        const updated = await Product.updateOne({_id, name,description,slug, status, ownerId})
        console.log('---------updated', updated);
        res.send(200).json({msg:'product updated', updated})
        
    }catch(error){
        console.log('error while creating new Product', error);
        res.status(500).json({msg:`there occured an error: ${error}`})
    }
})

// DELETE
productRouter.delete('/:id', async(req:Request, res:Response)=>{
    const _id = req.params.id;
    await Product.deleteOne({ _id }).catch((err) => {
    console.log(err);
  });
  res
    .status(200)
    .json({ msg: `document with id: ${_id} deleted from database` });
})