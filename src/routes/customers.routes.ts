// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';
import {Customer} from "../models/Customer";
import jwt from 'jsonwebtoken';
// Global Config
export const customerRouter = express.Router();

customerRouter.use(express.json());

const saltRounds = 10;
// GET
customerRouter.get('/', async (_req: Request, res: Response, _next) => {
    try{
        const data = await Customer.find({});
        console.log('-------------data',data);
        
        res.send(data);
    }catch(error){
        console.log('errror while getting', error);
        
        res.status(500).send(error);
    }
});

// POST
customerRouter.post('/signUp', async (req: Request, res: Response, _next) => {
    try{
        const {firstName,lastName, email, password, products, status} = req.body;
        const newCustomer = new Customer({
            firstName,lastName, email, products,password, status
        });
        console.log('------newCustomer', newCustomer);
        bcrypt.hash(newCustomer.password, saltRounds, function(err,hash){
            if(err) throw err;
            newCustomer.password = hash;
            newCustomer.save()
        })
        newCustomer.save()
        .then(()=>{
            const token = jwt.sign({
                firstName, email
            },
            'secretkey',
            {
                expiresIn: '2h'
            }
            );
            newCustomer.token = token;
            console.log('--token', token);
            
            newCustomer.save();
        })
        .then((_customer)=>{
            res.status(200).json({
                msg:`New Customer created`, newCustomer
            })
        });
        }catch(error){
        console.log('error is', error); 
        res.status(500).send(error);
    }
});

// signIn
customerRouter.post('/signIn', async(req:Request,res:Response) =>{
    const {email, password} = req.body;

    //find email in db
    Customer.find({email}).then((customer)=>{
        if(customer.length==0){
            res.json({ msg: `Customer with emailid: ${email} does not exist` });
        }
        const dbPass = customer[0].password;
        console.log(password,dbPass);
        bcrypt.compare(password,dbPass,function(err,isMatch){
            if(err){
                console.log(err);
                throw err;
                
            }
            if(isMatch){
                console.log('loggedin', isMatch);

                //create token
                const token = jwt.sign(
                    {
                      email,
                    },
                    "secretkey",
                    {
                      expiresIn: "2h",
                    }
                  );
                res.json({ msg: "login successfull" });
            }
            else{
                console.log('not loggedin', isMatch);
                res.json({msg:'invalid credentials'})
                
            }
        })
        
    })
})